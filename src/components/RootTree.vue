<script>
import TreeRow from "./TreeRow.vue";

export default {
  name: "RootTree",
  components: {
    TreeRow,
  },
  props: {
    userData: Object,
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
