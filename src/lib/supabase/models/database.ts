/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AccountCategories {
  created_date: Generated<Timestamp>;
  id: Generated<number>;
  is_deleted: boolean;
  name: string;
  updated_date: Timestamp | null;
  user_id: number;
}

export interface Accounts {
  account_category_id: number;
  created_date: Generated<Timestamp>;
  id: Generated<number>;
  is_private: Generated<boolean>;
  name: string;
  tenant_id: Int8;
  updated_date: Timestamp | null;
  user_id: number;
}

export interface Bills {
  created_date: Generated<Timestamp>;
  id: Generated<number>;
  name: string;
  updated_date: Timestamp | null;
  user_id: number;
}

export interface Tenants {
  created_date: Generated<Timestamp>;
  id: Generated<number>;
  is_deleted: boolean | null;
  updated_date: Timestamp;
}

export interface TransactionCategories {
  created_date: Generated<Timestamp>;
  id: Generated<number>;
  name: string;
  updated_date: Timestamp | null;
  user_id: number;
}

export interface Transactions {
  account_id: number;
  bill_id: number | null;
  created_date: Generated<Timestamp>;
  id: Generated<number>;
  transaction_category_id: number | null;
  updated_date: Timestamp | null;
}

export interface Users {
  created_date: Generated<Timestamp>;
  external_id: string;
  id: Generated<number>;
  is_active: boolean;
  tenant_id: number;
  updated_date: Timestamp | null;
}

export interface DB {
  account_categories: AccountCategories;
  accounts: Accounts;
  bills: Bills;
  tenants: Tenants;
  transaction_categories: TransactionCategories;
  transactions: Transactions;
  users: Users;
}
