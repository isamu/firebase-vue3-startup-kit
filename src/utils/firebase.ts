import _firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

import { firebaseConfig } from "../config/project"

_firebase.initializeApp(firebaseConfig);

if (_firebase.apps && !_firebase.apps.length) {
  _firebase.initializeApp(firebaseConfig);
}

export const db = _firebase.firestore();
export const auth = _firebase.auth();
export const functions = _firebase.functions();
export const authObject = _firebase.auth;
export const firestore = _firebase.firestore;
export const firebase = _firebase


