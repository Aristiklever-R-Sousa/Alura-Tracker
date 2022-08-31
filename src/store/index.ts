import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";

interface State {
  projects: IProject[];
  tasks: ITask[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
  },
  mutations: {
    addProject(state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;

      state.projects.push(project);
    },
    editProject(state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id === project.id);
      state.projects[index] = project;
    },
    deleteProject(state, projectId: string) {
      state.projects = state.projects.filter((proj) => proj.id !== projectId);
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
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
