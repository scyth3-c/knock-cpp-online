<template>
  <div id="app">
    <barra/>
        <Base/>
  </div>
</template>
<script>
import Base from './components/base/basecanvas.vue'
import barra from "@/components/base/barra.vue";
export default {
  name: 'App',
  components: {
    Base,
    barra
  },

  metaInfo() {
    return {
      title: 'kcompiler | online c++ ☀️', // Agrega un título SEO si lo deseas
      meta: [
        {
          name: 'description',
          content: 'compilador web para c++ gratis y facil de usar, modo proyecto, clases y estandares hasta c++20, colaboracion remota y entrada de usuario.',
        },
      ],
    };
  },
  mounted(){
    document.body.addEventListener("scroll", this.eBehavior, { passive: true }); 
  },
  methods: {
    eBehavior(){
      window.requestAnimationFrame(() => {

        const scrollY = window.scrollY;
        const newScrollY = scrollY + 1;

        window.scrollBy(0, newScrollY - scrollY);
      });
     }
  }
}

</script>

<style>
@import "@/assets/app.base.css";
</style>