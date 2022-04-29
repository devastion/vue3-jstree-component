<script>
export default {
  name: "TreeRow",
  props: {
    treedata: Object,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    isParent() {
      return this.treedata.children && this.treedata.children.length;
    },
  },
  methods: {
    toggle() {
      if (this.isParent) {
        this.isActive = !this.isActive;
      }
    },
  },
};
</script>

<template>
  <li>
    <div
      @click="toggle"
      :class="[isActive ? 'open' : 'closed', isParent ? 'root' : 'file']">
      {{ treedata.name }}
    </div>
    <ul v-show="isActive" v-if="isParent">
      <TreeRow
        v-for="treedata in treedata.children"
        :treedata="treedata"
        :key="treedata.id"></TreeRow>
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.root {
  background-image: url("@icons/dots.png");
  background-repeat: repeat-y;
  display: inline-block;
  cursor: pointer;

  &__icon {
    content: url("@icons/root.png");
  }
}

.closed::before {
  content: url("@icons/closed.png");
  vertical-align: -10px;
  display: inline-block;
  height: 0px;
}

.closed {
  background: none;
}

.open::before {
  content: url("@icons/open.png");
  vertical-align: -10px;
  display: inline-block;
  height: 0px;
}

.file {
  display: inline-block;
  background-image: url("@icons/root-dots.png");
  background-repeat: repeat-y;
}

.file::before {
  content: url("@icons/node-dots.png");
  vertical-align: -10px;
  display: inline-block;
  height: 0px;
}
.child {
  background-image: url("@icons/dots.png");
  background-repeat: no-repeat, repeat;
}

ul {
  background-image: url("@icons/dots.png");
  background-repeat: repeat-y;
  margin: 0;
  padding: 0 0 0 15px;

  li {
    line-height: 2rem;
    list-style: none;
  }
}
</style>
