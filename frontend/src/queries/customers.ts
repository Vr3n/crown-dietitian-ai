import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "~/lib/api/v1";

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://127.0.0.1:8000/",
});

const $api = createClient(fetchClient);

export const getCustomers = $api.queryOptions("get", "/customers/", {
  params: { query: { skip: 0, limit: 100 } },
});
