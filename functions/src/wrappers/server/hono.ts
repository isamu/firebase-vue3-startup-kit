import * as functions from "firebase-functions/v1";
import * as hono from "../../functions/server/hono";

export default functions
  .region("asia-northeast1")
  .runWith({
    maxInstances: 5,
    timeoutSeconds: 10,
    memory: "1GB" as const,
  })
  .https.onRequest(hono.server);
