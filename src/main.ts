import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";

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
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 預設的 layout
app.component("default-layout", DashboardLayout);
// Login & Receive
app.component("empty-layout", EmptyLayout);
// Web
app.component("web-layout", WebLayout);
// 商品詳情
app.component("product-layout", ProductLayout);

app
  .use(router)
  .use(pinia)
  .use(VueApexCharts)
  .use(ElementPlus)
  .mount("#app");
