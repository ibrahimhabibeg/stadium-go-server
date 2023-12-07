import { IMiddleware, IMiddlewareFunction } from "graphql-middleware";
import { StadiumAndOwnerContext } from "../types/context";
import { OwnerAuthorizationError } from "../types/graphql";

const notStadiumOwner: OwnerAuthorizationError = {
  message: "You are not the owner of the stadium.",
  arbMessage: "أنت لست مالك الملعب",
};

/**
 * Checks if the user is indeed the valid owner of the called stadium.
 * Checks the ownerId and stadiumId inside context
 * @param resolve the requested resolver function
 * @param root
 * @param args any
 * @param context
 * @returns Error or the result of resolver
 */
const authorizeStadiumAndOwnerRelation: IMiddlewareFunction<
  {},
  StadiumAndOwnerContext,
  any
> = async (resolve, root, args, context) => {
  const { prisma, ownerId, stadiumId } = context;
  const stadium = await prisma.stadium.findFirst({
    where: { id: stadiumId, ownerId },
  });
  if (!stadium) return notStadiumOwner;
  return resolve(root, args, context);
};

const stadiumMiddleware: IMiddleware = {
  Mutation: {
    addTimeslot: authorizeStadiumAndOwnerRelation,
  },
};

export default stadiumMiddleware;
