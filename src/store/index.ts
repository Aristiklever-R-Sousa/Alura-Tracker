import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import { ProjectState, project } from "./modules/projects";
import { TaskState, task } from "./modules/tasks";
import { INotification } from "@/interfaces/INotication";

export interface State {
  project: ProjectState;
  task: TaskState;
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    project: {
      projects: [],
    },
    task: {
      tasks: [],
    },
    notifications: [],
  },
  mutations: {
    notify(state, newNotific: INotification) {
      newNotific.id = new Date().getTime();
      state.notifications.push(newNotific);

      setTimeout(() => {
        state.notifications.shift();
      }, 3000);
    },
  },
  modules: {
    project,
    task,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
