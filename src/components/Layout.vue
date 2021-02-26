<template>
  <div class="layout">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
  props: {
  }
});
</script>
