import { GraphQLResolveInfo } from 'graphql';
import { BaseContext } from './context';
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

export type City = {
  __typename?: 'City';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createStadium: CreateStadiumResult;
  ownerLogin: OwnerAuthResult;
  ownerSignup: OwnerAuthResult;
  userLogin: UserAuthResult;
  userSignup: UserAuthResult;
};


export type MutationCreateStadiumArgs = {
  stadiumData: CreateStadiumInput;
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
  stadiums?: Maybe<Array<Stadium>>;
  username: Scalars['String']['output'];
};


export type OwnerStadiumsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type OwnerAuthPayload = {
  __typename?: 'OwnerAuthPayload';
  owner: Owner;
  /** JWT used for later owner authentication. */
  token: Scalars['String']['output'];
};

export type OwnerAuthResult = AuthError | OwnerAuthPayload;

export type OwnerAuthorizationError = BaseError & {
  __typename?: 'OwnerAuthorizationError';
  arbMessage: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  getStadium: Stadium;
  getStadiums: Array<Stadium>;
  verifyOwner: VerifyOwnerResult;
  verifyUser: VerifyUserResult;
};


export type QueryGetStadiumArgs = {
  stadiumId: Scalars['ID']['input'];
};


export type QueryGetStadiumsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Stadium = {
  __typename?: 'Stadium';
  city?: Maybe<City>;
  /** The number of stadiums of the same properties the owner has. */
  count: Scalars['Int']['output'];
  /** Description for the stadium. */
  desc?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  name: Scalars['String']['output'];
  owner?: Maybe<Owner>;
  /** The number of players per team including the goal keeper. */
  size?: Maybe<Scalars['Int']['output']>;
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

export type UserAuthorizationError = BaseError & {
  __typename?: 'UserAuthorizationError';
  arbMessage: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type CreateStadiumInput = {
  cityId?: InputMaybe<Scalars['ID']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateStadiumResult = OwnerAuthorizationError | Stadium;

export type VerifyOwnerResult = Owner | OwnerAuthorizationError;

export type VerifyUserResult = User | UserAuthorizationError;



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
  createStadiumResult: ( OwnerAuthorizationError ) | ( Stadium );
  verifyOwnerResult: ( Owner ) | ( OwnerAuthorizationError );
  verifyUserResult: ( User ) | ( UserAuthorizationError );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  BaseError: ( AuthError ) | ( OwnerAuthorizationError ) | ( UserAuthorizationError );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthError: ResolverTypeWrapper<AuthError>;
  AuthField: AuthField;
  BaseError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseError']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  City: ResolverTypeWrapper<City>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
  Mutation: ResolverTypeWrapper<{}>;
  Owner: ResolverTypeWrapper<Owner>;
  OwnerAuthPayload: ResolverTypeWrapper<OwnerAuthPayload>;
  OwnerAuthResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['OwnerAuthResult']>;
  OwnerAuthorizationError: ResolverTypeWrapper<OwnerAuthorizationError>;
  Query: ResolverTypeWrapper<{}>;
  SignupInput: SignupInput;
  Stadium: ResolverTypeWrapper<Stadium>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserAuthPayload: ResolverTypeWrapper<UserAuthPayload>;
  UserAuthResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserAuthResult']>;
  UserAuthorizationError: ResolverTypeWrapper<UserAuthorizationError>;
  createStadiumInput: CreateStadiumInput;
  createStadiumResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['createStadiumResult']>;
  verifyOwnerResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['verifyOwnerResult']>;
  verifyUserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['verifyUserResult']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthError: AuthError;
  BaseError: ResolversInterfaceTypes<ResolversParentTypes>['BaseError'];
  Boolean: Scalars['Boolean']['output'];
  City: City;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
  Mutation: {};
  Owner: Owner;
  OwnerAuthPayload: OwnerAuthPayload;
  OwnerAuthResult: ResolversUnionTypes<ResolversParentTypes>['OwnerAuthResult'];
  OwnerAuthorizationError: OwnerAuthorizationError;
  Query: {};
  SignupInput: SignupInput;
  Stadium: Stadium;
  String: Scalars['String']['output'];
  User: User;
  UserAuthPayload: UserAuthPayload;
  UserAuthResult: ResolversUnionTypes<ResolversParentTypes>['UserAuthResult'];
  UserAuthorizationError: UserAuthorizationError;
  createStadiumInput: CreateStadiumInput;
  createStadiumResult: ResolversUnionTypes<ResolversParentTypes>['createStadiumResult'];
  verifyOwnerResult: ResolversUnionTypes<ResolversParentTypes>['verifyOwnerResult'];
  verifyUserResult: ResolversUnionTypes<ResolversParentTypes>['verifyUserResult'];
};

export type AuthErrorResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['AuthError'] = ResolversParentTypes['AuthError']> = {
  arbMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  errorField?: Resolver<ResolversTypes['AuthField'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseErrorResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['BaseError'] = ResolversParentTypes['BaseError']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'OwnerAuthorizationError' | 'UserAuthorizationError', ParentType, ContextType>;
  arbMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CityResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createStadium?: Resolver<ResolversTypes['createStadiumResult'], ParentType, ContextType, RequireFields<MutationCreateStadiumArgs, 'stadiumData'>>;
  ownerLogin?: Resolver<ResolversTypes['OwnerAuthResult'], ParentType, ContextType, RequireFields<MutationOwnerLoginArgs, 'email' | 'password'>>;
  ownerSignup?: Resolver<ResolversTypes['OwnerAuthResult'], ParentType, ContextType, RequireFields<MutationOwnerSignupArgs, 'signupData'>>;
  userLogin?: Resolver<ResolversTypes['UserAuthResult'], ParentType, ContextType, RequireFields<MutationUserLoginArgs, 'email' | 'password'>>;
  userSignup?: Resolver<ResolversTypes['UserAuthResult'], ParentType, ContextType, RequireFields<MutationUserSignupArgs, 'signupData'>>;
};

export type OwnerResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stadiums?: Resolver<Array<ResolversTypes['Stadium']>, ParentType, ContextType, Partial<OwnerStadiumsArgs>>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerAuthPayloadResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['OwnerAuthPayload'] = ResolversParentTypes['OwnerAuthPayload']> = {
  owner?: Resolver<ResolversTypes['Owner'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerAuthResultResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['OwnerAuthResult'] = ResolversParentTypes['OwnerAuthResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'OwnerAuthPayload', ParentType, ContextType>;
};

export type OwnerAuthorizationErrorResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['OwnerAuthorizationError'] = ResolversParentTypes['OwnerAuthorizationError']> = {
  arbMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType>;
  getStadium?: Resolver<ResolversTypes['Stadium'], ParentType, ContextType, RequireFields<QueryGetStadiumArgs, 'stadiumId'>>;
  getStadiums?: Resolver<Array<ResolversTypes['Stadium']>, ParentType, ContextType, Partial<QueryGetStadiumsArgs>>;
  verifyOwner?: Resolver<ResolversTypes['verifyOwnerResult'], ParentType, ContextType>;
  verifyUser?: Resolver<ResolversTypes['verifyUserResult'], ParentType, ContextType>;
};

export type StadiumResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['Stadium'] = ResolversParentTypes['Stadium']> = {
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Owner'], ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthPayloadResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['UserAuthPayload'] = ResolversParentTypes['UserAuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthResultResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['UserAuthResult'] = ResolversParentTypes['UserAuthResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'UserAuthPayload', ParentType, ContextType>;
};

export type UserAuthorizationErrorResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['UserAuthorizationError'] = ResolversParentTypes['UserAuthorizationError']> = {
  arbMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateStadiumResultResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['createStadiumResult'] = ResolversParentTypes['createStadiumResult']> = {
  __resolveType: TypeResolveFn<'OwnerAuthorizationError' | 'Stadium', ParentType, ContextType>;
};

export type VerifyOwnerResultResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['verifyOwnerResult'] = ResolversParentTypes['verifyOwnerResult']> = {
  __resolveType: TypeResolveFn<'Owner' | 'OwnerAuthorizationError', ParentType, ContextType>;
};

export type VerifyUserResultResolvers<ContextType = BaseContext, ParentType extends ResolversParentTypes['verifyUserResult'] = ResolversParentTypes['verifyUserResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UserAuthorizationError', ParentType, ContextType>;
};

export type Resolvers<ContextType = BaseContext> = {
  AuthError?: AuthErrorResolvers<ContextType>;
  BaseError?: BaseErrorResolvers<ContextType>;
  City?: CityResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Owner: OwnerResolvers<ContextType>;
  OwnerAuthPayload?: OwnerAuthPayloadResolvers<ContextType>;
  OwnerAuthResult?: OwnerAuthResultResolvers<ContextType>;
  OwnerAuthorizationError?: OwnerAuthorizationErrorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stadium: StadiumResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAuthPayload?: UserAuthPayloadResolvers<ContextType>;
  UserAuthResult?: UserAuthResultResolvers<ContextType>;
  UserAuthorizationError?: UserAuthorizationErrorResolvers<ContextType>;
  createStadiumResult?: CreateStadiumResultResolvers<ContextType>;
  verifyOwnerResult?: VerifyOwnerResultResolvers<ContextType>;
  verifyUserResult?: VerifyUserResultResolvers<ContextType>;
};

