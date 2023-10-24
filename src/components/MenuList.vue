<template>
  <div class="flex flex-col space-y-1 bg-white p-4">
    <MenuItem
      @click="handleClose"
      link="/account"
      icon="camera_alt"
      title="menu.signin"
      v-if="!store.state.user"
    />
    <MenuItem @click="handleClose" link="/" icon="man" title="menu.top" />

    <MenuItem
      @click="handleClose"
      link="/mypage"
      icon="camera_alt"
      title="menu.mypage"
      v-if="store.state.user"
    />

    <MenuItem
      @click="logout"
      icon="add_circle_outline"
      title="menu.signout"
      v-if="store.state.user"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";

import MenuItem from "@/components/MenuItem.vue";

export default defineComponent({
  emits: ["close-menu"],
  components: {
    MenuItem,
  },
  setup(_, ctx) {
    const store = useStore();

    const handleClose = () => {
      ctx.emit("close-menu");
    };
    const logout = () => {
      signOut(auth);
      ctx.emit("close-menu");
    };
    return {
      handleClose,
      logout,
      store,
    };
  },
});
</script>
