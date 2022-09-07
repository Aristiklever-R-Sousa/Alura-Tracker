<template>
  <Form @on-save-task="addTask" />
  <div class="field search">
    <p class="control has-icons-left">
      <input
        v-model="filter"
        class="input"
        type="text"
        placeholder="Busque uma tarefa..."
      />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
  </div>
  <div class="list">
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @on-triggered-task="taskSelect(task)"
    />
    <Box v-if="listIsEmpty.tasksIsEmpty">
      Você não está muito produtivo hoje :(
    </Box>
    <Box v-if="listIsEmpty.filterIsEmpty">
      Nenuhuma task com essa descrição encontrada :(
    </Box>
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
import { defineComponent, computed, ref } from "vue";

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
  setup() {
    const store = useStore();
    const { notify } = useNotify();

    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    const filter = ref("");
    const isDarkTheme = ref(false);
    const selectedTask = ref(null as ITask | null);
    const tasks = computed(() =>
      store.state.task.tasks.filter(
        (t) => !filter.value || t.description.includes(filter.value)
      )
    );

    const listIsEmpty = computed(() => {
      return {
        tasksIsEmpty: store.state.task.tasks.length === 0,
        filterIsEmpty: store.state.task.tasks.length && tasks.value.length == 0,
      };
    });

    const taskSelect = (task: ITask) => {
      selectedTask.value = task;
    };

    const modalClose = () => {
      selectedTask.value = null;
    };

    const addTask = (task: ITask) => {
      const project = store.state.project.projects.find(
        (p) => p.id == task.project.id
      );
      if (!project) {
        notify(
          "Ops!",
          "Selecione um projeto antes de finalizar a tarefa!",
          NotificationType.FAIL
        );
        return;
      }
      store.dispatch(POST_TASK, task);
    };

    const editTask = () => {
      store.dispatch(PUT_TASK, selectedTask.value).then(() => modalClose());
    };

    const toggleTheme = (isDarkThemeP: boolean) => {
      isDarkTheme.value = isDarkThemeP;
    };

    return {
      isDarkTheme,
      selectedTask,
      tasks,
      filter,

      listIsEmpty,
      taskSelect,
      modalClose,
      addTask,
      editTask,
      toggleTheme,
    };
  },
  components: {
    Form,
    Task,
    Box,
  },
});
</script>

<style scoped>
.list {
  padding: 1.25rem;
}

.search {
  margin: 0 25%;
}
</style>
