<template>
  <div id="app">
    <Base/>
      <br>
    <footerVue/>
  </div>
</template>
<script>
import Base from './components/basecanvas.vue'
import footerVue from './components/extra/footerVue.vue'
export default {
  name: 'App',
  components: {
    Base,
    footerVue
  }
}
</script>