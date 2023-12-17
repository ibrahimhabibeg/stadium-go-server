import type {
  Resolver,
  ResolverTypeWrapper,
  OwnerAuthorizationError,
  Stadium,
  RequireFields,
  MutationCreateStadiumArgs,
  QueryGetStadiumArgs,
  QueryGetStadiumsArgs,
  StadiumResolvers,
} from "../types/graphql";
import type { OwnerIdIncludedContext, BaseContext } from "../types/context";

/**
 * Creates new stadium with the given input in args. Owner of stadium is known from authorization header.
 * Authorization layer is responsiple for storing ownerId in context and handling invalid owner authorization errors.
 * @param root
 * @param args contains new stadium data
 * @param context contains instance of PrismaClient and ownerId
 * @returns The newly created stadium
 */
export const createStadiumResolver: Resolver<
  ResolverTypeWrapper<OwnerAuthorizationError | Stadium>,
  {},
  OwnerIdIncludedContext,
  RequireFields<MutationCreateStadiumArgs, "stadiumData">
> = async (
  root,
  { stadiumData: { name, desc, count, latitude, longitude, size, cityId } },
  { prisma, ownerId }
) => {
  const stadium = await prisma.stadium.create({
    data: {
      name,
      desc,
      count: count ? count : 1,
      size,
      Location:
        longitude && latitude ? { create: { longitude, latitude } } : undefined,
      owner: { connect: { id: ownerId } },
      city: cityId ? { connect: { id: Number(cityId) } } : undefined,
    },
  });
  return { ...stadium, __typename: "Stadium" };
};

/**
 * Gets requested stadium
 * @param root
 * @param args contains stadium id
 * @param context contains instance of PrismaClient
 * @returns requested stadium
 */
export const getStadiumResolver: Resolver<
  ResolverTypeWrapper<Stadium>,
  {},
  BaseContext,
  RequireFields<QueryGetStadiumArgs, "stadiumId">
> = async (root, { stadiumId }, { prisma }) => {
  const stadium = await prisma.stadium.findUnique({
    where: {
      id: Number(stadiumId),
    },
  });
  return { ...stadium, __typename: "Stadium" };
};

/**
 * Gets stadiums ordered by descending id.
 * Handles filtering and cursor pagination on id.
 * @param root
 * @param args containg cursor, filter, and take
 * @param context contains instance of PrismaClient
 * @returns stadiums
 */
export const getStadiumsResolver: Resolver<
  ResolverTypeWrapper<Stadium>[],
  {},
  BaseContext,
  Partial<QueryGetStadiumsArgs>
> = async (root, { cursor, filter, take = 5 }, { prisma }) => {
  const stadiums = await prisma.stadium.findMany({
    orderBy: { id: "desc" },
    where: {
      ...(cursor ? { id: { lt: Number(cursor) } } : {}),
      ...(filter
        ? {
            OR: [
              { name: { contains: filter } },
              { desc: { contains: filter } },
            ],
          }
        : {}),
    },
    take,
  });
  return stadiums.map((stadium) => ({ ...stadium, __typename: "Stadium" }));
};

/**
 * Resolves upper resolvers that return a stadium
 */
export const StadiumResolver: StadiumResolvers<BaseContext, Stadium> = {
  __isTypeOf: (root) => root.__typename === "Stadium",
  /**
   * Gets owner of the stadium
   * @param root contains id of stadium and may contain owner
   * @param args
   * @param context contains instance of PrismaClient
   * @returns owner
   */
  owner: async (root, {}, { prisma }: BaseContext) => {
    if (root.owner) return root.owner;
    const { owner } = await prisma.stadium.findUnique({
      where: { id: Number(root.id) },
      include: { owner: true },
    });
    return { ...owner, __typename: "Owner" };
  },
  /**
   * Gets location of stadium if it was provided
   * @param root contains id of stadium
   * @param args
   * @param context contains instance of PrismaClient
   * @returns location or null
   */
  location: async ({ id }, {}, { prisma }: BaseContext) => {
    const location = await prisma.location.findUnique({
      where: { stadiumId: Number(id) },
    });
    if (!location) return location;
    return { ...location, __typename: "Location" };
  },
  city: async ({ id, city }, {}, { prisma }: BaseContext) => {
    if (city) return city;
    const stadium = await prisma.stadium.findUnique({
      where: { id: Number(id) },
      select: { city: true },
    });
    return stadium.city;
  },
  avillableTimeslots: async ({ id }, {}, { prisma }) => {
    const now = new Date();
    return prisma.timeslot.findMany({
      where: { stadiumId: Number(id), userId: null, startTime: { gt: now } },
    });
  },
  bookedTimeslots: async ({ id }, {}, { prisma }) => {
    const now = new Date();
    return prisma.timeslot.findMany({
      where: {
        stadiumId: Number(id),
        userId: { not: null },
        startTime: { gt: now },
      },
    });
  },
  oldTimeslots: async ({ id }, {}, { prisma }) => {
    const now = new Date();
    return prisma.timeslot.findMany({
      where: { stadiumId: Number(id), startTime: { lte: now } },
    });
  },
};
