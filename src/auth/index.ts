import { BaseContext } from "../types/context";
import type {
  Resolver,
  ResolverTypeWrapper,
  AuthError,
  UserAuthPayload,
  MutationUserSignupArgs,
  MutationUserLoginArgs,
  RequireFields,
  OwnerAuthPayload,
} from "../types/graphql";
import bcrypt from "bcrypt";
import { ownerSignupDataError, userSignupDataError } from "./errorValidation";
import jwt from "jsonwebtoken";
import { emailNotExists, incorrectPassword } from "./errors";
import { authorizations } from "../types/auth";
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
  const token = jwt.sign(String({id:user.id, auth:authorizations.USER}), JWT_SECRET);
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
  const token = jwt.sign(String({id:owner.id, auth:authorizations.OWNER}), JWT_SECRET);
  return {
    __typename: "OwnerAuthPayload",
    token,
    owner: { __typename: "Owner", ...owner },
  };
};

/**
 * Login the user
 * @async
 * @param root - result of upper resolver
 * @param args - contains email and password
 * @param context - shared context containing instance of PrismaClient
 * @returns JWT and User or AuthError in case of invalid signupData
 */
export const userLoginResolver: Resolver<
  ResolverTypeWrapper<AuthError | UserAuthPayload>,
  {},
  BaseContext,
  RequireFields<MutationUserLoginArgs, "email" | "password">
> = async (root, { email, password }, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return emailNotExists;
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) return incorrectPassword;
  const token = jwt.sign(String({id:user.id, auth:authorizations.USER}), JWT_SECRET);
  return {
    __typename: "UserAuthPayload",
    token,
    user: { __typename: "User", ...user },
  };
};

/**
 * Login the owner
 * @async
 * @param root - result of upper resolver
 * @param args - contains email and password
 * @param context - shared context containing instance of PrismaClient
 * @returns JWT and Owner or AuthError in case of invalid signupData
 */
export const ownerLoginResolver: Resolver<
  ResolverTypeWrapper<AuthError | OwnerAuthPayload>,
  {},
  BaseContext,
  RequireFields<MutationUserLoginArgs, "email" | "password">
> = async (root, { email, password }, { prisma }) => {
  const owner = await prisma.owner.findUnique({ where: { email } });
  if (!owner) return emailNotExists;
  const isValid = bcrypt.compareSync(password, owner.password);
  if (!isValid) return incorrectPassword;
  const token = jwt.sign(String({id:owner.id, auth:authorizations.OWNER}), JWT_SECRET);
  return {
    __typename: "OwnerAuthPayload",
    token,
    owner: { __typename: "Owner", ...owner },
  };
};