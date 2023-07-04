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
  Owner,
  OwnerResolvers,
} from "../types/graphql";
import bcrypt from "bcrypt";
import { ownerSignupDataError, userSignupDataError } from "./errorValidation";
import jwt from "jsonwebtoken";
import { emailNotExists, incorrectPassword } from "./errors";
import { authorizations } from "../types/auth";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

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
