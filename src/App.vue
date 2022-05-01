<script setup>
import RootTree from "vue3-jstree-component";
import jsonData from "@/stateless.json";
</script>

<template>
  <RootTree :treedata="jsonData" />
</template>
