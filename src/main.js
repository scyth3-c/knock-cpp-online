import Vue from 'vue'
import App from './App.vue'

import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import {BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'es6-promise/auto'

import vue_itextarea from 'vue-itextarea';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.component('vue-itextarea', vue_itextarea);

Vue.use(VueAxios, axios);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
