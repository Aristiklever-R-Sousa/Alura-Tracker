<template>
  <header>
    <h1>
      <img src="../assets/alura-tracker-logo.png" alt="Alura Tracker" />
    </h1>
    <button class="button" @click="changeTheme">{{ buttonText }}</button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeTheme"],
  data() {
    return {
      isDarkTheme: false,
    };
  },
  computed: {
    buttonText() {
      if (this.isDarkTheme) {
        return "Desativar modo escuro";
      }
      return "Ativar modo escuro";
    },
  },
  methods: {
    changeTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$emit("onChangeTheme", this.isDarkTheme);
    },
  },
});
</script>

<style>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;

  text-align: center;
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
