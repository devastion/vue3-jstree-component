<script>
import RootTree from "vue3-jstree-component";
import jsonData from "@/data.json";
import stateless from "@/stateless.json";
</script>

<template>
  <RootTree :treedata="jsonData"></RootTree>
</template>
