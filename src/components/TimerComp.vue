<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <ChronometerComp :time-in-seconds="timeInSeconds" />
    <Button
      name="play"
      value="play"
      :icon="{ name: 'fas fa-play', class: '' }"
      @click="start"
      :is-disabled="chronIsRunnning"
    />
    <Button
      name="stop"
      value="stop"
      :icon="{ name: 'fas fa-stop', class: '' }"
      @click="finish"
      :is-disabled="!chronIsRunnning"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChronometerComp from "./ChronometerComp.vue";
import Button from "./ButtonComp.vue";

export default defineComponent({
  name: "TimerComp",
  emits: ["onTimerIsFinish"],
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
    finish() {
      this.$emit("onTimerIsFinish", this.timeInSeconds);
      clearInterval(this.chron);
      this.timeInSeconds = 0;
      this.chronIsRunnning = false;
    },
  },
  components: { ChronometerComp, Button },
});
</script>
