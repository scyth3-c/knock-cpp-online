import Vue from 'vue'
import App from './App.vue'

import global from './components/global.vue'
import {BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global;
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

new Vue({
  render: h => h(App),
}).$mount('#app')
