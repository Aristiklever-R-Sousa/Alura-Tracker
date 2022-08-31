<template>
  <button
    :name="name"
    :class="`button ${classButton}`"
    @click="callFunc"
    :disabled="isDisabled"
  >
    <span v-if="icon" :class="`icon ${icon.class}`">
      <i :class="`${icon.name}`"></i>
    </span>
    <span v-if="value">{{ value }}</span>
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
    value: {
      type: String,
    },
    classButton: {
      type: String,
    },
    icon: {
      type: Object,
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
