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

import { db, auth } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: "AppLayout",
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });

    onMounted(() => {
      auth.onAuthStateChanged((fbuser) => {
        if (fbuser) {
          console.log("authStateChanged:");
          user.user = fbuser;
          store.commit("setUser", fbuser);
        } else {
          store.commit("setUser", null);
        }
      });
    });

    const messageDoc = await getDoc(doc(db, "/test/message"));
    const message = messageDoc.data();

    return {
      message,
      user,
    };
  },
});
</script>
