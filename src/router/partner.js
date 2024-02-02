import {createRouter, createWebHistory} from "vue-router";

let routes = [];
routes = [
  {
    path: "/partner",
    name: "partner",
    component: () => import("../components/partner/HomePartner.vue"),
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
  


export default router;
