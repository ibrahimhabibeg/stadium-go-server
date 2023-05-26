import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number | string; output: number | string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthError = BaseError & {
  __typename?: 'AuthError';
  /** Arabic message indicating the error for the client. */
  arbMessage: Scalars['String']['output'];
  /**
   * The field that the error is related to.
   * Ex: PASSWORD when chosen password is too short
   */
  errorField: AuthField;
  /** English message indicating the error for the client. */
  message: Scalars['String']['output'];
};

export enum AuthField {
  Email = 'EMAIL',
  Password = 'PASSWORD',
  Username = 'USERNAME'
}

export type BaseError = {
  arbMessage: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ownerLogin: OwnerAuthResult;
  ownerSignup: OwnerAuthResult;
  userLogin: UserAuthResult;
  userSignup: UserAuthResult;
};


export type MutationOwnerLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationOwnerSignupArgs = {
  signupData: SignupInput;
};


export type MutationUserLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUserSignupArgs = {
  signupData: SignupInput;
};

export type Owner = {
  __typename?: 'Owner';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type OwnerAuthPayload = {
  __typename?: 'OwnerAuthPayload';
  owner: Owner;
  /** JWT used for later owner authentication. */
  token: Scalars['String']['output'];
};

export type OwnerAuthResult = AuthError | OwnerAuthPayload;

export type Query = {
  __typename?: 'Query';
  helloWorld?: Maybe<Scalars['String']['output']>;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserAuthPayload = {
  __typename?: 'UserAuthPayload';
  /** JWT used for later user authentication. */
  token: Scalars['String']['output'];
  user: User;
};

export type UserAuthResult = AuthError | UserAuthPayload;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  OwnerAuthResult: ( AuthError ) | ( OwnerAuthPayload );
  UserAuthResult: ( AuthError ) | ( UserAuthPayload );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  BaseError: ( AuthError );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthError: ResolverTypeWrapper<AuthError>;
  AuthField: AuthField;
  BaseError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseError']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Owner: ResolverTypeWrapper<Owner>;
  OwnerAuthPayload: ResolverTypeWrapper<OwnerAuthPayload>;
  OwnerAuthResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['OwnerAuthResult']>;
  Query: ResolverTypeWrapper<{}>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserAuthPayload: ResolverTypeWrapper<UserAuthPayload>;
  UserAuthResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserAuthResult']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthError: AuthError;
  BaseError: ResolversInterfaceTypes<ResolversParentTypes>['BaseError'];
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Owner: Owner;
  OwnerAuthPayload: OwnerAuthPayload;
  OwnerAuthResult: ResolversUnionTypes<ResolversParentTypes>['OwnerAuthResult'];
  Query: {};
  SignupInput: SignupInput;
  String: Scalars['String']['output'];
  User: User;
  UserAuthPayload: UserAuthPayload;
  UserAuthResult: ResolversUnionTypes<ResolversParentTypes>['UserAuthResult'];
};

export type AuthErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthError'] = ResolversParentTypes['AuthError']> = {
  arbMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  errorField?: Resolver<ResolversTypes['AuthField'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseError'] = ResolversParentTypes['BaseError']> = {
  __resolveType: TypeResolveFn<'AuthError', ParentType, ContextType>;
  arbMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  ownerLogin?: Resolver<ResolversTypes['OwnerAuthResult'], ParentType, ContextType, RequireFields<MutationOwnerLoginArgs, 'email' | 'password'>>;
  ownerSignup?: Resolver<ResolversTypes['OwnerAuthResult'], ParentType, ContextType, RequireFields<MutationOwnerSignupArgs, 'signupData'>>;
  userLogin?: Resolver<ResolversTypes['UserAuthResult'], ParentType, ContextType, RequireFields<MutationUserLoginArgs, 'email' | 'password'>>;
  userSignup?: Resolver<ResolversTypes['UserAuthResult'], ParentType, ContextType, RequireFields<MutationUserSignupArgs, 'signupData'>>;
};

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerAuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnerAuthPayload'] = ResolversParentTypes['OwnerAuthPayload']> = {
  owner?: Resolver<ResolversTypes['Owner'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerAuthResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnerAuthResult'] = ResolversParentTypes['OwnerAuthResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'OwnerAuthPayload', ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  helloWorld?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAuthPayload'] = ResolversParentTypes['UserAuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAuthResult'] = ResolversParentTypes['UserAuthResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'UserAuthPayload', ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthError?: AuthErrorResolvers<ContextType>;
  BaseError?: BaseErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  OwnerAuthPayload?: OwnerAuthPayloadResolvers<ContextType>;
  OwnerAuthResult?: OwnerAuthResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAuthPayload?: UserAuthPayloadResolvers<ContextType>;
  UserAuthResult?: UserAuthResultResolvers<ContextType>;
};

