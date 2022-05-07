import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

const router = new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      redirect: "/main",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          name: "Main",
          path: "main",
          component: () => import("@/views/MainPage.vue"),
        },
      ],
    },
  ],
});

export default router;
