import { onRequest } from "firebase-functions/v2/https";
import * as express from "../../functions/server/express";

export default onRequest(
  {
    region: "asia-northeast1",
    maxInstances: 5,
    timeoutSeconds: 10,
    memory: "1GiB",
  },
  express.app,
);
