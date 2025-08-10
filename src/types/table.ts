import type { Address, User } from "./user.ts";

export type TableHeaders = { key: keyof User | keyof Address; label: string };
