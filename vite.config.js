import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true,
      overlay: false,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"',
      },
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
