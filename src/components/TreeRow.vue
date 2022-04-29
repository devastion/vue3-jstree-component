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
    };
  },
  computed: {
    isParent() {
      return this.treedata.children && this.treedata.children.length;
    },
    isRoot(node) {
      if (!node.depth) {
        return "undetermined";
      }
      return node.depth;
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
    isChecked() {
      if (!this.$parent.isChecked && this.$parent.depth < this.depth) {
        console.log(
          `From isChecked:\n ${
            this.$refs.input.checked
          } - this.refs.input.checked :\n ${!this.$parent
            .isChecked} - !this.parent.checked :\n ${
            this.$parent.depth
          } - this.parent.depth : \n ${this.depth} - this.depth`
        );

        this.$refs.input.checked
          ? (this.$parent.tristate = true)
          : (this.$parent.tristate = false);
      }
    },
    tristate() {
      if (!this.$parent.isChecked && this.$parent.depth < this.depth) {
        console.log(
          `From tristate : \n${!this.$parent
            .isChecked} - parent !isChecked, - \n${
            this.$parent.depth
          } - parent depth \n: ${this.depth} : this.depth`
        );

        this.$parent.tristate = !this.$parent.tristate;
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
        :class="{ undetermined: tristate }"
        v-model="isChecked"
        ref="input"
        @click.stop
        type="checkbox" />
    </span>
    <ul v-show="isActive" v-if="isParent" :class="{ child: isParent }">
      <TreeRow
        :isChecked="this.isChecked"
        :depth="depth + 1"
        v-for="treedata in treedata.children"
        :treedata="treedata"
        :key="treedata.id"></TreeRow>
    </ul>
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
