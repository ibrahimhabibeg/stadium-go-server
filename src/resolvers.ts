import { Resolvers } from "./types/graphql";
import {
  userSignupResolver,
  ownerSignupResolver,
  userLoginResolver,
  ownerLoginResolver,
  verifyOwnerResolver,
  verifyUserResolver,
} from "./auth";
import {
  createStadiumResolver,
  getStadiumResolver,
  getStadiumsResolver,
  StadiumResolver,
} from "./stadiums";
import { OwnerResolver } from "./users";
import { citiesResolver } from "./city";

const resolvers: Resolvers = {
  Query: {
    getStadium: getStadiumResolver,
    getStadiums: getStadiumsResolver,
    verifyOwner: verifyOwnerResolver,
    verifyUser: verifyUserResolver,
    cities: citiesResolver,
  },
  Mutation: {
    userSignup: userSignupResolver,
    ownerSignup: ownerSignupResolver,
    userLogin: userLoginResolver,
    ownerLogin: ownerLoginResolver,
    createStadium: createStadiumResolver,
  },
  AuthError: {
    __isTypeOf: (root) => root.__typename === "AuthError",
  },
  User: {
    __isTypeOf: (root) => root.__typename === "User",
  },
  OwnerAuthorizationError: {
    __isTypeOf: (root) => root.__typename === "OwnerAuthorizationError",
  },
  Location: {
    __isTypeOf: (root) => root.__typename === "Location",
  },
  Owner: OwnerResolver,
  Stadium: StadiumResolver,
};

export default resolvers;
