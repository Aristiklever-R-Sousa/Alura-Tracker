<template>
  <header>
    <h1>
      <img src="../assets/alura-tracker-logo.png" alt="Alura Tracker" />
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
});
</script>

<style>
/* Todo o estilo aqui */
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}

img {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
