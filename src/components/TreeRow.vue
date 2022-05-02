<script>
export default {
  name: "TreeRow",
  props: {
    treedata: Object,
    depth: Number,
    selectchildren: Boolean,
  },

  data() {
    return {
      isActive: false,
      isChecked: false,
      isUndetermined: false,
    };
  },
  computed: {
    isParent() {
      const { children } = this.treedata;
      if (children) return children && children.length > 0;
      return false;
    },

    // TODO REFACTOR: Merge allChildrenSelected and singleChildSelected
    // ! "|| false" in case it's not parent and I need value instead undefined
    allChildrenSelected() {
      if (!this.isParent) return false;
      let allAreSelected = [];

      for (const folder in this.$refs.child) {
        allAreSelected.push(this.$refs.child[folder].isChecked);
      }
      return allAreSelected.every((el) => el) || false;
    },

    singleChildSelected() {
      if (!this.isParent) return false;
      let singleChild;

      for (const folder in this.$refs.child) {
        if (this.$refs.child[folder].isChecked)
          singleChild = this.$refs.child[folder].isChecked;
      }
      return singleChild || false;
    },
  },

  methods: {
    toggle() {
      if (this.isParent) {
        this.isActive = !this.isActive;
      }
    },
  },

  created() {
    this.toggle();
  },

  watch: {
    isChecked() {
      // * Add mid state to parents
      if (
        this.$parent.singleChildSelected &&
        !this.$parent.allChildrenSelected
      ) {
        this.$parent.isUndetermined = this.$parent.singleChildSelected;
      }

      // ! Access only oh the same depth or lower
      if (
        !this.$parent.singleChildSelected &&
        this.depth < this.$parent.depth
      ) {
        this.$parent.isUndetermined = this.$parent.singleChildSelected;
        this.$parent.isChecked = this.$parent.allChildrenSelected;
      }

      if (!this.$parent.singleChildSelected) {
        this.$parent.isChecked = false;
        this.$parent.isUndetermined = this.$parent.singleChildSelected;
      }

      // * If all children selected change stage from mid state to enabled
      if (this.$parent.allChildrenSelected) {
        this.$parent.isChecked = this.$parent.allChildrenSelected;
        this.$parent.isUndetermined = !this.$parent.allChildrenSelected;
      }

      if (
        !this.$parent.isChecked &&
        this.$parent.singleChildSelected &&
        this.$parent.depth < this.depth
      ) {
        this.$parent.isUndetermined = true;
        this.$parent.isChecked = false;
      }
    },

    isUndetermined() {
      // ? State to parents
      if (this.isUndetermined && !this.$parent.singleChildSelected) {
        this.$parent.isUndetermined = this.isUndetermined;
      }

      // * Reverse
      if (
        !this.isUndetermined &&
        !this.isChecked &&
        !this.$parent.singleChildSelected &&
        this.depth > this.$parent.depth
      ) {
        this.$parent.isUndetermined = this.isUndetermined;
      }
    },
    // * SELECT / DESELECT CHILDS
    selectchildren() {
      if (this.selectchildren) this.isChecked = this.selectchildren;
      if (!this.selectchildren) {
        this.isChecked = this.$parent.isChecked;
      }
    },
  },
};
</script>

<template>
  <li>
    <span
      @click="toggle"
      :class="[isActive ? 'open' : 'closed', isParent ? 'root' : 'file']">
      <span :class="[isParent ? 'root root__icon' : 'file__icon']" />
      {{ this.depth + " . " + treedata.name }}

      <input
        :class="{ undetermined: isUndetermined }"
        v-model="isChecked"
        @click.stop
        type="checkbox" />
    </span>
    <div>
      <ul v-show="isActive" v-if="isParent" :class="{ child: isParent }">
        <tree-row
          :selectchildren="isChecked"
          ref="child"
          :depth="depth + 1"
          v-for="treedata in treedata.children"
          :treedata="treedata"
          :key="treedata.id" />
      </ul>
    </div>
  </li>
</template>

<style scoped lang="scss">
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
</style>
