import { Module } from "vuex";

import ITask from "@/interfaces/ITask";

import http from "@/http";
import { State } from "@/store";
import { ADD_TASK, EDIT_TASK, GET_TASKS } from "@/store/type-mutations";

export interface TaskState {
  tasks: ITask[];
}

export const task: Module<TaskState, State> = {
  state: {
    tasks: [],
  },
  mutations: {
    getTasks(state, tasks: ITask[]) {
      state.tasks = tasks;
    },
    addTask(state, task: ITask) {
      state.tasks.push(task);
    },
    editTask(state, task: ITask) {
      state.tasks.forEach((t) => {
        t.id === task.id ? (t = task) : "";
      });
    },
  },
  actions: {
    getTasks({ commit }) {
      http.get("/tasks").then((res) => commit(GET_TASKS, res.data));
    },
    addTask({ commit }, task: ITask) {
      return http
        .post("/tasks", {
          description: task.description,
          project: task.project,
          timeInSeconds: task.timeInSeconds,
        })
        .then(() => commit(ADD_TASK, task));
    },
    changeTask({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, {
          description: task.description,
          project: task.project,
          timeInSeconds: task.timeInSeconds,
        })
        .then(() => commit(EDIT_TASK, task));
    },
    deleteTask({ dispatch }, id: string) {
      return http.delete(`/tasks/${id}`).then(() => dispatch(GET_TASKS));
    },
  },
};
