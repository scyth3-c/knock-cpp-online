<template>
  <b-container>
    <b-card
      class="col-md-12 mb-3 bg-dark w-100 mt-2 shadow-lg"
      style="min-height: 530px;"
    >
      <b-container style="display:inline;">
      <b-form-select
        class="text-center mt-1 bg-dark text-white col-sm-2 font-weight-bold"
        v-model="standar"
        title="el estandar con el que se compilara c++"
      >
        <b-form-select-option value="c++11">c++11</b-form-select-option>
        <b-form-select-option value="c++17">c++17</b-form-select-option>
        <b-form-select-option value="c++14">c++14</b-form-select-option>
        <b-form-select-option value="c++2a">c++2a</b-form-select-option>
      </b-form-select>
        <b-form-select
        class="ml-3 mt-1 text-center bg-dark text-white col-md-1 font-weight-bold"
        v-model="optimizar"
        title="el nivel de optimizacion a la hora de compilar, esto se vera en el codigo ensamblador"
        >
        <b-form-select-option value="1">O1</b-form-select-option>
        <b-form-select-option value="2">O2</b-form-select-option>
        <b-form-select-option value="3">O3</b-form-select-option>
      </b-form-select>
      <b-button title="descarga el codigo assembly generado del codigo c++" @click="getAssembly" variant="dark" class="mt-1 ml-3 btn btn-outline-info">ASM</b-button>
      <b-button title="descarga el codigo escrito" @click="download" variant="dark" class="mt-1 ml-2"
        ><b-icon icon="download" variant="white"></b-icon
      ></b-button>  
          <b-button variant="dark" class="float-right ml-auto" v-b-modal.extra-modal title="muestra el panel de addons extra"> <b-icon variant="white" icon="easel-fill"></b-icon> </b-button>
          <b-modal id="extra-modal" title="extra">
            <b-button v-b-modal.notas-modal variant="primary">Notas</b-button>
            <b-modal id="notas-modal" hide-footer>
              <notas/>
            </b-modal>
          </b-modal>
      </b-container>
      <div class="row">
        <div class="contencore rounded ml-1 col-md-12 shadow-md mt-2">
          <vue-itextarea
            v-model="code"
            autofocus
            required
            class="codecore mt-2 font-weight-bold"
            name="code"
            id="content"
            rows="13"
          ></vue-itextarea>
        </div>
        <b-card
          class="w-100 ml-2 bg-dark mt-2"
          style="max-height: 120px; min-height: 120px; overflow-y:auto; border:none;"
        >
          <b-badge variant="danger" class="text-white"
            >output:
            <b-icon icon="file-earmark-arrow-down" variant="white"></b-icon>
          </b-badge>
          <br />
          <span class="text-white" style="font-family:monospace;">
            {{ output }}
          </span>
        </b-card>
      </div>
      <b-button @click="compile" variant="success" class="ml-1 float-right mt-1">compilar</b-button>
      <b-button class="float-right mx-auto mt-1" variant="danger" @click="reset"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
    </b-card>
  </b-container>
</template>
<script>

import notas from './extra/notas.vue'
import {mapGetters} from 'vuex'

export default {

  name: "basecanvas",
  components: {
    notas
  },

  created() {
    this.charge();
  },


  methods: {

    charge() {
      this.$store.commit('charge');
    },

    compile() {
        this.$store.commit('compile');
    },
    state() {
      this.$store.commit('charge');
    },
     
   download() {
     this.$store.commit('download');
   },

   getAssembly() {
     this.$store.commit('getAssembly');
   },
    reset() {
      this.$store.state.output = '';
    }



  },


  
  computed: {

     ...mapGetters([
        'time',
        'seed'
     ]),
      
      standar: {
        get() {       return this.$store.state.standar;   },
        set(value) {  this.$store.commit('superUpdate',   {type: 'standar', data: value}); }
      },

      code: {
        get() {        return this.$store.state.code;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'code', data: value});  }
      },

      buffer: {
        get() {        return this.$store.state.buffer;   },
        set(value) {  this.$store.commit('superUpdate',   {type:'buffer', data: value});   }
      },
      output: {
        get() {        return this.$store.state.output;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'output', data: value});  }
      },
      temp: {
        get() {        return this.$store.state.temp;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'temp', data: value});  }
      },
      optimizar: {
        get() {        return this.$store.state.optimizar;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'optimizar', data: value});  }
      }

}   
  


};
</script>






<style>
.codecore {
  background-color: rgb(13, 33, 51);
  color: rgb(139, 223, 230);
  width: 99%;
  border: none;
  outline: 0;
  font-family: monospace;
}
.contencore {
  background-color: rgb(13, 33, 51);
  min-height: 300px;
  border-bottom: 10px solid rgb(10, 22, 32);
}
::-webkit-scrollbar {
  width: 10px;
  border: none;
}
::-webkit-scrollbar-track {
  background: rgb(13, 33, 51);
}
::-webkit-scrollbar-thumb {
  background: rgb(19, 41, 61);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(13, 33, 51);
}
</style>
