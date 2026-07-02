import { onRequest } from "firebase-functions/v2/https";
import * as hono from "../../functions/server/hono";

export default onRequest(
  {
    region: "asia-northeast1",
    maxInstances: 5,
    timeoutSeconds: 10,
    memory: "1GiB",
  },
  hono.server,
);
