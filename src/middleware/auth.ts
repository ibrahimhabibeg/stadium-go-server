import { IMiddleware, IMiddlewareFunction } from "graphql-middleware";
import { OwnerIdIncludedContext, OwnerIncludedContext } from "../types/context";
import { OwnerAuthorizationError } from "../types/graphql";

const notLoggedInOwnerError: OwnerAuthorizationError = {
  __typename: "OwnerAuthorizationError",
  message:
    "You must be a stadium owner to preform the function ypu requested.",
  arbMessage: "يجب أن تكون مالك لملعب لأداء الوظيفة التي طلبتها",
};

/**
 * Returns error on failure in verifying owner. Returns the result of the resolver in case of verification succes and adds the owner to context.
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
  const newContext = { ...context, owner };
  return resolve(root, args, newContext);
};

/**
 * The authorization layer of the program.
 */
const authorizationMiddleware: IMiddleware = {
  Mutation: {
    createStadium: authorizeOwner,
  },
};

export default authorizationMiddleware;