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
    <span
      @click="toggle"
      :class="[isActive ? 'open' : 'closed', isParent ? 'root' : 'file']">
      <span :class="[isParent ? 'root root__icon' : '']" />
      {{ treedata.name }}
      <input ref="checkbox" @click.stop type="checkbox" />
    </span>
    <ul v-show="isActive" v-if="isParent" :class="{ child: isParent }">
      <TreeRow
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
