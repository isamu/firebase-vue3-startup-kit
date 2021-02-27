<template>
  <div class="home">
    <div @click="googleSignin">
      Googleアカウントでログイン
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { googleSignin } from "../utils/SocialLogin";

export default defineComponent({
  name: "Account",
  setup() {
    return {
      googleSignin: googleSignin(
        () => {
          alert("OK");
        },
        err => {
          alert(err.message);
        }
      )
    };
  }
});
</script>
