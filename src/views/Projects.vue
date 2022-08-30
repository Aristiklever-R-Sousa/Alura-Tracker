<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>
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
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IProject from "@/interfaces/IProject";

export default defineComponent({
  name: "ProjectsComp",
  data() {
    return {
      projectName: "",
      projects: [] as IProject[],
    };
  },
  methods: {
    salve() {
      const project: IProject = {
        name: this.projectName,
        id: new Date().toISOString(),
      };

      this.projects.push(project);
      this.projectName = "";
    },
  },
});
</script>

<style>
.projects {
  padding: 1.25rem;
}
form {
  margin-bottom: 10px;
}
</style>
