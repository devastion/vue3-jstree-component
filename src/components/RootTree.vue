<script>
import TreeRow from "./TreeRow.vue";
import jsonData from "../data.json";

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
    <TreeRow
      v-for="data in userData"
      :key="data.id"
      :depth="0"
      :treedata="data"></TreeRow>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;

  li {
    ul {
      background: red;
    }
  }
}
</style>
