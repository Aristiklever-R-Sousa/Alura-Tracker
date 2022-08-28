<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <section>
      <strong> {{ elapsedTime }} </strong>
    </section>
    <button class="button" @click="start">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="stop">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      timeInSeconds: 0,
      stopwatch: 0,
    };
  },
  computed: {
    elapsedTime(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().slice(11, 19);
    },
  },
  methods: {
    start() {
      this.stopwatch = setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
    },
    stop() {
      clearInterval(this.stopwatch);
      this.timeInSeconds = 0;
    },
  },
});
</script>
