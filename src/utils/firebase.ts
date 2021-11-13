import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "../config/project";

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const functions = getFunctions();
