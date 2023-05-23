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
  },
  mounted(){
    document.body.addEventListener("scroll", this.eBehavior, { passive: true }); 
  },
  methods: {
    eBehavior(e){ 
      window.requestAnimationFrame(function() {
      // No hay código dentro de la función de callback
      });
     }
  }
}

</script>

<style>
::-webkit-scrollbar {
  width: 10px;
  border: none;
}
::-webkit-scrollbar-track {
  background: rgb(28,28,28);
}
::-webkit-scrollbar-thumb {
  background: #121212;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #121212;
}
    </style>