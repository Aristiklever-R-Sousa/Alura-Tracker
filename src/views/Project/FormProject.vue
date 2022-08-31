<template>
  <section>
    <form @submit.prevent="salve">
      <div class="field">
        <label for="projectName" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="projectName"
          id="projectName"
        />
      </div>
      <div class="field">
        <button type="submit" class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStore } from "@/store";
import { ADD_PROJECT, EDIT_PROJECT, NOTIFY } from "@/store/type-mutations";
import { NotificationType } from "@/interfaces/INotication";

export default defineComponent({
  name: "FormProject",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      projectName: "",
    };
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (project) => project.id === this.id
      );

      this.projectName = project?.name || "";
    }
  },
  methods: {
    salve() {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName,
        });
      } else {
        this.store.commit(ADD_PROJECT, this.projectName);
      }

      this.store.commit(NOTIFY, {
        title: "Novo projeto foi salvo!",
        text:
          "Prontinho ;) seu projeto " +
          this.projectName +
          " já está disponível.",
        type: NotificationType.SUCESS,
      });
      this.projectName = "";
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style>
form {
  margin-bottom: 10px;
}
</style>
