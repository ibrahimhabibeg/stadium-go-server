import type { Prisma, PrismaClient } from "@prisma/client";

export interface BaseContext {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
}

export interface FullContext {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  /**
   * The ID of the user. Null if user isn't verified.
   */
  userId: Number;
  /**
   * The ID of the owner. Null if owner isn't verified.
   */
  ownerId: Number;
}
