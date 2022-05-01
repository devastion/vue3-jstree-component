<script>
export default {
  name: "TreeRow",
  props: {
    treedata: Object,
    depth: Number,
  },

  data() {
    return {
      isActive: false,
      isChecked: false,
      isUndetermined: false,
      singleIsSelected: false,
    };
  },
  computed: {
    isParent() {
      const { children } = this.treedata;
      if (children) return children && children.length > 0;
      return false;
    },
    allChildrenSelected() {
      if (!this.isParent) return false;
      let allAreSelected = [];

      for (const folder in this.$refs.child) {
        allAreSelected.push(this.$refs.child[folder].isChecked);
        if (this.$refs.child[folder].isChecked) this.setSingleIsSelected(true);
      }
      return allAreSelected.every((el) => el);
    },
  },
  methods: {
    toggle() {
      if (this.isParent) {
        this.isActive = !this.isActive;
      }
    },
    setSingleIsSelected(val) {
      this.singleIsSelected = val;
    },
  },

  watch: {
    isChecked() {
      if (!this.$parent.isUndetermined && !this.$parent.isChecked)
        this.$parent.isUndetermined = this.isChecked;

      if (this.$parent.allChildrenSelected) {
        this.$parent.isChecked = this.isChecked;
        this.$parent.isUndetermined = !this.isChecked;
      }
    },
    isUndetermined() {
      if (this.isUndetermined) {
        this.$parent.isUndetermined = this.isUndetermined;
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
          ref="child"
          :depth="depth + 1"
          v-for="treedata in treedata.children"
          :treedata="treedata"
          :key="treedata.id"></tree-row>
      </ul>
    </div>
  </li>
</template>
