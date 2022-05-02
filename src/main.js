import { createApp } from "vue";
import AppVue from "./App.vue";
// import Vue3JSTree from "vue3-jstree-component";

// import RootTree from "vue3-jstree-component";
const app = createApp(AppVue);
// app.component("Vue3JSTree", Vue3JSTree);
const mounted = app.mount("#app");
