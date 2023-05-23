<template>
    <div>
        <b-button
            title="colaboracion"
            variant="dark"  
            class="mx-2"
            v-b-modal.colab
          >
          <b-icon icon="thunder" variant="primary"></b-icon>  
            Colaboracion
          </b-button>

          <b-button
            v-b-modal.notas-modal
            title="mostrar panel de  notas"
            variant="dark"
            >Notas</b-button >

          <b-modal id="notas-modal" hide-header hide-footer>
            <p style="cursor:pointer" @click="$bvModal.hide('notas-modal')">X</p>
            <notas />
          </b-modal>        
          
          <colaborate/>

          <b-button
            title="mostrar lista de themas"
            class="ml-1"
            v-b-modal.themes-modal
            variant="dark"
            >Temas</b-button
          >
          <b-modal hide-backdrop hide-header hide-footer id="themes-modal">
            <p style="cursor:pointer" @click="$bvModal.hide('themes-modal')">X</p>
            <themes />
            <p class="mx-auto float-center mt-3">selecciona tu tema favorito, no lo perderas al recargar</p>
          </b-modal>

         <b-form-checkbox 
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
import { mapGetters } from 'vuex';

export default {
    name: 'complementosVue',
    components:{
        notas,
        themes,
        colaborate
    },
    computed:{
        ...mapGetters(["visibles"]),
    usecurl: {
      get(){return this.$store.state.usecurl; },
      set(value) {this.$store.commit("superUpdate",{type: "curl", data: value});}
     },
  }
}
</script>