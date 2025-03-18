import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/main";
import { Customer, CustomerCreate } from "../types";
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: customerKeys.lists() });

      // Snapshot previous list data.
      const previousCustomers = queryClient.getQueryData(customerKeys.lists());

      // Optimistically remove the customer from the list.
      queryClient.setQueryData(customerKeys.lists(), (old: Customer[]) =>
        old ? old.filter((customer: Customer) => customer.id !== id) : [],
      );

      return { previousCustomers };
    },
    onSuccess: (_, deletedId) => {
      // Invalidate Detail customer queries.
      queryClient.removeQueries({ queryKey: customerKeys.detail(deletedId) });

      // Invalidate list queries.
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      toast.success("Customer Deleted Successfully!");
    },
    onError: (error, _, context) => {
      // Rollback on erorr.
      if (context?.previousCustomers) {
        queryClient.setQueryData(
          customerKeys.lists(),
          context.previousCustomers,
        );
      }

      toast.error("Failed to delete customer. Please try again.");
      console.log("error during fetch: ", error);
    },
    onSettled: () => {
      // Ensure the list is refetched after the mutation.
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
};

export const useUpdateCustomerMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CustomerCreate> }) =>
      customerFetchClient.updateCustomer(id, body),
    onMutate: async ({ id, body }) => {
      await queryClient.cancelQueries({ queryKey: customerKeys.detail(id) });

      const previousCustomer: Customer | undefined = queryClient.getQueryData(
        customerKeys.detail(id),
      );

      queryClient.setQueryData(customerKeys.detail(id), (old: Customer) => ({
        ...old,
        ...body,
      }));

      return { previousCustomer };
    },
    onSuccess: (updatedCustomer) => {
      // update the specific customer in the cache.
      queryClient.setQueryData(
        customerKeys.detail(updatedCustomer.id),
        updatedCustomer,
      );

      // invalidate the list queries as the might be affected.
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });

      toast.success("Customer Updated Successfully!");
    },
    onError(error, _, context) {
      // Rollback on error.
      if (context?.previousCustomer) {
        queryClient.setQueryData(
          customerKeys.detail(context.previousCustomer.id),
          context.previousCustomer,
        );
      }

      toast.error("Failed to updated customer. Please try again.");
      console.log("Update customer error: ", error);
    },
    onSettled: (_, __, { id }) => {
      // Ensure cache is refreshed.
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
};
