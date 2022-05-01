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

    // TODO REFACTOR
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
      if (this.$parent.singleChildSelected)
        this.$parent.isUndetermined = this.$parent.singleChildSelected;

      if (!this.$parent.singleChildSelected) {
        this.$parent.isChecked = this.$parent.singleChildSelected;
        this.$parent.isUndetermined = this.$parent.singleChildSelected;
      }

      if (this.$parent.allChildrenSelected) {
        this.$parent.isChecked = this.isChecked;
        this.$parent.isUndetermined = !this.isChecked;
      }
    },
    isUndetermined() {
      if (this.isUndetermined && this.singleChildSelected) {
        this.$parent.isUndetermined = this.isUndetermined;
        if (this.depth === 0) this.isUndetermined = undefined;
      }
    },
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
          :key="treedata.id"></tree-row>
      </ul>
    </div>
  </li>
</template>
