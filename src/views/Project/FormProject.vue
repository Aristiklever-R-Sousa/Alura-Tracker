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
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { POST_PROJECT, PUT_PROJECT } from "@/store/actions-types";
import { NotificationType } from "@/interfaces/INotication";
import useNotifier from "@/hooks/notifier";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormProject",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { notify } = useNotifier();

    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (project) => project.id == props.id
      );

      projectName.value = project?.name || "";
    }

    const handleResponse = () => {
      return {
        sucess: () => {
          notify(
            "Novo projeto salvo!",
            "Prontinho ;) seu projeto " +
              projectName.value +
              " já está disponível.",
            NotificationType.SUCESS
          );
        },
        fail: () => {
          notify(
            "Algo bad aconteceu ;(",
            `Infelizmente algo aconteceu ao tentar salvar o projeto ${projectName.value} tente novamente mais tarde`,
            NotificationType.FAIL
          );
        },
        default: () => {
          projectName.value = "";
          router.push("/projects");
        },
      };
    };

    const salve = async () => {
      if (props.id) {
        store
          .dispatch(PUT_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => handleResponse().sucess())
          .catch(() => handleResponse().fail())
          .finally(() => handleResponse().default());
      } else {
        store
          .dispatch(POST_PROJECT, projectName)
          .then(() => handleResponse().sucess())
          .catch(() => handleResponse().fail())
          .finally(() => handleResponse().default());
      }
    };

    return {
      projectName,
      handleResponse,
      salve,
    };
  },
});
</script>

<style>
form {
  margin-bottom: 10px;
}
</style>
