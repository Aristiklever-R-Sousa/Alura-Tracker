<template>
  <button :name="name" class="button" @click="callFunc" :disabled="isDisabled">
    <span v-if="icon" class="icon">
      <i :class="icon"></i>
    </span>
    <span v-if="name">{{ name }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComp",
  props: {
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["onClick"],
  methods: {
    callFunc() {
      this.$emit("onClick");
    },
  },
});
</script>
