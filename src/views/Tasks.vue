<template>
  <Form @on-save-task="addTask" />
  <div class="list">
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    <Box v-if="listIsEmpty"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Form from "@/components/FormComp.vue";
import Task from "@/components/TaskComp.vue";
import Box from "@/components/BoxComp.vue";

import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "TasksView",
  data() {
    return {
      tasks: [] as ITask[],
      isDarkTheme: false,
    };
  },
  computed: {
    listIsEmpty(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    addTask(task: ITask) {
      this.tasks.push(task);
    },
    toggleTheme(isDarkTheme: boolean) {
      this.isDarkTheme = isDarkTheme;
    },
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
