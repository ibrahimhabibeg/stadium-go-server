import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { ContextFunction } from "@apollo/server";
import { FullContext } from "./types/context";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { authorizations } from "./types/auth";

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

/**
 * Creates the context for the rest of the application.
 * Contins userId or ownerId if and only if provided valid JWT in Authorization header.
 * @param param Contains request and result.
 * @returns FullContext
 */
const createContext: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  FullContext
> = async ({ req, res }) => {
  const context: FullContext = { prisma, userId: null, ownerId: null };
  const token = req.headers.authorization || "";
  if (!token) return context;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return context;
    if (decoded.id && decoded.auth) {
      if (decoded.auth === authorizations.OWNER) context.ownerId = decoded.id;
      if (decoded.auth === authorizations.USER) context.userId = decoded.id;
    }
  } catch (error) {}
  return context;
};

export default createContext;
