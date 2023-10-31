<template>
    <div>
      <b-button title="asm inspector"  class="mx-1 outwb" @click="panelAsm">
        panel asm <b-icon icon="eye-slash-fill"></b-icon>
      </b-button>

      <b-button
            title="colaboracion"
            class="mx-1 outwb"
            v-b-modal.colab
          >
          <b-icon  variant="primary"></b-icon>
            Colaboracion
          </b-button>

          <b-button
            v-b-modal.notas-modal
            title="mostrar panel de notas"
            class="outwb"
            >Notas</b-button >

          <b-modal id="notas-modal" hide-header hide-footer>
            <p style="cursor:pointer" @click="$bvModal.hide('notas-modal')">X</p>
            <notas />
          </b-modal>        
          
          <colaborate/>

          <b-button
            title="mostrar lista de themas"
            class="mx-1 outwb"
            v-b-modal.themes-modal
            >Temas Fuente</b-button
          >
          <b-modal hide-backdrop hide-header hide-footer id="themes-modal">
            <p style="cursor:pointer" @click="$bvModal.hide('themes-modal')">X</p>
            <themes />
            <b-badge class="mx-auto float-center mt-3 bg-transparent text-dark">selecciona tu tema para la fuente del codigo favorito, no lo perderas al recargar</b-badge>
          </b-modal>

      <b-button @click="restCache" class="btn-sm outwb m-1 p-2">reset cache <b-icon icon="archive-fill">  </b-icon> </b-button>

         <b-form-checkbox
             method="any"
            v-if="visibles.libcurl"
             class="ml-3 mt-2 p-3 font-weight-bolder"
            id="curlmode"
            v-model="usecurl"
            name="curlmode"
            value="on"
            unchecked-value="off">
             Usar libcurl (http) <b-icon icon="cloud"></b-icon>  
            </b-form-checkbox>
    </div>

</template>

<script>

import notas from "./notas.vue";
import themes from "./themes.vue";
import colaborate from "./colabVue.vue"
import {mapState} from 'vuex';

export default {
    name: 'complementosVue',
    components:{
        notas, themes, colaborate
    },
    methods:{
      restCache() {
        localStorage.clear();
        sessionStorage.clear();
      },
      panelAsm(){
        this.$store.commit('codespaces/interPanelAsm');
      }
    },
    computed:{
        ...mapState( 'base', ["visibles"]),
    usecurl: {
      get(){return this.$store.state.compile.usecurl; },
      set(value) {
        localStorage.setItem("usecurl", value)
        this.$store.state.compile.usecurl = value;
      }
     },
  }
}
</script>

<style>
@import "@/assets/general.v1.css";
</style>
