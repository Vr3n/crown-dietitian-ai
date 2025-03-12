import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { customerQueries } from "~/customers/queries";
import type { Customer, CustomerCreate } from "~/customers/types";
import ErrorComponent from "~/components/error-boundary";
import CustomerTable from "~/customers/customer-table/customer-table";
import {
  useCreateCustomerMutation,
  useCustomersQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} from "~/customers/hooks/form-hooks";
import SheetFormContainer from "~/components/form-containers/sheet-form-container";
import { CustomerForm } from "~/customers/forms/customer-form";
import CustomerTableSkeleton from "~/customers/customer-table/skeleton";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    // Defining customer query key.
    return queryClient.ensureQueryData(customerQueries.getCustomers());
  },
  pendingComponent: CustomerTableSkeleton,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData() as Customer[];

  // Keeping the query active to enable background refetching.
  const {
    data: customerData = initialData,
    isLoading,
    isError,
  } = useCustomersQuery({ skip: 0, limit: 100 });

  const { mutate, isSuccess: isMutationSuccess } = useCreateCustomerMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  // Update and Delete Mutation
  const updateMutation = useUpdateCustomerMutation();
  const deleteMutation = useDeleteCustomerMutation();

  const handleDeleteCustomer = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditingCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleUpdateCustomer = (customer: CustomerCreate) => {
    if (editingCustomer) {
      updateMutation.mutate({
        id: editingCustomer.id,
        body: customer,
      });
    }
  };

  useEffect(() => {
    setIsFormOpen(false);
  }, [isMutationSuccess]);

  const handleSaveCustomer = (customer: CustomerCreate) => {
    mutate({
      body: customer,
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Heading and Add BUtton */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">
              Manage your customer database
            </p>
          </div>
          <Button className="cursor-pointer" onClick={handleAddCustomer}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
        {/* Table Section */}
        <CustomerTable
          handleEdit={handleEditingCustomer}
          handleDelete={handleDeleteCustomer}
          customers={customerData}
        />
      </div>
      {editingCustomer ? (
        <SheetFormContainer
          defaultValues={editingCustomer}
          onOpenChange={setIsFormOpen}
          onSave={handleUpdateCustomer}
          FormComponent={CustomerForm}
          title={`Edit Customer ${editingCustomer.name}`}
          subtitle="editing the details and save."
          open={isFormOpen}
        />
      ) : (
        <SheetFormContainer
          onOpenChange={setIsFormOpen}
          onSave={handleSaveCustomer}
          FormComponent={CustomerForm}
          title={"Add New Customer"}
          subtitle="Fill in the details to add new customer."
          open={isFormOpen}
        />
      )}
    </>
  );
}
