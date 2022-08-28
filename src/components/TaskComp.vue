<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">Descrição da Tarefa</div>
      <div class="column">
        <Chronometer :time-in-seconds="15" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chronometer from "./ChronometerComp.vue";

export default defineComponent({
  name: "TaskComp",
  components: {
    Chronometer,
  },
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>
