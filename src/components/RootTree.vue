<script>
import TreeRow from "./TreeRow.vue";
import jsonData from "@/stateless.json";

export default {
  name: "RootTree",
  components: {
    TreeRow,
  },
  data() {
    return {
      userData: jsonData,
    };
  },
};
</script>
<template>
  <ul>
    <tree-row
      v-for="data in userData"
      :key="data.id"
      :depth="0"
      :treedata="data"></tree-row>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}
</style>
