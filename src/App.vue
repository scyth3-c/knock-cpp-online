<template>
  <div id="app">
   
    <barra/>
    <Base/>


  </div>
</template>

<script>

import barra from './components/barra.vue'
import Base from './components/base.vue'

export default {
  name: 'App',
  components: {
    barra,
    Base
  }
}
</script>
