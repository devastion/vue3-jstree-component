<script>
import RootTree from "vue3-jstree-component";
import jsonData from "./stateless.json";
export default {
  components: { RootTree },
  name: "App",
  data() {
    jsonData;
  },
};
</script>

<template>
  <RootTree :treedata="jsonData"></RootTree>
</template>
