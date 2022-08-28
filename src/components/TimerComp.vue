<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <ChronometerComp :time-in-seconds="timeInSeconds" />
    <button class="button" @click="start" :disabled="chronIsRunnning">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="stop" :disabled="!chronIsRunnning">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChronometerComp from "./ChronometerComp.vue";

export default defineComponent({
  name: "TimerComp",
  data() {
    return {
      timeInSeconds: 0,
      chron: 0,
      chronIsRunnning: false,
    };
  },
  methods: {
    start() {
      this.chron = setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
      this.chronIsRunnning = true;
    },
    stop() {
      clearInterval(this.chron);
      this.timeInSeconds = 0;
      this.chronIsRunnning = false;
    },
  },
  components: { ChronometerComp },
});
</script>
