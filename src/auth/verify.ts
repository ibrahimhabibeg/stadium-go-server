import { Resolver, ResolversTypes } from "../types/graphql";
import { OwnerIdIncludedContext } from "../types/context";

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
