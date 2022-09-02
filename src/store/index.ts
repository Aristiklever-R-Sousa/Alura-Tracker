import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotication";
import http from "@/http";
import { GET_PROJECTS } from "./actions-types";
import { GET_PROJECT } from "./type-mutations";

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  mutations: {
    getProjects(state, projects: IProject[]) {
      state.projects = projects;
    },

    addTask(state, task: ITask) {
      task.id = new Date().toISOString();

      state.tasks.push(task);
    },
    editTask(state, taskP: ITask) {
      const index = state.tasks.findIndex((task) => task.id === taskP.id);
      state.tasks[index] = taskP;
    },
    deleteTask(state, taskId: string) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },

    notify(state, newNotific: INotification) {
      newNotific.id = new Date().getTime();
      state.notifications.push(newNotific);

      setTimeout(() => {
        state.notifications.shift();
      }, 3000);
    },
  },
  actions: {
    getProjects({ commit }) {
      http.get("/projects").then((res) => commit(GET_PROJECT, res.data));
    },
    addProject(context, name: string) {
      return http.post("/projects", {
        name,
      });
    },
    changeProject({ state }, { id, name }: IProject) {
      http.put(`/projects/${id}`, {
        name,
      });
    },
    deleteProject({ dispatch }, id: string) {
      return http.delete(`/projects/${id}`).then(() => dispatch(GET_PROJECTS));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
