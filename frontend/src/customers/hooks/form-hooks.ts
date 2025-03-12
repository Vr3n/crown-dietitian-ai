import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/main";
import { CustomerCreate } from "../types";
import { customerFetchClient, customerKeys, customerQueries } from "../queries";
import { PaginationParams } from "~/fetchClient";
import { toast } from "sonner";

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

export const useDeleteCustomerMutation = () => {
  return useMutation({
    mutationFn: (id: string) => customerFetchClient.deleteCustomer(id),
    onSuccess: (_, deletedId) => {
      // Invalidate Detail customer queries.
      queryClient.removeQueries({ queryKey: customerKeys.detail(deletedId) });

      // Invalidate list queries.
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
};

export const useUpdateCustomerMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CustomerCreate> }) =>
      customerFetchClient.updateCustomer(id, body),
    onSuccess: (updatedCustomer) => {
      // update the specific customer in the cache.
      queryClient.setQueryData(
        customerKeys.detail(updatedCustomer.id),
        updatedCustomer
      );

      // invalidate the list queries as the might be affected.
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
};
