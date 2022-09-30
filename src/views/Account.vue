<template>
  <div class="account">
    <a
      @click="googleSignin"
      class="inline-flex h-12 items-center justify-center rounded-lg bg-black bg-opacity-5 px-6 shadow-lg hover:bg-green-600 hover:text-white"
    >
      Signin with Google account
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { googleSignin } from "../utils/SocialLogin";

export default defineComponent({
  name: "AccountPage",
  setup() {
    return {
      googleSignin: googleSignin(
        () => {
          alert("OK");
        },
        (err) => {
          alert(err.message);
        }
      ),
    };
  },
});
</script>
