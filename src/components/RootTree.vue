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
    <TreeRow
      v-for="data in userData"
      :key="data.id"
      :depth="0"
      :treedata="data"></TreeRow>
  </ul>
</template>

<style lang="scss">
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
    content: url("@icons/root.svg");
    vertical-align: -0.5rem;
    display: inline-block;
  }
}
.closed::before {
  content: url("@icons/closed.svg");
  vertical-align: -0.5rem;
}

.open::before {
  content: url("@icons/open.svg");
  vertical-align: -0.5rem;
}

.file {
  &__icon {
    content: url("@icons/file.svg");
    vertical-align: -0.5rem;
    display: inline-block;
  }

  &::before {
    content: url("@icons/node-dots.svg");
  }
}

ul {
  margin: 0;
  padding: 0;
  ul {
    padding-left: 2.25rem;
  }
  li {
    background-image: url("@icons/dots.svg");
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
