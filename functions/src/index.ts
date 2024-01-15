// import * as functions from "firebase-functions";

import exportIfNeeded from "./common/exportifneeded";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exportIfNeeded("test", "tests/test", exports);

exportIfNeeded("hono_server", "server/hono", exports);
exportIfNeeded("express_server", "server/express", exports);
