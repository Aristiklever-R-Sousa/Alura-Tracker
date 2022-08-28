<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormComp />
      <div class="list">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideBar from "@/components/SideBar.vue";
import FormComp from "@/components/FormComp.vue";
import Task from "@/components/TaskComp.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormComp,
    Task,
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
