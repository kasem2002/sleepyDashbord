import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { isUserLoggedIn } from "./utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    if (!isUserLoggedIn()) next({ name: "login" });

    next();
  } else {
    if (isUserLoggedIn()) next({ path: "/users" });
  }
  next();
});

// Docs: 'https:// router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router;
