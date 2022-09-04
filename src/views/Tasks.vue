<template>
  <Form @on-save-task="addTask" />
  <div class="list">
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @on-triggered-task="taskSelect(task)"
    />
    <Box v-if="listIsEmpty"> Você não está muito produtivo hoje :( </Box>
  </div>
  <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa!</p>
        <button @click="modalClose" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="description" class="label"> Descrição </label>
          <input
            type="text"
            class="input"
            v-model="selectedTask.description"
            id="description"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="editTask" class="button is-success">Salvar</button>
        <button @click="modalClose" class="button">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import Form from "@/components/FormComp.vue";
import Task from "@/components/TaskComp.vue";
import Box from "@/components/BoxComp.vue";

import { useStore } from "@/store";
import useNotify from "@/hooks/notifier";

import ITask from "@/interfaces/ITask";
import { NotificationType } from "@/interfaces/INotication";
import {
  GET_PROJECTS,
  GET_TASKS,
  POST_TASK,
  PUT_TASK,
} from "@/store/actions-types";

export default defineComponent({
  name: "TasksView",
  data() {
    return {
      isDarkTheme: false,
      selectedTask: null as ITask | null,
    };
  },
  computed: {
    listIsEmpty(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    taskSelect(task: ITask) {
      this.selectedTask = task;
    },
    modalClose() {
      this.selectedTask = null;
    },
    addTask(task: ITask) {
      const project = this.store.state.project.projects.find(
        (p) => p.id == task.project.id
      );
      if (!project) {
        this.notify(
          "Ops!",
          "Selecione um projeto antes de finalizar a tarefa!",
          NotificationType.FAIL
        );
        return;
      }
      this.store.dispatch(POST_TASK, task);
    },
    editTask() {
      this.store
        .dispatch(PUT_TASK, this.selectedTask)
        .then(() => this.modalClose());
    },
    toggleTheme(isDarkTheme: boolean) {
      this.isDarkTheme = isDarkTheme;
    },
  },
  setup() {
    const store = useStore();
    const { notify } = useNotify();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    return {
      tasks: computed(() => store.state.task.tasks),
      store,
      notify,
    };
  },
  components: {
    Form,
    Task,
    Box,
  },
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
