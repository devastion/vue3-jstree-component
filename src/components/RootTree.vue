<script>
import TreeRow from "./TreeRow.vue";
import jsonData from "../stateless.json";

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
  <div>
    <ul>
      <TreeRow
        v-for="data in userData"
        :key="data.id"
        :depth="0"
        :treedata="data"></TreeRow>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
div {
  position: absolute;
}
ul {
  margin: 0;
  padding: 0;
}
</style>
