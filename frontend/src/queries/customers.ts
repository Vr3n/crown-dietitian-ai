import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchCustomers = async () => {
  const response = await fetch("http://127.0.0.1:8000/customers/?skip=0&limit=100");
  if (!response.ok) {
    console.log(response)
    throw new Error("Failed to fetch customers.");
  }
  return response.json();
};

export const useCustomers = queryOptions({
  queryKey: ["customers"],
  queryFn: () => fetchCustomers(),
});
