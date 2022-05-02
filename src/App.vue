<script>
import RootTree from "vue3-jstree-component";
import jsonData from "@/data.json";
import stateless from "@/stateless.json";

export default {
  components: { RootTree },
  data() {
    jsonData;
  },
};
</script>
<template>
  <RootTree :treedata="jsonData"></RootTree>
</template>
