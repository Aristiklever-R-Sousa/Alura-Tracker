<template>
  <div class="notifications">
    <article
      v-for="notific in notifications"
      :key="notific.id"
      class="message"
      :class="`is-${notific.type}`"
    >
      <div class="message-header">{{ notific.title }}</div>
      <div class="message-body">{{ notific.text }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "NotificationsComp",
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 100;
}
</style>
