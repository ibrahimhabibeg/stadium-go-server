import type { Prisma, PrismaClient } from "@prisma/client"

export interface BaseContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>
}