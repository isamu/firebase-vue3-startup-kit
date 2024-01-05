<template>
  <div class="flex flex-col space-y-1 bg-white p-4">
    <MenuItem @click="handleClose" link="/account" icon="camera_alt" title="menu.signin" v-if="!store.user" />
    <MenuItem @click="handleClose" link="/" icon="man" title="menu.top" />

    <MenuItem @click="handleClose" link="/mypage" icon="camera_alt" title="menu.mypage" v-if="store.user" />

    <MenuItem @click="logout" icon="add_circle_outline" title="menu.signout" v-if="store.user" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/index";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";

import MenuItem from "@/components/MenuItem.vue";

const emitClose = "close-menu";

export default defineComponent({
  emits: [emitClose],
  components: {
    MenuItem,
  },
  setup(_, ctx) {
    const store = useStore();

    const handleClose = () => {
      ctx.emit(emitClose);
    };
    const logout = () => {
      signOut(auth);
      ctx.emit(emitClose);
    };
    return {
      handleClose,
      logout,
      store,
    };
  },
});
</script>
