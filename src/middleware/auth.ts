import { IMiddleware, IMiddlewareFunction } from "graphql-middleware";
import { OwnerIdIncludedContext } from "../types/context";
import { OwnerAuthorizationError } from "../types/graphql";

const notLoggedInOwnerError: OwnerAuthorizationError = {
  __typename: "OwnerAuthorizationError",
  message:
    "You must be a stadium owner to preform the function you requested.",
  arbMessage: "يجب أن تكون مالك لملعب لأداء الوظيفة التي طلبتها",
};

/**
 * Returns error on failure in verifying owner.
 * Otherwise runs the resolver with context type OwnerIdIncludedContext.
 * The ownerId in context is guranteed to be valid.
 * @param resolve the requested resolver function
 * @param root 
 * @param args any
 * @param context OwnerIdIncludedContext
 * @returns Error or the result of resolver
 */
const authorizeOwner: IMiddlewareFunction<
  {},
  OwnerIdIncludedContext,
  any
> = async (resolve, root, args, context) => {
  if(!context.ownerId) return notLoggedInOwnerError;
  const owner = await context.prisma.owner.findFirst({
    where: { id: context.ownerId },
  });
  if (!owner) return notLoggedInOwnerError;
  return resolve(root, args, context);
};

/**
 * The authorization layer of the program.
 */
const authorizationMiddleware: IMiddleware = {
  Query: {
    verifyOwner: authorizeOwner,
  },
  Mutation: {
    createStadium: authorizeOwner,
  },
};

export default authorizationMiddleware;