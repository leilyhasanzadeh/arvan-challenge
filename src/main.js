//libraries
import { createApp } from "vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";

//components
import App from "./App.vue";

//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/styles/style.css";
import "vue-toast-notification/dist/theme-sugar.css";
import "./configs/axios";

//app
createApp(App).use(ToastPlugin).use(router).mount("#app");
