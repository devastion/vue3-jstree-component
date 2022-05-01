import { createApp } from "vue";
import Vue from "vue";
// import RootTree from "./components/RootTree.vue";
import RootTree from "vue3-jstree-component";
import App from "./App.vue";
const app = createApp(App, {
  customData: "./stateless.json",
});

// app.mount("#app");
createApp(App).mount("#app");
