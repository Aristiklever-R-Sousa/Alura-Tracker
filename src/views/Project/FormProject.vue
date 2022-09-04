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
import { POST_PROJECT, PUT_PROJECT } from "@/store/actions-types";
import { NotificationType } from "@/interfaces/INotication";
import useNotifier from "@/hooks/notifier";

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
      const project = this.store.state.project.projects.find(
        (project) => project.id == this.id
      );

      this.projectName = project?.name || "";
    }
  },
  methods: {
    handleResponse() {
      return {
        sucess: () => {
          this.notify(
            "Novo projeto salvo!",
            "Prontinho ;) seu projeto " +
              this.projectName +
              " já está disponível.",
            NotificationType.SUCESS
          );
        },
        fail: () => {
          this.notify(
            "Algo bad aconteceu ;(",
            "Infelizmente algo aconteceu ao tentar salvar o projeto " +
              this.projectName +
              " tente novamente mais tarde",
            NotificationType.FAIL
          );
        },
        default: () => {
          this.projectName = "";
          this.$router.push("/projects");
        },
      };
    },
    async salve() {
      if (this.id) {
        this.store
          .dispatch(PUT_PROJECT, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => this.handleResponse().sucess())
          .catch(() => this.handleResponse().fail())
          .finally(() => this.handleResponse().default());
      } else {
        this.store
          .dispatch(POST_PROJECT, this.projectName)
          .then(() => this.handleResponse().sucess())
          .catch(() => this.handleResponse().fail())
          .finally(() => this.handleResponse().default());
      }
    },
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    return {
      store,
      notify,
    };
  },
});
</script>

<style>
form {
  margin-bottom: 10px;
}
</style>
