import {
  Resolver,
  ResolverTypeWrapper,
  InvalidTimeslotDataError,
  OwnerAuthorizationError,
  Timeslot,
  RequireFields,
  MutationAddTimeslotArgs,
  TimeslotResolvers,
  UserAuthorizationError,
  BookTimeslotError,
  MutationBookTimeslotArgs,
} from "../types/graphql";
import {
  StadiumAndOwnerContext,
  UserIdIncludedContext,
} from "../types/context";

export const timeslotResolver: TimeslotResolvers = {
  stadium: async ({ stadiumId }, args, { prisma }) => {
    const stadium = await prisma.stadium.findUnique({
      where: { id: Number(stadiumId) },
    });
    return { ...stadium, __typename: "Stadium" };
  },
  bookedBy: async ({ userId }, args, { prisma }) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    return { ...user, __typename: "User" };
  },
};

export const bookTimeslotResolver: Resolver<
  ResolverTypeWrapper<BookTimeslotError | UserAuthorizationError | Timeslot>,
  {},
  UserIdIncludedContext,
  RequireFields<MutationBookTimeslotArgs, "timeslotId">
> = async (root, { timeslotId }, { prisma, userId }) => {
  const timeslot = await prisma.timeslot.findUnique({
    where: { id: Number(timeslotId) },
  });
  if (!timeslot) return timeslotDoesntExistError;
  if (timeslot.userId) return timeslotIsBookedPriceError;
  const currentTime = new Date();
  if (timeslot.startTime <= currentTime) return pastBookingError;
  const updatedTimeslot = await prisma.timeslot.update({
    where: { id: Number(timeslotId) },
    data: { bookedBy: { connect: { id: userId } } },
  });
  return { ...updatedTimeslot, __typename: "Timeslot" };
};

export const addTimeslotResolver: Resolver<
  ResolverTypeWrapper<
    InvalidTimeslotDataError | OwnerAuthorizationError | Timeslot
  >,
  {},
  StadiumAndOwnerContext,
  RequireFields<MutationAddTimeslotArgs, "timeslotData">
> = async (
  root,
  { timeslotData: { startTime, endTime, stadiumId, price } },
  { prisma, ownerId }
) => {
  const stadium = await prisma.stadium.findUnique({
    where: { id: Number(stadiumId) },
    include: {
      timeslots: {
        where: {
          OR: [
            { startTime: { gte: startTime, lte: endTime } },
            { endTime: { gte: startTime, lte: endTime } },
          ],
        },
      },
    },
  });
  if (!stadium) return stadiumDoesntExistError;
  if (stadium.ownerId !== ownerId) return notOwnerOfStadiumError;
  const currentTime = new Date();
  if (startTime <= currentTime) return pastDateError;
  if (endTime < startTime) return negativeTimeError;
  if (stadium.timeslots.length > 0) return unavillableTimeError;
  if (price < 0) return negativePriceError;
  const timeslot = await prisma.timeslot.create({
    data: { stadiumId: Number(stadiumId), startTime, endTime, price },
  });
  return { ...timeslot, __typename: "Timeslot" };
};

const stadiumDoesntExistError: InvalidTimeslotDataError = {
  __typename: "InvalidTimeslotDataError",
  message: "The selected stadium doesn't exist.",
  arbMessage: "الملعب المحدد غير موجود",
};

const notOwnerOfStadiumError: InvalidTimeslotDataError = {
  __typename: "InvalidTimeslotDataError",
  message: "You are not authorized to modify this stadium.",
  arbMessage: "غير مسموح لك بتعديل هذا الملعب",
};

const pastDateError: InvalidTimeslotDataError = {
  __typename: "InvalidTimeslotDataError",
  message: "The provided start time is in the past",
  arbMessage: "وقت البدء المقدم يقع في الماضي",
};

const negativeTimeError: InvalidTimeslotDataError = {
  __typename: "InvalidTimeslotDataError",
  message: "The end time must be after the start time.",
  arbMessage: "يجب أن يكون وقت الانتهاء بعد وقت البدء",
};

const unavillableTimeError: InvalidTimeslotDataError = {
  __typename: "InvalidTimeslotDataError",
  message: "Another timeslot exists at this time for this stadium.",
  arbMessage: "توجد فترة زمنية أخرى في هذا الوقت لهذا الملعب.",
};

const negativePriceError: InvalidTimeslotDataError = {
  __typename: "InvalidTimeslotDataError",
  message: "Price can't be negative.",
  arbMessage: "لا يمكن أن يكون السعر سلبيًا",
};

const timeslotIsBookedPriceError: BookTimeslotError = {
  __typename: "BookTimeslotError",
  message: "Timeslot is already booked.",
  arbMessage: "تم حجز المهلة الزمنية بالفعل",
};

const pastBookingError: BookTimeslotError = {
  __typename: "BookTimeslotError",
  message: "The timeslot is in the past",
  arbMessage: "الفترة الزمنية في الماضي",
};

const timeslotDoesntExistError: BookTimeslotError = {
  __typename: "BookTimeslotError",
  message: "The timeslot doesn't exist",
  arbMessage: "المهلة الزمنية غير موجودة",
};
