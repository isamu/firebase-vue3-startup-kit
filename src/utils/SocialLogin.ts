import { auth } from "@/utils/firebase";
import { AuthError, AuthProvider, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type ErrorFunc = (error: AuthError) => void;

const authSignIn = async (provider: AuthProvider, callback?: () => void, errorCallback?: ErrorFunc) => {
  try {
    await signInWithPopup(auth, provider);
    if (callback) {
      callback();
    }
  } catch (error: unknown) {
    if (errorCallback) {
      errorCallback(error as AuthError);
    }
  }
};

export const googleSignin = (callback?: () => void, errorCallback?: ErrorFunc) => () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  authSignIn(provider, callback, errorCallback);
};

export const facebookSignin = (callback?: () => void, errorCallback?: ErrorFunc) => () => {
  const provider = new FacebookAuthProvider();
  provider.addScope("email,user_birthday");
  authSignIn(provider, callback, errorCallback);
};
