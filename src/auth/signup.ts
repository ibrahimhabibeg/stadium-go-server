import { BaseContext } from "../types/context";
import type {
  Resolver,
  ResolverTypeWrapper,
  AuthError,
  UserAuthPayload,
  MutationUserSignupArgs,
  RequireFields,
  OwnerAuthPayload,
} from "../types/graphql";
import bcrypt from "bcrypt";
import { ownerSignupDataError, userSignupDataError } from "./errorValidation";
import jwt from "jsonwebtoken";
import { authorizations } from "../types/auth";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Creates new user in DB if input data is valid
 * @async
 * @param root - result of upper resolver
 * @param args - contains signupData that contains username, email, and password
 * @param context - shared context containing instance of PrismaClient
 * @returns JWT and User or AuthError in case of invalid signupData
 */
export const userSignupResolver: Resolver<
  ResolverTypeWrapper<AuthError | UserAuthPayload>,
  {},
  BaseContext,
  RequireFields<MutationUserSignupArgs, "signupData">
> = async (root, { signupData: { email, password, username } }, { prisma }) => {
  const dataError = await userSignupDataError(
    email,
    username,
    password,
    prisma
  );
  if (dataError) return { __typename: "AuthError", ...dataError };
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign(
    { id: user.id, auth: authorizations.USER },
    JWT_SECRET
  );
  return {
    __typename: "UserAuthPayload",
    token,
    user: { __typename: "User", ...user },
  };
};

/**
 * Creates new owner in DB if input data is valid
 * @async
 * @param root - result of upper resolver
 * @param args - contains signupData that contains username, email, and password
 * @param context - shared context containing instance of PrismaClient
 * @returns JWT and Owner or AuthError in case of invalid signupData
 */
export const ownerSignupResolver: Resolver<
  ResolverTypeWrapper<AuthError | OwnerAuthPayload>,
  {},
  BaseContext,
  RequireFields<MutationUserSignupArgs, "signupData">
> = async (root, { signupData: { email, password, username } }, { prisma }) => {
  const dataError = await ownerSignupDataError(
    email,
    username,
    password,
    prisma
  );
  if (dataError) return { __typename: "AuthError", ...dataError };
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  const owner = await prisma.owner.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign(
    { id: owner.id, auth: authorizations.OWNER },
    JWT_SECRET
  );
  return {
    __typename: "OwnerAuthPayload",
    token,
    owner: { __typename: "Owner", ...owner },
  };
};
