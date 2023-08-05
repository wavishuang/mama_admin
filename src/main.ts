import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashboardLayout from "./components/DashboardLayout.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
// Web
import WebLayout from "./components/WebLayout.vue";
import ProductLayout from "./components/ProductLayout.vue";

import "./assets/tailwind.css";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPinia } from 'pinia';
const pinia = createPinia();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);
// Web
app.component("web-layout", WebLayout);
app.component("product-layout", ProductLayout);

app
  .use(router)
  .use(pinia)
  .use(VueApexCharts)
  .use(ElementPlus)
  .mount("#app");
