import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { Resolvers } from "./types/graphql";

const typeDefs = readFileSync("./src/schema.gql", "utf8");

const resolvers: Resolvers = {
  Query: {
    helloWorld: () => "Hello World!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
