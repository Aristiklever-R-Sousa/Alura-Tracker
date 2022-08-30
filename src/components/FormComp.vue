<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-5"
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
      <div class="column is-3">
        <div class="select">
          <select name="" id="" v-model="projectId">
            <option value="">Selecione o projeto</option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TimerComp @on-timer-is-finish="taskFinish" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import TimerComp from "./TimerComp.vue";
import ITask from "@/interfaces/ITask";
import { useStore } from "@/store";

export default defineComponent({
  name: "FormComp",
  data() {
    return {
      description: "",
      projectId: "",
    };
  },
  emits: ["onSaveTask"],
  methods: {
    taskFinish(timeInSeconds: number) {
      const project = this.projects.find(
        (project) => project.id === this.projectId
      );

      // if (project === undefined)
      //   this.$emit("onSaveTask", { error: "Projeto não encontrado" });

      const payload: ITask = {
        description: this.description,
        timeInSeconds,
        project,
      };

      this.$emit("onSaveTask", payload);
      this.description = "";
    },
  },
  setup() {
    const store = useStore();
    return {
      projects: computed(() => store.state.projects),
    };
  },
  components: {
    TimerComp,
  },
});
</script>

<style>
.form {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
</style>
