<script>
import TreeRow from "./TreeRow.vue";
const treeData = {
  name: "Root Folder",
  children: [
    { name: "File #1" },
    { name: "File #2" },
    {
      name: "Folder #1",
      children: [
        {
          name: "Subfolder #1",
          children: [{ name: "File #1" }, { name: "File #2" }],
        },
        { name: "File" },
        { name: "File" },
        {
          name: "Folder #2",
          children: [{ name: "File #1" }, { name: "File #2" }],
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
