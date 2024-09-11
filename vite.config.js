import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import checker from "vite-plugin-checker";

export default defineConfig({
  define: {
    global: {},
  },
  plugins: [
    vue(),
    checker({
      typescript: true,
      overlay: false,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"',
      },
      vueTsc: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
  },
});
