import { Resolver, ResolverTypeWrapper, City } from "../types/graphql";
import { BaseContext } from "../types/context";

export const citiesResolver: Resolver<
  ResolverTypeWrapper<City>[],
  {},
  BaseContext,
  {}
> = async (root, {}, { prisma }) => {
  const cities = await prisma.city.findMany();

  return cities;
};
