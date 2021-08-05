require('./bootstrap');
import Vue from 'vue'
import router from "./router";

//Main pages
import App from './app.vue'
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import {funcGlobal} from './funcGlobal.js'
Vue.prototype.$funcGlobal = funcGlobal
Vue.use(VueToast);
const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App }
});