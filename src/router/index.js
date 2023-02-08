import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
// import LcRouter from './LcRouter.js'

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
    {
    path: "/",
    component: Layout,
    redirect: "/home",
    name: "Home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/home"),
        meta: {
          title: "首页",
          icon: "dashboard",
          affix: true,
        },
      }
    ],
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];
export const asyncRoutes = [
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "hash", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
