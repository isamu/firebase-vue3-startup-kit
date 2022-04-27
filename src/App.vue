<template>
  <div id="nav">
    <template v-if="isSignedIn">
      <router-link :to="localizedUrl('/')">Home</router-link> |
      <router-link :to="localizedUrl('/about')">About</router-link>
    </template>
    <template v-else>
      <router-link :to="localizedUrl('/')">Home</router-link> |
      <router-link :to="localizedUrl('/about')">About</router-link> |
      <router-link :to="localizedUrl('/account')">Signin</router-link>
    </template>
  </div>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isSignedIn = computed(() => store.getters.isSignedIn);

    return {
      user,
      isSignedIn,
    };
  },
});
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  @apply font-sans antialiased text-center text-gray-700;
}

#nav {
  /* padding: 30px; */
  @apply p-8;
}

#nav a {
  /* font-weight: bold;
  color: #2c3e50; */
  @apply font-bold text-gray-700;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  @apply text-green-600;
}

a {
  @apply cursor-pointer;
}
</style>
