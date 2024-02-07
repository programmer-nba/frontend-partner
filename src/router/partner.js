import { createRouter, createWebHistory } from "vue-router";
import jwtDecode from "jwt-decode";

const routes = [
  {
    path: "/",
    name: "partner",
    component: () => import("../components/partner/HomePartner.vue"),
    beforeEnter: (to, from, next) => {
      const decode = jwtDecode(localStorage.getItem("token"));
      if (decode.status_appover === "อนุมัติ") {
        next();
      } else {
        next({ name: "HomeNewPartner" }); 
      }
    },
  },
  {
    path: "/",
    name: "HomeNewPartner",
    component: () => import("../components/partner/HomeNewPartner.vue"),
    beforeEnter: (to, from, next) => {
      const decode = jwtDecode(localStorage.getItem("token"));
      if (decode.status_appover === "ยังกรอกข้อมูลไม่ครบ" ||decode.status_appover === "รออนุมัติ" || decode.status_appover === "อนุมัติแล้ว") {
        next();
      } else {
        next({ name: "partner" }); 
      }
    },
  },
  {
    path:"/ContractByID/:id"  ,
    name:"ContractByID",
    component : ()=> import("../components/partner/contact.vue")
  },
  {
    path:"/Contract/AddContract",
    name:"AddContract",
    component : ()=> import("../components/contact/AddContact.vue")
  },
  {
    path:"/Contract/",
    name:"Contract",
    component : ()=> import("../components/contact/ContactView.vue")
  },
  {
    path:"/Dealers",
    name:"Dealers",
    component : ()=> import("../components/dealers/dealerview.vue")
  },
  {
    path:"/Dealersview",
    name:"Dealersview",
    component : ()=> import("../components/dealers/dealer.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
