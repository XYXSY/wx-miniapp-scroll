import Es6Promise from "es6-promise";
import "babel-polyfill";
Es6Promise.polyfill();

import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import Cookies from "js-cookie";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import i18n from "./lang"; // internationalization
import "@/icons"; // icon
import "@/permission"; // permission control

import "element-ui/lib/theme-chalk/index.css";
import { message } from "./utils/reset-message"; // reset message

import { get, post } from "@/utils/request.js";
Vue.prototype.$get = get;
Vue.prototype.$post = post;

// 语言
Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium",
  i18n: (key, value) => i18n.t(key, value),
});

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);
// 必须在这行命令后，覆盖 $message 方法
Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});

//按钮权限控制，在el-button中 使用:disabled="btnDisabled($route.meta.menuId,'tktTicketmodelinfo:save')";
//btnDisabled 参数（当前页面菜单id，按钮在后台的方法名）
import { btnDisabled } from "@/utils/index.js";
Vue.prototype.customBtnDisabled = btnDisabled;

// button节流，在button中添加v-preventReClick即可控制按钮，防止按钮连击，时间限制2s
Vue.directive("preventReClick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (el.style.pointerEvents !== "none") {
        el.style.pointerEvents = "none";
        setTimeout(() => {
          el.style.pointerEvents = "";
        }, 2000);
      }
    });
  },
});
