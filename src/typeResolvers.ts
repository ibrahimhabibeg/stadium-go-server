import {
  OwnerResolvers,
  Owner,
  StadiumResolvers,
  Stadium,
} from "./types/graphql";
import { BaseContext } from "./types/context";

export const OwnerResolver: OwnerResolvers<BaseContext, Owner> = {
  __isTypeOf: (root) => root.__typename === "Owner",
  stadiums: async (root, {}, { prisma }: BaseContext) => {
    const stadiums = await prisma.stadium.findMany({
      where: { ownerId: Number(root.id) },
    });
    return stadiums.map((stadium) => ({ ...stadium, __typename: "Stadium" }));
  },
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
