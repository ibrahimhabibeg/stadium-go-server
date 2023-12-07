import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { FullContext } from "./types/context";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import resolvers from "./resolvers";
import createContext from "./context";
import authorizationMiddleware from "./middleware/auth";
import { DateTimeTypeDefinition } from "graphql-scalars";

const typeDefs = [
  DateTimeTypeDefinition,
  readFileSync("./src/schema.gql", "utf8"),
];

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  authorizationMiddleware
);

const server = new ApolloServer<FullContext>({ schema });

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
  context: createContext,
});

console.log(`🚀  Server ready at: ${url}`);
