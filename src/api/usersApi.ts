import type {SortOrder} from "../types/sort.ts";
import type {User} from "../types/user.ts";

const API_URL = 'https://dummyjson.com/users';

export const getUsers = async (
    limit: number,
    skip: number,
    sortParam: keyof User,
    sortOrder: SortOrder,
    filterParam: keyof User,
    filterValue: string
): Promise<User[]> => {
    const params = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
    });

    if (sortParam && sortOrder) {
        params.append('sortBy', sortParam);
        params.append('order', sortOrder);
    }

    if (filterParam && filterValue) {
        params.append('key', filterParam);
        params.append('value', filterValue);
    }

    const res = await fetch(`${API_URL}?${params.toString()}`);

    if (!res.ok) {
        throw new Error(
            `Ошибка при получении данных!
            Код ошибки: ${res.status}.
            Текст ошибки: ${res.statusText}`);
    }

    return await res.json();
}