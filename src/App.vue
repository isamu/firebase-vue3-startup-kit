<template>
  <div id="nav">
    <template v-if="isSiginedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </template>
    <template v-else>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/account">Signin</router-link>
    </template>
  </div>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isSiginedIn = computed(() => store.getters.isSiginedIn);

    return {
      user,
      isSiginedIn
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
