import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotication";

import http from "@/http";
import { GET_PROJECTS, GET_TASKS } from "./type-mutations";

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

    getTasks(state, tasks: ITask[]) {
      state.tasks = tasks;
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
      http.get("/projects").then((res) => commit(GET_PROJECTS, res.data));
    },
    addProject(context, name: string) {
      return http.post("/projects", {
        name,
      });
    },
    changeProject(context, { id, name }: IProject) {
      return http.put(`/projects/${id}`, {
        name,
      });
    },
    deleteProject({ dispatch }, id: string) {
      return http.delete(`/projects/${id}`).then(() => dispatch(GET_PROJECTS));
    },

    getTasks({ commit }) {
      http.get("/tasks").then((res) => commit(GET_TASKS, res.data));
    },
    addTask(context, task: ITask) {
      return http.post("/tasks", {
        id: task.id,
        description: task.description,
        project: task.project,
        timeInSeconds: task.timeInSeconds,
      });
    },
    changeTask(context, task: ITask) {
      return http.put(`/tasks/${task.id}`, {
        description: task.description,
        project: task.project,
        timeInSeconds: task.timeInSeconds,
      });
    },
    deleteTask({ dispatch }, id: string) {
      return http.delete(`/tasks/${id}`).then(() => dispatch(GET_TASKS));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
