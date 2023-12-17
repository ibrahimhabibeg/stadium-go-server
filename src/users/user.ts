import { UserResolvers } from "../types/graphql";

export const UserResolver: UserResolvers = {
  __isTypeOf: (root) => root.__typename === "User",
  upcomingTimeslots: async ({ id }, args, { prisma }) => {
    const now = new Date();
    return prisma.timeslot.findMany({
      where: { userId: Number(id), startTime: { gt: now } },
    });
  },
  currentTimeslots: async ({ id }, args, { prisma }) => {
    const now = new Date();
    return prisma.timeslot.findMany({
      where: {
        userId: Number(id),
        startTime: { lte: now },
        endTime: { gte: now },
      },
    });
  },
  previousTimeslots: async ({ id }, args, { prisma }) => {
    const now = new Date();
    return prisma.timeslot.findMany({
      where: { userId: Number(id), endTime: { lt: now } },
    });
  },
};
