import type { Owner, Prisma, PrismaClient, User } from "@prisma/client";

export interface BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
}

export interface FullContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  /**
   * The ID of the user. Null if user isn't verified.
   */
  userId: number;
  /**
   * The ID of the owner. Null if owner isn't verified.
   */
  ownerId: number;
}

/**
 * The context for resolvers that require a user
 */
export interface UserIncludedContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  user: User;
}

/**
 * The context for resolvers that require an owner
 */
export interface OwnerIncludedContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  owner: Owner;
}
export interface UserIdIncludedContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  userId: number;
}
export interface OwnerIdIncludedContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  ownerId: number;
}

export interface FullContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  /**
   * The ID of the user. Null if user isn't verified.
   */
  userId: number;
  /**
   * The ID of the owner. Null if owner isn't verified.
   */
  ownerId: number;
}

export interface StadiumAndOwnerContext extends BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  /**
   * The ID of the user. Null if user isn't verified.
   */
  stadiumId: number;
  /**
   * The ID of the owner. Null if owner isn't verified.
   */
  ownerId: number;
}
