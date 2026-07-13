<template>
  <div>
    <select @change="updateValue">
      <option v-for="(option, index) in languages" :key="index" :value="option" :selected="option == selectedValue ? true : false">
        {{ $t("languages." + option) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { languages } from "@/i18n/index";

const buildLangPath = (route: ReturnType<typeof useRoute>, langValue: string) => {
  const { lang } = route.params;
  if (typeof lang === "string") {
    return `/${langValue}${route.path.slice(lang.length + 1)}`;
  }
  return `/${langValue}${route.path}`;
};

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const i18n = useI18n();
    const selectedValue = ref(i18n.locale.value);
    const updateValue = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const newPath = buildLangPath(route, target.value);
      if (newPath !== route.path) {
        void router.push(newPath);
      }
    };
    return {
      languages,
      selectedValue,
      updateValue,
    };
  },
});
</script>
