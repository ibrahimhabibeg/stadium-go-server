import {
  Resolver,
  ResolverTypeWrapper,
  InvalidTimeslotDataError,
  OwnerAuthorizationError,
  Timeslot,
  RequireFields,
  MutationAddTimeslotArgs,
  TimeslotResolvers,
} from "../types/graphql";
import { StadiumAndOwnerContext } from "../types/context";

export const timeslotResolver: TimeslotResolvers = {
  stadium: async ({ stadiumId }, args, { prisma }) => {
    const stadium = await prisma.stadium.findUnique({
      where: { id: Number(stadiumId) },
    });
    return { ...stadium, __typename: "Stadium" };
  },
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
