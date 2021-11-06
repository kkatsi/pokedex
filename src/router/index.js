import { toNumber } from "@vue/shared";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: "/:pokeName",
    name: "pokemon",
    meta: {
      title: (route) => {
        return `${route.params.pokeName[0].toUpperCase() +
          route.params.pokeName.substring(1)} - Pokédex`;
      },
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pokemon.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if (to.meta.title) {
    document.title = to.meta.title(to);
  } else document.title = "Pokédex";
  next();
});

export default router;
