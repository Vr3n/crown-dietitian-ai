import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { $api } from "~/queries/customers";
import { getCustomers } from "~/customers/queries";
import type { Customer, CustomerCreate } from "~/customers/types";
import ErrorComponent from "~/components/error-boundary";
import CustomerTable from "~/customers/customer-table/customer-table";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    // Defining customer query key.
    return queryClient.ensureQueryData(getCustomers);
  },
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const customerData = Route.useLoaderData() as Customer[];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const { mutate, isError, isSuccess, isPending } = $api.useMutation(
    "post",
    "/customers/",
    {
      onSuccess: (newCustomer) => {
        toast.success("Successfully added new customer");
        setIsFormOpen(false);
      },
      onError: (error) => {
        error.detail?.map((err) => toast.error(`${err.loc}: ${err.msg}`));
      },
    }
  );

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  const handleSaveCustomer = (customer: CustomerCreate) => {
    mutate({
      body: {
        name: customer.name,
        date_of_birth: customer.date_of_birth.toString(),
        gender: customer.gender,
        allergies: customer.allergies,
        preferences: customer.preferences,
        alternate_email: customer.alternate_email,
        alternate_mobile_number: customer.alternate_mobile_number,
        email: customer.email,
        mobile_number: customer.mobile_number,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Heading and Add BUtton */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Button className="cursor-pointer" onClick={handleAddCustomer}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      {/* Table Section */}
      <CustomerTable customers={customerData} />
    </div>
  );
}
