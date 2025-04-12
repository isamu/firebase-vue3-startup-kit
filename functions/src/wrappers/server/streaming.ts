import { onCall } from "firebase-functions/v2/https";

import { streamingFunc } from "../../functions/server/streaming";

export default onCall(
  {
    region: "asia-northeast1",
    timeoutSeconds: 10,
  },
  async (request, response) => {
    return await streamingFunc(request, response);
});
