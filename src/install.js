/* eslint-disable no-unused-vars */
import RootTree from "@/components/RootTree.vue";
export default {
  install(Vue, options) {
    Vue.component("root-tree", RootTree);
  },
};
export { default as RootTree } from "@/components/RootTree.vue";
// export default RootTree;
