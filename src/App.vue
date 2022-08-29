<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormComp @on-save-task="addTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideBar from "@/components/SideBar.vue";
import FormComp from "@/components/FormComp.vue";
import Task from "@/components/TaskComp.vue";

import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "App",
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  components: {
    SideBar,
    FormComp,
    Task,
  },
  methods: {
    addTask(task: ITask) {
      this.tasks.push(task);
      // console.log(this.tasks);
    },
  },
});
</script>

<style>
main {
  padding: 0 !important;
}
main > div {
  padding: 0 !important;
}
.list {
  padding: 1.25rem;
}
</style>
