<template>
  <Box>
    <div
      class="columns is-flex is-align-items-center clicable"
      @click="triggeredTask"
    >
      <div class="column is-7">
        {{
          task.description ? task.description : "Nenhuma descrição informada."
        }}
      </div>
      <div class="column">
        {{ task.project.name }}
      </div>
      <div class="column">
        <Chronometer :time-in-seconds="task.timeInSeconds" />
      </div>
      <div class="column">
        <Button
          :name="'delete'"
          :class="'ml-2 is-danger'"
          :icon="{ name: 'fas fa-trash', class: 'is-small' }"
          @click="removeTask(task.id || '')"
        />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Box from "./BoxComp.vue";
import Button from "./ButtonComp.vue";
import Chronometer from "./ChronometerComp.vue";

import ITask from "@/interfaces/ITask";
import { useStore } from "@/store";
import { DELETE_TASK } from "@/store/actions-types";

export default defineComponent({
  name: "TaskComp",
  emits: ["onTriggeredTask"],
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore();

    const triggeredTask = (): void => {
      context.emit("onTriggeredTask");
    };
    const removeTask = (taskId: string) => {
      store.dispatch(DELETE_TASK, taskId);
    };

    return {
      triggeredTask,
      removeTask,
    };
  },
  components: {
    Chronometer,
    Box,
    Button,
  },
});
</script>

<style scoped>
.clicable {
  cursor: pointer;
}
</style>
