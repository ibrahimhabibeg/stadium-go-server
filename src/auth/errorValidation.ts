import type { PrismaClient } from "@prisma/client";
import type { AuthError } from "../types/graphql";
import {
  usernameAlreadyTakenError,
  emailAlreadyTakenError,
  shortPasswordError,
  usernameInvalidCharacterError,
  invalidEmailError,
} from "./errors";

/**
 * @description Ensures username and email are not duplicated in user table, and ensures all signup data fit user data requirments.
 * @async
 * @param email
 * @param username
 * @param password
 * @param prisma
 * @returns AuthError if there a reguirment is not validated
 */
export const userSignupDataError = async (
  email: string,
  username: string,
  password: string,
  prisma: PrismaClient
): Promise<AuthError> => {
  const repeatedEmailUser = await prisma.user.findUnique({ where: { email } });
  if (repeatedEmailUser) return emailAlreadyTakenError;
  const repeatedUsernameUser = await prisma.user.findUnique({
    where: { username },
  });
  if (repeatedUsernameUser) return usernameAlreadyTakenError;
  const requirmentsError = signupDataRequirmentsError(
    username,
    email,
    password
  );
  if (requirmentsError) return requirmentsError;
  return null;
};

/**
 * @description Ensures username and email are not duplicated in owners table, and ensures all signup data fit owner data requirments.
 * @async
 * @param email
 * @param username
 * @param password
 * @param prisma
 * @returns AuthError if there a reguirment is not validated
 */
export const ownerSignupDataError = async (
  email: string,
  username: string,
  password: string,
  prisma: PrismaClient
): Promise<AuthError> => {
  const repeatedEmailOwner = await prisma.owner.findUnique({
    where: { email },
  });
  if (repeatedEmailOwner) return emailAlreadyTakenError;
  const repeatedUsernameOwner = await prisma.owner.findUnique({
    where: { username },
  });
  if (repeatedUsernameOwner) return usernameAlreadyTakenError;
  const requirmentsError = signupDataRequirmentsError(
    username,
    email,
    password
  );
  if (requirmentsError) return requirmentsError;
  return null;
};

/**
 * Checks all signup data field for requirments errors. This doesn't include requirments related to DB.
 * @param username
 * @param email
 * @param password
 * @returns
 */
const signupDataRequirmentsError = (
  username: string,
  email: string,
  password: string
): AuthError => {
  const passwordError = passwordRequirmentsError(password);
  if (passwordError) return passwordError;
  const usernameError = usernameRequirmentsError(username);
  if (usernameError) return usernameError;
  const emailError = emailRequirmentsError(email);
  if (emailError) return emailError;
  return null;
};

/**
 * Ensures username doesn't contain any invalid characters
 * @param username
 * @returns AuthError if username has invalid character
 */
const usernameRequirmentsError = (username: string): AuthError => {
  if (username.includes(" ")) return usernameInvalidCharacterError;
  return null;
};

/**
 * Ensures email is a real email
 * @param email
 * @returns AuthError if email isn't a real email
 */
const emailRequirmentsError = (email: string): AuthError => {
  const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(email)) return invalidEmailError;
  return null;
};

/**
 * Ensures passsword length is valid
 * @param password
 * @returns AuthError if password too short
 */
const passwordRequirmentsError = (password: string): AuthError => {
  if (password.length < 6) return shortPasswordError;
  return null;
};
