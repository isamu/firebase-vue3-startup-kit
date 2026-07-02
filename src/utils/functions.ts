import { functions } from "@/utils/firebase";
import { httpsCallable } from "firebase/functions";

export const streamingFcuntion = httpsCallable(functions, "streamingCall");
