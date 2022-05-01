<script>
export default {
  name: "TreeRow",
  props: {
    treedata: Object,
    depth: Number,
    checked: Boolean,
  },
  data() {
    return {
      isActive: false,
      tristate: false,
      selected: false,
    };
  },
  computed: {
    isParent() {
      return this.treedata.children && this.treedata.children.length;
    },
    allChildrenSelected() {
      let truthy = 0;
      let falsy = 0;

      if (this.isParent) {
        for (const folder in this.$refs.child) {
          if (this.$refs.child[folder].selected) {
            truthy++;
          }
          falsy++;
        }
      }

      return truthy >= falsy;
    },
  },
  methods: {
    toggle() {
      if (this.isParent) {
        this.isActive = !this.isActive;
      }
    },
  },

  watch: {
    selected() {
      this.$parent.tristate = !this.$parent.allChildrenSelected;

      // If all children are selected => select the parent
      this.$parent.selected = this.$parent.allChildrenSelected;
    },
    tristate() {
      this.$parent.tristate = !this.$parent.allChildrenSelected;
    },
    checked() {
      if (this.checked) this.selected = this.checked;
      if (!this.checked) {
        this.selected = this.$parent.selected;
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
      {{ treedata.name }}

      <input
        :class="[tristate ? 'undetermined' : '']"
        v-model="selected"
        :value="checked"
        ref="input"
        @click.stop
        type="checkbox" />
    </span>
    <div>
      <ul v-show="isActive" v-if="isParent" :class="{ child: isParent }">
        <tree-row
          :checked="selected"
          ref="child"
          :depth="depth + 1"
          v-for="treedata in treedata.children"
          :treedata="treedata"
          :key="treedata.id" />
      </ul>
    </div>
  </li>
</template>
