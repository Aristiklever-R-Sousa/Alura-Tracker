<template>
  <Form @on-save-task="addTask" />
  <div class="list">
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    <Box v-if="listIsEmpty"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "@/store";
import Form from "@/components/FormComp.vue";
import Task from "@/components/TaskComp.vue";
import Box from "@/components/BoxComp.vue";

import ITask from "@/interfaces/ITask";
import { ADD_TASK } from "@/store/type-mutations";

export default defineComponent({
  name: "TasksView",
  data() {
    return {
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
      this.store.commit(ADD_TASK, task);
    },
    toggleTheme(isDarkTheme: boolean) {
      this.isDarkTheme = isDarkTheme;
    },
  },
  setup() {
    const store = useStore();
    return {
      tasks: computed(() => store.state.tasks),
      store,
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
