import { BaseContext } from "../types/context";
import type {
  Resolver,
  ResolverTypeWrapper,
  AuthError,
  UserAuthPayload,
  MutationUserSignupArgs,
  RequireFields,
} from "../types/graphql";
import bcrypt from "bcrypt";
import { userSignupDataError } from "./errorValidation";
import jwt from "jsonwebtoken";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Creates new user in DB if input data is valid.
 * @param root
 * @param { email, password, username }
 * @param { prisma }
 * @returns JWT and the new user or AuthError in case of invalid input data
 */
export const userSignupResolver: Resolver<
  ResolverTypeWrapper<AuthError | UserAuthPayload>
> = async (
  root,
  {
    signupData: { email, password, username },
  }: RequireFields<MutationUserSignupArgs, "signupData">,
  { prisma }: BaseContext
) => {
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
  const token = jwt.sign(String(user.id), JWT_SECRET);
  return { __typename: "UserAuthPayload", token, user:{__typename:"User", ...user}};
};
