import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      helloWorld: () => "Hello World!",
    },
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
