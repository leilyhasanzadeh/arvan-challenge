import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login/index.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register/index.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/Dashboard/index.vue"),
    children: [
      {
        path: "article-list",
        name: "ArticleList",
        component: () => import("../views/Article/ArticleList.vue"),
      },
      {
        path: "article-new",
        name: "ArticleNew",
        component: () => import("../views/Article/Article.vue"),
      },
      {
        path: "article-update/:slug",
        name: "ArticleUpdate",
        component: () => import("../views/Article/Article.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
