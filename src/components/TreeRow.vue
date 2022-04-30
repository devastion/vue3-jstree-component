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
      console.log(
        `---------------\n\nFROM ISCHECKED WATCH\n${
          this.treedata.name
        } - THIS NAME, - \n${this.$parent.treedata.name} - THIS PARENT, - \n ${
          this.$refs.input.checked
        } - THIS.INPUT.REFS.CHECKED :\n ${!this.$parent
          .isChecked} - !THIS.PARENT.CHECKED :\n ${
          this.$parent.depth
        } - THIS.PARENT.DEPTH : \n ${this.depth} - THIS.DEPTH\n${
          this.$parent.tristate
        } - THIS.PARENT.TRISTATE\n${
          this.tristate
        } - THIS.TRISTATE\n\n---------------`
      );

      if (!this.$parent.isChecked && this.$parent.depth < this.depth) {
        this.$parent.tristate = !this.$parent.tristate;
      }
    },
    tristate() {
      if (!this.$parent.isChecked && this.$parent.depth < this.depth) {
        console.log(
          `---------------\n\nFROM TRISTATE : \n${
            this.treedata.name
          } - THIS NAME, - \n${
            this.$parent.treedata.name
          } - PARENT NAME, - \n${!this.$parent
            .isChecked} - PARENT NOT !ISCHECKED, - \n${
            this.$parent.depth
          } - parent depth \n ${this.depth} : THIS.DEPTH\n${
            this.$parent.tristate
          } : THIS.PARENT.TRISTATE\n${
            this.tristate
          } : THIS.TRISTATE\n\n---------------`
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
        :class="[tristate ? 'undetermined' : '']"
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
