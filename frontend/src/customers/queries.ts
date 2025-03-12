import { $api } from "~/queries/customers";

export const getCustomers = $api.queryOptions("get", "/customers/", {
  params: { query: { skip: 0, limit: 100 } },
});
