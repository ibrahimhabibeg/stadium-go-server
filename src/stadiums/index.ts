import type {
  Resolver,
  ResolverTypeWrapper,
  OwnerAuthorizationError,
  Stadium,
  RequireFields,
  MutationCreateStadiumArgs,
  QueryGetStadiumArgs,
  QueryGetStadiumsArgs,
  StadiumResolvers
} from "../types/graphql";
import type { OwnerIdIncludedContext, BaseContext } from "../types/context";

export const createStadiumResolver: Resolver<
  ResolverTypeWrapper<OwnerAuthorizationError | Stadium>,
  {},
  OwnerIdIncludedContext,
  RequireFields<MutationCreateStadiumArgs, "stadiumData">
> = async (
  root,
  { stadiumData: { name, desc, count, latitude, longitude, size } },
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
    },
  });
  return { ...stadium, __typename: "Stadium" };
};

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


export const StadiumResolver: StadiumResolvers<BaseContext, Stadium> = {
  __isTypeOf: (root) => root.__typename === "Stadium",
  owner: async (root, {}, { prisma }: BaseContext) => {
    if (root.owner) return root.owner;
    const { owner } = await prisma.stadium.findUnique({
      where: { id: Number(root.id) },
      include: { owner: true },
    });
    return { ...owner, __typename: "Owner" };
  },
  location: async ({ id }, {}, { prisma }: BaseContext) => {
    const location = await prisma.location.findUnique({
      where: { stadiumId: Number(id) },
    });
    if(!location) return location;
    return { ...location, __typename: "Location" };
  },
};
