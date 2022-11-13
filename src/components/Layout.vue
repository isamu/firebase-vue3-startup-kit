<template>
  <div class="layout">
    <HeaderMenu />
    <router-view />
    <Languages class="mt-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";

import { auth } from "@/utils/firebase";
import { User } from "firebase/auth";

import { useI18nParam } from "@/i18n/utils";

import Languages from "@/components/Languages.vue";
import HeaderMenu from "@/components/HeaderMenu.vue";

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: "AppLayout",
  components: {
    Languages,
    HeaderMenu,
  },
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });
    useI18nParam();

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

    return {
      user,
    };
  },
});
</script>
