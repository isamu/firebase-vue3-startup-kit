import { createStore } from "vuex";
import { User } from "firebase/auth";

interface State {
  user: User | null | undefined;
}

export default createStore<State>({
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state: State, user: User | null) {
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
