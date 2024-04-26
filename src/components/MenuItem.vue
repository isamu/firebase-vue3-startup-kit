<template>
  <div class="flex items-center rounded-lg bg-gray-200 px-4 py-2">
    <router-link :to="localizedUrl(link)" v-if="link">
      <div class="inline-flex items-center justify-center">
        <span class="material-symbols-outlined text-warmgray-600 mr-2 text-lg">{{ icon }}</span>
        <span class="text-warmgray-600 text-sm font-bold">{{ $t(title) }}</span>
      </div>
    </router-link>
    <div class="inline-flex items-center justify-center" v-else>
      <span class="material-symbols-outlined text-warmgray-600 mr-2 text-lg">{{ icon }}</span>
      <span class="text-warmgray-600 text-sm font-bold">{{ $t(title) }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    link: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
