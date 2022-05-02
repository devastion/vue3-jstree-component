import vue from "rollup-plugin-vue";

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: "src/install.js",
    output: {
      format: "esm",
      file: "dist/vue3-jstree-component.esm.js",
    },
    plugins: [vue()],
  },
  // SSR build.
  {
    input: "src/install.js",
    output: {
      format: "cjs",
      file: "dist/vue3-jstree-component.ssr.js",
    },
    plugins: [vue({ template: { optimizeSSR: true } })],
  },
  // Browser build.
  {
    input: "src/wrapper.js",
    output: {
      format: "iife",
      file: "dist/vue3-jstree-component.js",
    },
    plugins: [vue()],
  },
];
