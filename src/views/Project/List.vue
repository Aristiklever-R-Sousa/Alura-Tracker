<template>
  <section>
    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <Button
              :name="'delete'"
              :class="'ml-2 is-danger'"
              :icon="{ name: 'fas fa-trash', class: 'is-small' }"
              @click="removeProject(project.id || '')"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from "@/store";
import Button from "@/components/ButtonComp.vue";
import { GET_PROJECTS, DELETE_PROJECT } from "@/store/actions-types";

export default defineComponent({
  name: "ProjectsList",
  methods: {
    removeProject(id: string) {
      this.store.dispatch(DELETE_PROJECT, id);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_PROJECTS);

    return {
      projects: computed(() => store.state.projects),
      store,
    };
  },
  components: { Button },
});
</script>

<style></style>
