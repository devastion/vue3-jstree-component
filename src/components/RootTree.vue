<script>
import TreeRow from "./TreeRow.vue";
const treeData = {
  name: "Root Folder",
  children: [
    { name: "Folder #1" },
    { name: "Folder #2" },
    {
      name: "Folder #3",
      children: [
        {
          name: "Subfolder #1",
          children: [{ name: "Subfolder #1" }, { name: "Subfolder #2" }],
        },
        { name: "hello" },
        { name: "wat" },
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }],
        },
      ],
    },
  ],
};
export default {
  name: "RootTree",
  components: {
    TreeRow,
  },
  data() {
    return {
      userData: treeData,
    };
  },
};
</script>
<template>
  <ul>
    <TreeRow :treedata="userData"></TreeRow>
  </ul>
</template>

<style scoped>
ul {
  background: none;
}
</style>
