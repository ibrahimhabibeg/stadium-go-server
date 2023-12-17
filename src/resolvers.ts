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
import { OwnerResolver, UserResolver } from "./users";
import { citiesResolver } from "./city";
import {
  addTimeslotResolver,
  bookTimeslotResolver,
  timeslotResolver,
} from "./timeslot";
import { DateTimeResolver } from "graphql-scalars";

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
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
    addTimeslot: addTimeslotResolver,
    bookTimeslot: bookTimeslotResolver,
  },
  AuthError: {
    __isTypeOf: (root) => root.__typename === "AuthError",
  },
  OwnerAuthorizationError: {
    __isTypeOf: (root) => root.__typename === "OwnerAuthorizationError",
  },
  Location: {
    __isTypeOf: (root) => root.__typename === "Location",
  },
  Owner: OwnerResolver,
  Stadium: StadiumResolver,
  Timeslot: timeslotResolver,
  User: UserResolver,
};

export default resolvers;
