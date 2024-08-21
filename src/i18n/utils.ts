import { App, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

export const i18nUtils = (app: App) => {
  app.config.globalProperties.localizedUrl = (path: string) => {
    const { lang } = app.config.globalProperties.$route.params;
    if (lang) {
      return `/${lang}${path}`;
    }
    return path;
  };
};

export const useI18nParam = () => {
  const route = useRoute();
  const i18n = useI18n();
  const lang = computed(() => (route.params.lang as string) || "en");
  watch(lang, () => {
    i18n.locale.value = lang.value;
  });
  i18n.locale.value = lang.value;
};
