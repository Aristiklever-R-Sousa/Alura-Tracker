<template>
  <section>
    <strong> {{ elapsedTime }} </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChronometerComp",
  props: {
    timeInSeconds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    elapsedTime(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().slice(11, 19);
    },
  },
});
</script>
