<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': isDarkTheme }"
  >
    <div class="column is-one-quarter">
      <SideBar @on-change-theme="toggleTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Notifications />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideBar from "@/components/SideBar.vue";
import Notifications from "./components/Notifications.vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      isDarkTheme: false,
    };
  },
  methods: {
    toggleTheme(isDarkTheme: boolean) {
      this.isDarkTheme = isDarkTheme;
    },
  },
  components: {
    SideBar,
    Notifications,
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
