import Vue from 'vue'
import App from './App.vue'

import VueAxios from 'vue-axios'
import axios from 'axios'


import global from './components/global.vue'
import {BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'

import vue_itextarea from 'vue-itextarea';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global;
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.component('vue-itextarea', vue_itextarea);

new Vue({
  render: h => h(App),
}).$mount('#app')
