import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { BaseContext } from "./types/context";
import resolvers from "./resolvers";

const typeDefs = readFileSync("./src/schema.gql", "utf8");

const prisma = new PrismaClient();

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
  context: async ({ req, res }) => ({
    prisma: prisma,
  }),
});

console.log(`🚀  Server ready at: ${url}`);
