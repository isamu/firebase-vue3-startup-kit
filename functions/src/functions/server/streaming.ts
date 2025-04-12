import { CallableRequest, CallableResponse } from "firebase-functions/v2/https";

export const sleep = async (milliseconds: number) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export const streamingFunc = async (request: CallableRequest, response?: CallableResponse) => {
  for await (const num of ["1", "2", "3", "4", "5"]) {
    // res.write(num + "\n");
    response?.sendChunk({ num });
    await sleep(1000);
  }
  
  return {num: "12334"};
};
