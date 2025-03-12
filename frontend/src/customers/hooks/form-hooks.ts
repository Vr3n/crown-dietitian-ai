import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/main";
import { CustomerCreate } from "../types";
import { customerFetchClient, customerKeys, customerQueries } from "../queries";
import { PaginationParams } from "~/fetchClient";

export const useCreateCustomerMutation = () => {
  return useMutation({
    mutationFn: (data: { body: CustomerCreate }) =>
      customerFetchClient.createCustomer(data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
};

export const useCustomersQuery = ({
  skip = 0,
  limit = 100,
}: PaginationParams) => {
  return useQuery(customerQueries.getCustomers({ skip, limit }));
};
