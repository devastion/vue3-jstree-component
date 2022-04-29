/* eslint-disable no-unused-vars */
import RootTree from "./components/RootTree.vue";

const Tree = {
  install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("root-tree", RootTree);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(Tree);
}

export default Tree;
