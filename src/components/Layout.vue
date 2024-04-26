<template>
  <div class="layout">
    <div class="bg-warmgray-400 flex min-h-screen flex-col bg-opacity-20">
      <div class="w-full flex-1">
        <div class="bg-blue-300">
          <div class="relative flex items-center">
            <div @click="toggleMenu()" class="inline-flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center">
              <span class="material-symbols-outlined text-warmgray-900 text-opacity-60">menu</span>
            </div>
            <div class="w-full items-center">Firebase Vue3 kit</div>
            <div v-show="menu" class="fixed top-0 left-0 z-30 flex h-screen w-screen">
              <div class="bg-warmgray-100 flex w-64 flex-col bg-white shadow">
                <MenuList @close-menu="toggleMenu()" />
              </div>
              <div @click="toggleMenu()" class="flex-1 cursor-pointer bg-black bg-opacity-40"></div>
            </div>
          </div>
        </div>
        <div class="top-0 w-full sm:relative">
          <router-view />
        </div>
      </div>
    </div>
    <Languages class="mt-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";

import { auth } from "@/utils/firebase";
import { User } from "firebase/auth";

import { useI18nParam } from "@/i18n/utils";
import { useStore } from "@/store/index";

import Languages from "@/components/Languages.vue";
import MenuList from "@/components/MenuList.vue";
interface UserData {
  user: User | null;
}

export default defineComponent({
  name: "AppLayout",
  components: {
    Languages,
    MenuList,
  },
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });

    const menu = ref(false);

    useI18nParam();

    onMounted(() => {
      auth.onAuthStateChanged((fbuser) => {
        if (fbuser) {
          console.log("authStateChanged:");
          user.user = fbuser;
          store.setUser(fbuser);
        } else {
          store.setUser(null);
        }
      });
    });

    const toggleMenu = () => {
      menu.value = !menu.value;
    };
    return {
      user,

      menu,
      toggleMenu,
    };
  },
});
</script>
