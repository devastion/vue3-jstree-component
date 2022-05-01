import { createApp } from "vue";
import RootTree from "./components/RootTree.vue";
import App from "./App.vue";
const app = createApp(App, {
  customData: "./stateless.json",
});

// app.mount("#app");
createApp(RootTree).mount("#app");
