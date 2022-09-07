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
import { computed, defineComponent, ref } from "vue";

import TimerComp from "./TimerComp.vue";
import ITask from "@/interfaces/ITask";
import { useStore } from "@/store";

export default defineComponent({
  name: "FormComp",
  emits: ["onSaveTask"],
  methods: {},
  setup(props, context) {
    const store = useStore();

    const projects = computed(() => store.state.project.projects);
    const description = ref("");
    const projectId = ref("");

    const taskFinish = (timeInSeconds: number): void => {
      const project = projects.value.find(
        (project) => project.id === projectId.value
      ) || { id: "", name: "" };

      const payload: ITask = {
        id: new Date().toISOString(),
        description: description.value,
        timeInSeconds,
        project,
      };

      context.emit("onSaveTask", payload);
      description.value = "";
    };

    return {
      projects,
      description,
      projectId,
      taskFinish,
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
