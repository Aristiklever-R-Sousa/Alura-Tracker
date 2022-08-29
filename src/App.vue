<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': isDarkTheme }"
  >
    <div class="column is-one-quarter">
      <SideBar @on-change-theme="toggleTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Form @on-save-task="addTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <Box v-if="listIsEmpty"> Você não está muito produtivo hoje :( </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideBar from "@/components/SideBar.vue";
import Form from "@/components/FormComp.vue";
import Task from "@/components/TaskComp.vue";
import Box from "./components/BoxComp.vue";

import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "App",
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
    SideBar,
    Form,
    Task,
    Box,
  },
});
</script>

<style>
main {
  --primary-bg: rgb(243, 237, 237);
  --primary-text: rgb(7, 6, 6);

  padding: 0 !important;
}
main.dark-mode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

main > div {
  padding: 0 !important;
}

.content {
  background-color: var(--primary-bg);
}

.list {
  padding: 1.25rem;
}
</style>
