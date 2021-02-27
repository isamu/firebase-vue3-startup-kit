<template>
  <div class="layout">
    {{message}}
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {db} from "../utils/firebase";

export default defineComponent({
  name: 'Layout',
  async setup() {
    const messageDoc = await db.doc("/test/message").get()
    const message = messageDoc.data();
    return {
      message,
    };
  },
});
</script>
