import { createStore } from "vuex";
import firebase from "firebase/app";

interface State {
  user: firebase.User | null | undefined;
}

export default createStore<State>({
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state: State, user: firebase.User | null) {
      state.user = user;
    },
  },
  getters: {
    isSiginedIn: (state: State) => {
      return state.user !== null && state.user !== undefined;
    },
  },
  actions: {},
  modules: {},
});
