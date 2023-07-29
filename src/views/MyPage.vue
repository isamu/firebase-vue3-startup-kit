<template>
  <div>user</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { requireLogin } from "@/utils/utils";

export default defineComponent({
  setup() {
    requireLogin("/account");

    return {};
  },
});
</script>
