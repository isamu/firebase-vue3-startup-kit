import { createStore } from "vuex";

export default createStore({
  state: {
    user: undefined
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    isSiginedIn: state => {
      return state.user !== null && state.user !== undefined;
    }
  },
  actions: {},
  modules: {}
});
