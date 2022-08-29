<template>
  <Box>
    <div class="columns">
      <div class="column is-7">
        {{
          task.description ? task.description : "Nenhuma descrição informada."
        }}
      </div>
      <div class="column">
        <Chronometer :time-in-seconds="task.timeInSeconds" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Box from "./BoxComp.vue";
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
    Box,
  },
});
</script>
