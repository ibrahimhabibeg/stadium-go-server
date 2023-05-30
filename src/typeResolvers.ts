import {
  OwnerResolvers,
  Owner,
  StadiumResolvers,
  Stadium,
} from "./types/graphql";
import { BaseContext } from "./types/context";

export const OwnerResolver: OwnerResolvers<BaseContext, Owner> = {
  __isTypeOf: (root) => root.__typename === "Owner",
  stadiums: (root, {}, { prisma }: BaseContext) => {
    return prisma.stadium.findMany({ where: { ownerId: Number(root.id) } });
  },
};

export const StadiumResolver: StadiumResolvers<BaseContext, Stadium> = {
  __isTypeOf: (root) => root.__typename === "Stadium",
  owner: async (root, {}, { prisma }: BaseContext) => {
    const { owner } = await prisma.stadium.findUnique({
      where: { id: Number(root.id) },
      include: { owner: true },
    });
    return owner;
  },
};
