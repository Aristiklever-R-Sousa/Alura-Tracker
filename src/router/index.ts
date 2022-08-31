import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Tasks from "@/views/Tasks.vue";
import Projects from "@/views/Projects.vue";
import FormProject from "@/views/Project/FormProject.vue";
import ProjectsList from "@/views/Project/List.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    children: [
      {
        path: "",
        name: "Projects",
        component: ProjectsList,
      },
      {
        path: "new",
        name: "New Project",
        component: FormProject,
      },
      {
        path: ":id",
        name: "Edit Project",
        component: FormProject,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
