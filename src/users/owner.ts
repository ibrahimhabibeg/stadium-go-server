import { BaseContext } from "../types/context";
import type { Owner, OwnerResolvers } from "../types/graphql";
import dotenv from "dotenv";

dotenv.config();

/**
 * Resolves upper resolvers that return an owner
 */
export const OwnerResolver: OwnerResolvers<BaseContext, Owner> = {
  __isTypeOf: (root) => root.__typename === "Owner",
  /**
   * Gets the stadiums of the owner
   * @param root contains id of owner
   * @param args
   * @param context contains instance of PrismaClient
   * @returns stadiums
   */
  stadiums: async (root, {}, { prisma }: BaseContext) => {
    const stadiums = await prisma.stadium.findMany({
      where: { ownerId: Number(root.id) },
    });
    return stadiums.map((stadium) => ({ ...stadium, __typename: "Stadium" }));
  },
};