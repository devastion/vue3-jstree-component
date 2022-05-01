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
      childNodes: 0,
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
      this.setChilds(truthy);
      return truthy >= falsy;
    },
  },
  methods: {
    toggle() {
      if (this.isParent) {
        this.isActive = !this.isActive;
      }
    },
    setChilds(childs) {
      this.childNodes = childs;
    },
  },
  updated() {
    if (this.childNodes === 0) this.tristate = false;
  },
  watch: {
    selected() {
      this.$parent.tristate = !this.$parent.allChildrenSelected;

      this.$parent.selected = this.$parent.allChildrenSelected;
    },
    tristate() {
      if (this.$refs.input.value === "false") {
        if (!this.isParent) {
          this.tristate = false;
        }
      }
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
      <span :class="[isParent ? 'root root__icon' : '']" />
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
          :checked="this.selected"
          ref="child"
          :depth="depth + 1"
          v-for="treedata in treedata.children"
          :treedata="treedata"
          :key="treedata.id" />
      </ul>
    </div>
  </li>
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
  &::before {
    content: url("@icons/node-dots.png");
  }
}

ul {
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
