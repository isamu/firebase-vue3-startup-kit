import * as functions from "firebase-functions";
import * as hono from "../../functions/server/hono";

export default functions
  .region("asia-northeast1")
  .runWith({
    maxInstances: 5,
    timeoutSeconds: 10,
    memory: "1GB" as "1GB",
  })
  .https.onRequest(hono.server);
