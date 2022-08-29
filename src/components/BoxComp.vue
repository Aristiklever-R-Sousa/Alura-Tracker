<template>
  <div class="box has-text-weight-bold" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxComp",
  data() {
    return {
      styles: {
        backgroundColor: "#FaF0CA",
      },
    };
  },
});
</script>
