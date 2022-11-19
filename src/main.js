/* eslint-disable no-new */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import VueToast from 'vue-toast-notification';
import Antd from 'ant-design-vue';
import VueLoading from 'vue-loading-overlay';
import 'ant-design-vue/dist/antd.css';
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-loading-overlay/dist/vue-loading.css';
import "./assets/css/custom.css";

import { plainAxiosInstance, securedAxiosInstance } from "@/backend/axios"

const appInstance = createApp(App);
appInstance.use(VueToast);
appInstance.use(VueLoading);
appInstance.use(Antd);
appInstance.config.globalProperties.$plain = { ...plainAxiosInstance} 
appInstance.config.globalProperties.$secured = {...securedAxiosInstance}
appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
