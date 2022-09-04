import { Module } from "vuex";

import IProject from "@/interfaces/IProject";

import http from "@/http";
import { State } from "@/store";
import { ADD_PROJECT, GET_PROJECTS } from "@/store/type-mutations";

export interface ProjectState {
  projects: IProject[];
}

export const project: Module<ProjectState, State> = {
  state: {
    projects: [],
  },
  mutations: {
    getProjects(state, projects: IProject[]) {
      state.projects = projects;
    },
    addProject(state, project: IProject) {
      state.projects.push(project);
    },
  },
  actions: {
    getProjects({ commit }) {
      http.get("/projects").then((res) => commit(GET_PROJECTS, res.data));
    },
    addProject({ commit }, name: string) {
      return http
        .post("/projects", {
          name,
        })
        .then((res) => commit(ADD_PROJECT, res.data));
    },
    changeProject(context, { id, name }: IProject) {
      return http.put(`/projects/${id}`, {
        name,
      });
    },
    deleteProject({ dispatch }, id: string) {
      return http.delete(`/projects/${id}`).then(() => dispatch(GET_PROJECTS));
    },
  },
};
