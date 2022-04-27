<template>
  <div class="layout">
    <template v-if="user.user"> {{ user.user.displayName }}!! </template>
    <router-view />
    <Languages />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { db, auth } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

import Languages from "@/components/Languages.vue";

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: "AppLayout",
  components: {
    Languages,
  },
  async setup() {
    const route = useRoute();
    const i18n = useI18n();

    const lang = computed(() => {
      return (route.params.lang as string) || "en";
    });
    watch(lang, () => {
      i18n.locale.value = lang.value;
    });
    i18n.locale.value = lang.value;

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

    return {
      user,
    };
  },
});
</script>
