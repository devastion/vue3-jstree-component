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
  <ul>
    <tree-row
      v-for="data in userData"
      :key="data.id"
      :depth="0"
      :treedata="data"></tree-row>
  </ul>
</template>

<style lang="scss">
:root {
  background-color: #2a2a2a;
  color: #9a9a9a;
}
input[type="checkbox"] {
  margin: 0;
  padding: 0;
}

.undetermined {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: none;
  background-color: #41b883;
  height: 13px;
  width: 13px;
}

.root {
  &__icon {
    content: url("@icons/root.png");
    vertical-align: -0.5rem;
    display: inline-block;
  }
}
.closed::before {
  content: url("@icons/closed.png");
  vertical-align: -0.5rem;
}

.open::before {
  content: url("@icons/open.png");
  vertical-align: -0.5rem;
}

.file {
  &__icon {
    content: url("@icons/file.png");
    vertical-align: -0.5rem;
    display: inline-block;
  }

  &::before {
    content: url("@icons/node-dots.png");
  }
}

ul {
  margin: 0;
  padding: 0;
  ul {
    padding-left: 2.25rem;
  }
  li {
    background-image: url("@icons/dots.png");
    background-repeat: repeat-y;
    list-style: none;
    font-size: 1rem;
    cursor: pointer;

    &:last-child {
      background: none;
    }
  }
}
</style>
