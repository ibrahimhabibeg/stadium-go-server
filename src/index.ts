import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { Resolvers } from "./types/graphql";
import { PrismaClient } from "@prisma/client";
import { BaseContext } from "./types/context";

const typeDefs = readFileSync("./src/schema.gql", "utf8");

const resolvers: Resolvers = {
  Query: {
    helloWorld: () => "Hello World!",
  },
};

const prisma = new PrismaClient();

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { 
  listen: { 
    port: 4000
   },
   context: async ({ req, res }) => ({
    prisma: prisma,
  }),
});

console.log(`🚀  Server ready at: ${url}`);
