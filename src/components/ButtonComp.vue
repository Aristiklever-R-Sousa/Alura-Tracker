<template>
  <button :name="name" class="button" @click="callFunc" :disabled="isDisabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ name }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComp",
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
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
