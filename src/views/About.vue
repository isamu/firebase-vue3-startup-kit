<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
  name: "AboutPage",
  setup() {
    useHead({
      title: 'About page'
    });
    return {};
  },
});
</script>
