import { computed, onUnmounted, watch } from "vue";
import { useStore } from "@/store/index";
import { useI18n } from "vue-i18n";
import router from "@/router";

export const useUser = () => {
  const store = useStore();
  return computed(() => store.user);
};
export const useIsSignedIn = () => {
  const store = useStore();
  return computed(() => store.isSignedIn);
};

export const useLang = () => {
  const i18n = useI18n();

  const lang = computed(() => {
    return i18n.locale.value;
  });

  const localizedUrl = (path: string) => {
    if (lang.value) {
      return `/${lang.value}` + path;
    }
    return path;
  };

  return {
    lang,
    localizedUrl,
  };
};

export const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const useLocalizedRoute = () => {
  const { localizedUrl } = useLang();

  return (path: string) => {
    router.push(localizedUrl(path));
  };
};

export const noLoginPage = (path: string) => {
  const store = useStore();
  const routePush = useLocalizedRoute();

  const unwatch = watch(
    () => store.user,
    (user) => {
      if (user) {
        routePush(path);
      }
    },
    { immediate: true },
  );
  onUnmounted(() => {
    unwatch();
  });
};

export const requireLogin = (path: string) => {
  const store = useStore();
  const routePush = useLocalizedRoute();

  const unwatch = watch(
    () => store.user,
    (user) => {
      if (user === null) {
        routePush(path);
      }
    },
    { immediate: true },
  );
  onUnmounted(() => {
    unwatch();
  });
};
