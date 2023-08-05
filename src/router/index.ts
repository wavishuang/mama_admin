import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Forms from "../views/Forms.vue";
import Tables from "../views/Tables.vue";
import UIElements from "../views/UIElements.vue";
import Login from "../views/Login.vue";
import Receive from '../views/Receive.vue';
import Modal from "../views/Modal.vue";
import Chart from "../views/ChartView.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";

import ProductList from "../views/ProductList.vue";
import ProductAdd from "../views/ProductAdd.vue";

// web
import Product from '../views/web/Product.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { 
      layout: "empty",
      channelID: 2000288906,
      channelSecret: '5e59a76aed582ce6be926c082715d811',
      redirectUrl: 'http://localhost:8080/receive',
    },
  },
  {
    path: "/receive",
    name: "Receive",
    component: Receive,
    meta: { 
      layout: "empty",
      channelID: 2000288906,
      channelSecret: '5e59a76aed582ce6be926c082715d811',
      redirectUrl: 'http://localhost:8080/receive',
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: '/product_list',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product_add',
    name: 'ProductAdd',
    component: ProductAdd
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/charts",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  // web
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: { 
      layout: "product",
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.name === 'Login' || to.name === 'Receive') {
    next()
  } else {
    if(!localStorage.user) {
      next({name: 'Login'})
    }
    next()
  }
})

export default router;
