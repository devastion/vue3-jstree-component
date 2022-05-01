<script>
export default {
  name: "TreeRow",
  props: {
    treedata: Object,
    depth: Number,
    isChecked: Boolean,
  },
  data() {
    return {
      isActive: false,
      tristate: false,
      selected: this.isChecked || false,
    };
  },
  computed: {
    isParent() {
      return this.treedata.children && this.treedata.children.length;
    },
    getThisState() {
      return this.selected;
    },
  },
  methods: {
    toggle() {
      if (this.isParent) {
        this.isActive = !this.isActive;
      }
    },
  },
  updated() {},

  watch: {
    selected() {
      if (!this.$parent.selected === this.selected) {
        this.$parent.tristate = true;
      }
      if (this.$parent.tristate) {
        this.$parent.tristate = false;
        this.tristate = false;
      }
    },
    isChecked() {
      if (this.$parent.tristate) {
        this.selected = this.$parent.selected;
      } else {
        this.selected = false;
      }
      if (this.$parent.selected) {
        this.selected = this.$parent.selected;
      }
    },
    tristate() {
      if (!this.$parent.isChecked && this.depth > this.$parent.depth) {
        this.$parent.tristate = !this.$parent.tristate;
        this.tristate = true;
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
        :value="selected"
        ref="input"
        @click.stop
        type="checkbox" />
    </span>
    <div>
      <ul v-show="isActive" v-if="isParent" :class="{ child: isParent }">
        <tree-row
          :isChecked="selected"
          :depth="depth + 1"
          v-for="treedata in treedata.children"
          :treedata="treedata"
          :key="treedata.id" />
      </ul>
    </div>
  </li>
</template>

<style lang="scss" scoped>
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
