import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashboardLayout from "./components/DashboardLayout.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
import "./assets/tailwind.css";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia';
const pinia = createPinia();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);

app
  .use(router)
  .use(pinia)
  .use(VueApexCharts)
  .use(ElementPlus)
  .mount("#app");
