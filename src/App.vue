<script>
/* eslint-disable no-unused-vars */
// import RootTree from "@/components/RootTree.vue";
import jsonData from "@/data.json";
import otherData from "@/stateless.json";
// import RootTree from "./components/RootTree.vue";
import { RootTree } from "vue3-jstree-component";
import "../node_modules/vue3-jstree-component/dist/style.css";

export default {
  components: { RootTree },
  data: function () {
    return {
      userData: otherData,
    };
  },
};
</script>
<template>
  <RootTree :userData="userData"></RootTree>
</template>
