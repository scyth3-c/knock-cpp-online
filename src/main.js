import Vue from 'vue'
import App from './App.vue'

import store from './store'

import {BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'
import VueCodemirror from 'vue-codemirror'

import 'codemirror/lib/codemirror.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'es6-promise/auto'

import { io } from "socket.io-client";

const socket = io('https://lobster-app-tadp5.ondigitalocean.app',{
  reconnectionDelay: 10000
})


Vue.config.productionTip = false

Vue.prototype.$socketio = socket;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(VueCodemirror)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
