import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User } from "firebase/auth";

export const useStore = defineStore("store", () => {
  const user = ref<User | null | undefined>(undefined);
  const setUser = (_user: User | null) => {
    user.value = _user;
  };
  const isSignedIn = computed(() => user.value !== null && user.value !== undefined);
  return {
    user,
    setUser,
    isSignedIn,
  };
});
