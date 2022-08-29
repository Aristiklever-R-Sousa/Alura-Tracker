<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>

      <div class="column">
        <TimerComp @on-timer-is-finish="taskFinish" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TimerComp from "./TimerComp.vue";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "FormComp",
  data() {
    return {
      description: "",
    };
  },
  emits: ["onSaveTask"],
  methods: {
    taskFinish(timeInSeconds: number) {
      const payload: ITask = {
        description: this.description,
        timeInSeconds,
      };
      this.$emit("onSaveTask", payload);
      this.description = "";
    },
  },
  components: {
    TimerComp,
  },
});
</script>
