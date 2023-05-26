import { Resolvers } from "./types/graphql";
import {
  userSignupResolver,
  ownerSignupResolver,
  userLoginResolver,
  ownerLoginResolver,
} from "./auth";

const resolvers: Resolvers = {
  Query: {
    helloWorld: () => "Hello World!",
  },
  Mutation: {
    userSignup: userSignupResolver,
    ownerSignup: ownerSignupResolver,
    userLogin: userLoginResolver,
    ownerLogin: ownerLoginResolver
  },
  AuthError: {
    __isTypeOf: (root) => root.__typename === "AuthError",
  },
  User: {
    __isTypeOf: (root) => root.__typename === "User",
    id: (root) => root.id,
    email: (root) => root.email,
    username: (root) => root.username,
  },
};

export default resolvers;
