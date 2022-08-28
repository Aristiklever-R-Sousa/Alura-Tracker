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

export default defineComponent({
  name: "FormComp",
  data() {
    return {
      description: "",
    };
  },
  methods: {
    taskFinish(timeElapsed: number) {
      console.log(this.description, ` feita em ${timeElapsed}s`);
      this.description = "";
    },
  },
  components: {
    TimerComp,
  },
});
</script>
