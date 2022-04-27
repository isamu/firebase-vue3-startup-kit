import { App } from "vue";
const utils = (app: App) => {
  app.config.globalProperties.localizedUrl = (path: string) => {
    const lang = app.config.globalProperties.$route.params.lang;
    if (lang) {
      return `/${lang}` + path;
    }
    return path;
  };
};
export default utils;
