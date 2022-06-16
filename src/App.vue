<template>
  <div id="app">
    <barra/>
    <Base/>
      <br>
    <footerVue/>
  </div>
</template>
<script>
import barra from './components/barra.vue'
import Base from './components/basecanvas.vue'
import footerVue from './components/extra/footerVue.vue'
export default {
  name: 'App',
  components: {
    barra,
    Base,
    footerVue
  }
}
</script>