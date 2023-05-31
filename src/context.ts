import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { ContextFunction } from "@apollo/server";
import { FullContext } from "./types/context";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { authorizations } from "./types/auth";

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

const createContext: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  FullContext
> = async ({ req, res }) => {  
  const context: FullContext = { prisma, userId: null, ownerId: null };
  const token = req.headers.authorization || "";
  if (!token) return context;
  const decoded = jwt.verify(token, JWT_SECRET);
  if(typeof decoded === "string") return context;
  if(decoded.id && decoded.auth){
    if(decoded.auth === authorizations.OWNER) context.ownerId = decoded.id;
    if(decoded.auth === authorizations.USER) context.userId = decoded.id;
  }
  return context;
};

export default createContext;
