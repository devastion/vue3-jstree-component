<script>
import RootTree from "@/components/RootTree.vue";
import jsonData from "@/data.json";
import otherData from "@/stateless.json";

export default {
  components: { RootTree },
  data: function () {
    return {
      userData: jsonData,
    };
  },
};
</script>
<template>
  <root-tree :userData="userData"></root-tree>
</template>
