import type { SortOrder } from "../types/sort.ts";
import type { Address, User } from "../types/user.ts";

const BASE_API_URL = "https://dummyjson.com/users";

export const getUsers = async (
  limit: number,
  skip: number,
  sortParam?: keyof User | keyof Address,
  sortOrder?: SortOrder,
  filterParam?: keyof User,
  filterValue?: string,
) => {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortParam && sortOrder) {
    params.append("sortBy", sortParam);
    params.append("order", sortOrder);
  }

  if (filterParam && filterValue) {
    params.append("key", filterParam);
    params.append("value", filterValue);
  }

  const url =
    filterParam && filterValue
      ? `${BASE_API_URL}/filter?${params.toString()}`
      : `${BASE_API_URL}?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Ошибка при получении данных!
            Код ошибки: ${res.status}.
            Текст ошибки: ${res.statusText}`,
    );
  }

  return await res.json();
};
