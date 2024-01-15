import * as functions from "firebase-functions";
import * as express from "../../functions/server/express";

export default functions
  .region("asia-northeast1")
  .runWith({
    maxInstances: 5,
    timeoutSeconds: 10,
    memory: "1GB" as "1GB",
  })
  .https.onRequest(express.app);
