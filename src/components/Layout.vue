<template>
  <div class="layout">
    <template v-if="user.user">
      {{ message.message }}! {{ user.user.displayName }}!!
    </template>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";

import { db, auth } from "../utils/firebase";
import firebase from "firebase/app";

interface User {
  user: firebase.User | null;
}

export default defineComponent({
  name: "Layout",
  async setup() {
    const store = useStore();
    const user = reactive<User>({ user: null });

    onMounted(() => {
      auth.onAuthStateChanged((fbuser) => {
        if (fbuser) {
          console.log("authStateChanged:");
          user.user = fbuser;
          store.commit("setUser", user);
        }
      });
    });

    const messageDoc = await db.doc("/test/message").get();
    const message = messageDoc.data();

    return {
      message,
      user,
    };
  },
});
</script>
