import firebase from "firebase/app";
import { authObject, auth } from '@/utils/firebase';

const authSignIn = async (provider: firebase.auth.AuthProvider, callback?: (() => void | null), errorCallback?: ((error: firebase.auth.Error) => void | null)) => {
  try {
    await auth.signInWithPopup(provider)
    if (callback) {
      callback()
    }
  } catch (error) {
    if (errorCallback) {
      errorCallback(error);
    }
  }
}

export const googleSignin = (callback?: (() => void | null), errorCallback?: ((error: firebase.auth.Error) => void | null)) => {
  return () => {
    const provider = new authObject.GoogleAuthProvider();
    provider.addScope('email');
    authSignIn(provider, callback, errorCallback);
  };
};

export const facebookSignin = (callback?: (() => void | null), errorCallback?: ((error: firebase.auth.Error) => void | null)) => {
  return () => {
    const provider = new authObject.FacebookAuthProvider();
    provider.addScope('email,user_birthday');
    authSignIn(provider, callback, errorCallback);
  };
}

