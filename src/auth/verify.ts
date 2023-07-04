import { Resolver, ResolversTypes } from "../types/graphql";
import {
  OwnerIdIncludedContext,
  UserIdIncludedContext,
} from "../types/context";

type verifyOwnerType = Resolver<
  ResolversTypes["verifyOwnerResult"],
  {},
  OwnerIdIncludedContext
>;

export const verifyOwnerResolver: verifyOwnerType = async (
  root,
  args,
  { ownerId, prisma }
) => {
  const owner = await prisma.owner.findUnique({ where: { id: ownerId } });
  return { __typename: "Owner", ...owner };
};

type verifyUserType = Resolver<
  ResolversTypes["verifyUserResult"],
  {},
  UserIdIncludedContext
>;

export const verifyUserResolver: verifyUserType = async (
  root,
  args,
  { userId, prisma }
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return { __typename: "User", ...user };
};
