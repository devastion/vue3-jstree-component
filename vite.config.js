import { fileURLToPath, URL } from "url";
import path from "path";

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default {
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@icons": fileURLToPath(new URL("./src/icons", import.meta.url)),
    },
  },
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: path.resolve(__dirname, "src/install.js"),
      name: "vue3-jstree-component",
      fileName: (format) => `vue3-jstree-component.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      input: "./src/install.js",
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
};
