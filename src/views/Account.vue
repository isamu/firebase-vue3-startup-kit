<template>
  <div class="account mt-10">
    <a
      @click="googleSignin"
      class="inline-flex h-12 items-center justify-center rounded-lg bg-black bg-opacity-5 px-6 shadow-lg hover:bg-blue-600 hover:text-white"
    >
      Signin with Google account
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { googleSignin } from "@/utils/SocialLogin";
import { noLoginPage, useLocalizedRoute } from "@/utils/utils";

export default defineComponent({
  name: "AccountPage",
  setup() {
    noLoginPage("/mypage");
    const routePush = useLocalizedRoute();

    return {
      googleSignin: googleSignin(
        () => {
          routePush("/mypage");
        },
        (err) => {
          alert(err.message);
        },
      ),
    };
  },
});
</script>
