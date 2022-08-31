<template>
  <Box>
    <div class="columns">
      <div class="column is-7">
        {{
          task.description ? task.description : "Nenhuma descrição informada."
        }}
      </div>
      <div class="column">
        {{ task.project ? task.project.name : "Nenhum projeto informado." }}
      </div>
      <div class="column">
        <Chronometer :time-in-seconds="task.timeInSeconds" />
      </div>
      <div class="column">
        <Button
          :name="'delete'"
          :class="'ml-2 is-danger'"
          :icon="{ name: 'fas fa-trash', class: 'is-small' }"
          @click="removeTask(task.id)"
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
import { DELETE_TASK } from "@/store/type-mutations";

export default defineComponent({
  name: "TaskComp",
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  methods: {
    removeTask(taskId: string) {
      this.store.commit(DELETE_TASK, taskId);
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  components: {
    Chronometer,
    Box,
    Button,
  },
});
</script>
