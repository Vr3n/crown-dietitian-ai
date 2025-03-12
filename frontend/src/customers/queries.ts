import { BASE_URL, handleRepsonse, type PaginationParams } from "~/fetchClient";
import { Customer, CustomerCreate } from "./types";
import { QueryClient } from "@tanstack/react-query";

export const customerFetchClient = {
  getCustomers: async ({ skip = 0, limit = 0 }: PaginationParams) => {
    const response = await fetch(
      `${BASE_URL}/customers/?skip=${skip}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return handleRepsonse<Customer[]>(response);
  },
  createCustomer: async (customer: CustomerCreate) => {
    const res = await fetch(`${BASE_URL}/customers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    return handleRepsonse<Customer>(res);
  },
};

export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,
  list: (filters: PaginationParams) =>
    [...customerKeys.lists(), filters] as const,
  details: () => [...customerKeys.all, "detail"] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

export const customerQueries = {
  getCustomers: (params: PaginationParams = { skip: 0, limit: 100 }) => ({
    queryKey: customerKeys.list(params),
    queryFn: () => customerFetchClient.getCustomers(params),
    staleTime: 5 * 60 * 1000,
  }),
};

export const invalidateCustomerQueries = (queryClient: QueryClient) => {
  return queryClient.invalidateQueries({ queryKey: customerKeys.all });
};
