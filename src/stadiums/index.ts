import type {
  Resolver,
  ResolverTypeWrapper,
  OwnerAuthorizationError,
  Stadium,
  RequireFields,
  MutationCreateStadiumArgs,
} from "../types/graphql";
import type { OwnerIdIncludedContext } from "../types/context";

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
