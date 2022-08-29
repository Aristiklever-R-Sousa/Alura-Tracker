<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">{{ task.description }}</div>
      <div class="column">
        <Chronometer :time-in-seconds="task.timeInSeconds" />
        {{ typeof task.timeInSeconds }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Chronometer from "./ChronometerComp.vue";

import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "TaskComp",
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  components: {
    Chronometer,
  },
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>
