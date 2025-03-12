import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "~/lib/api/v1";

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://127.0.0.1:8000/",
});

export const $api = createClient(fetchClient);

