import * as functions from "firebase-functions/v2";
import * as express from "../../functions/server/express";

export default functions.https.onRequest(
  {
    region: "asia-northeast1",
    // maxInstances: 5,
    timeoutSeconds: 10,
    // memory: "1GB" as "1GB",
  },
  express.app,
);
