<template>
  <div class="flex flex-col space-y-1 bg-white p-4">
    <div
      class="flex items-center rounded-lg bg-gray-200 px-4 py-2"
      @click="handleClose"
      v-if="!store.state.user"
    >
      <router-link :to="localizedUrl('/account')">
        <div class="inline-flex items-center justify-center">
          <span class="material-icons text-warmgray-600 mr-2 text-lg"
            >camera_alt</span
          >
          <span class="text-warmgray-600 text-sm font-bold">ログイン</span>
        </div>
      </router-link>
    </div>

    <div
      class="flex items-center rounded-lg bg-gray-200 px-4 py-2"
      @click="handleClose"
      v-if="store.state.user"
    >
      <router-link :to="localizedUrl('/mypage')">
        <div class="inline-flex items-center justify-center">
          <span class="material-icons text-warmgray-600 mr-2 text-lg"
            >camera_alt</span
          >
          <span class="text-warmgray-600 text-sm font-bold">マイページ</span>
        </div>
      </router-link>
    </div>

    <div
      class="flex items-center rounded-lg bg-gray-200 px-4 py-2"
      @click="handleClose"
    >
      <router-link :to="localizedUrl('/')">
        <div class="inline-flex items-center justify-center">
          <span class="material-icons text-warmgray-600 mr-2 text-lg">man</span>
          <span class="text-warmgray-600 text-sm font-bold">メニュー</span>
        </div>
      </router-link>
    </div>

    <div
      class="flex items-center rounded-lg bg-gray-200 px-4 py-2"
      @click="logout"
    >
      <div class="inline-flex items-center justify-center">
        <span class="material-icons text-warmgray-600 mr-2 text-lg"
          >add_circle_outline</span
        >
        <span class="text-warmgray-600 text-sm font-bold">ログアウト</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";

import { useLang } from "@/utils/utils";

export default defineComponent({
  emits: ["closeMenu"],
  setup(_, ctx) {
    const store = useStore();

    const handleClose = () => {
      ctx.emit("closeMenu");
    };
    const logout = () => {
      signOut(auth);
      ctx.emit("closeMenu");
    };
    return {
      handleClose,
      logout, 
     store,
    };
  },
});
</script>
