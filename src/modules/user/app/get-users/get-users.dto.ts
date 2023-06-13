import {
  ArrayParam,
  BooleanParam,
  decodeQueryParams,
  NumberParam,
  withDefault,
} from "serialize-query-params";

export interface GetUsersFilter {
  isActive?: boolean | null;
  role?: Array<string | null> | null;
}

export interface GetUsersDto {
  query: {
    filters: GetUsersFilter;
    limit: number;
    page: number;
    sort: any;
  };
}

export const getUsersDto = (query: any): GetUsersDto => {
  const { page, limit, role, isActive } = decodeQueryParams(
    {
      role: ArrayParam,
      isActive: BooleanParam,
      limit: withDefault(NumberParam, 10, false),
      page: withDefault(NumberParam, 1, false),
    },
    query
  );

  const filters: GetUsersFilter = {};

  if (role != null) {
    filters.role = role;
  }

  if (isActive != null) {
    filters.isActive = isActive;
  }

  return {
    query: {
      limit: limit as number,
      page: page as number,
      sort: "",
      filters,
    },
  };
};
