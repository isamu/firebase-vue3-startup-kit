import * as functions from "firebase-functions";

export const test = async (data: unknown, context: functions.https.CallableContext) => {
  const uid = context?.auth?.uid;
  console.log(uid, data);
  return {};
};
