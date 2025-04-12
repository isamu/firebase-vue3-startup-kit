<template>
  <div>user</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { requireLogin } from "@/utils/utils";
import { streamingFcuntion } from "@/utils/functions";

export default defineComponent({
  setup() {
    requireLogin("/account");

    (async () => {
      const { stream, data } = await streamingFcuntion.stream();
      for await (const chunk of stream) {
        console.log(chunk);
      }
      const allData = await data;
      console.log(allData);
    })()
    
    return {};
  },
});
</script>
