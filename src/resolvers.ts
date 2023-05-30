import { Resolvers } from "./types/graphql";
import {
  userSignupResolver,
  ownerSignupResolver,
  userLoginResolver,
  ownerLoginResolver,
} from "./auth";
import { StadiumResolver, OwnerResolver } from "./typeResolvers";

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    userSignup: userSignupResolver,
    ownerSignup: ownerSignupResolver,
    userLogin: userLoginResolver,
    ownerLogin: ownerLoginResolver,
  },
  AuthError: {
    __isTypeOf: (root) => root.__typename === "AuthError",
  },
  User: {
    __isTypeOf: (root) => root.__typename === "User",
  },
  Owner: OwnerResolver,
  Stadium: StadiumResolver,
};

export default resolvers;
