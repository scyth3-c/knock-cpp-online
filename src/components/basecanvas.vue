<template>
  <b-container>
    <b-card
      :class="bytheme"
      class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
    >
      <b-container style="display:inline;">
      <b-form-select
        class="text-center mt-1 text-info col-sm-2 font-weight-bold"
        v-model="standar"
        style="background: rgba(0,0,0,0);"
        title="el estandar con el que se compilara c++"
      >
        <b-form-select-option value="c++11">c++11</b-form-select-option>
        <b-form-select-option value="c++17">c++17</b-form-select-option>
        <b-form-select-option value="c++14">c++14</b-form-select-option>
        <b-form-select-option value="c++2a">c++2a</b-form-select-option>
      </b-form-select>
        <b-form-select
        class="ml-3 mt-1 text-center text-info col-md-1 font-weight-bold"
        v-model="optimizar"
        style="background: rgba(0,0,0,0);"
        title="el nivel de optimizacion a la hora de compilar, esto se vera en el codigo ensamblador"
        >
        <b-form-select-option value="1">O1</b-form-select-option>
        <b-form-select-option value="2">O2</b-form-select-option>
        <b-form-select-option value="3">O3</b-form-select-option>
      </b-form-select>
      <b-button title="descarga el codigo assembly generado del codigo c++" @click="getAssembly" style="background: rgba(0,0,0,0);" class=" mt-1 ml-3">ASM</b-button>
      <b-button title="descarga el codigo escrito" @click="download" style="background: rgba(0,0,0,0);" class="mt-1 ml-2"
        ><b-icon icon="download" variant="white"></b-icon
      ></b-button>  

            <b-button style="background: rgba(0,0,0,0);" class="mt-1 float-right ml-1" v-b-modal.flags-modal title="banderas de compilacion para c++">
            flags
          </b-button>
          <b-modal id="flags-modal" title="flags">
            <b-badge variant="dark" class="mb-1">example:  -Wall -pedantic</b-badge>
            <b-input v-model="flags"></b-input>
          </b-modal>

          <b-button style="background: rgba(0,0,0,0);" class="mt-1 float-right ml-auto" v-b-modal.extra-modal title="muestra el panel de addons extra"> <b-icon variant="white" icon="easel-fill"></b-icon> </b-button>
          <b-modal id="extra-modal" title="extra">

            <b-button v-b-modal.notas-modal variant="primary">Notas</b-button>
            <b-modal id="notas-modal" hide-footer>
              <notas/>
            </b-modal>

            <b-button class="ml-1" v-b-modal.themes-modal variant="primary">themes</b-button>
            <b-modal id="themes-modal">
              <themes/>
            </b-modal>
          </b-modal>
          
            <b-modal id="program-input">
              <inputData/>
            </b-modal>

      </b-container>
      <div class="row">
        <div class="rounded col-md-12 shadow-md mt-2">

          <codemirror v-model="code" :options="cmOption" />

        </div>
        <b-card
          class="w-100 mt-2"
          style="background:rgba(0,0,0,0); max-height: 120px; min-height: 120px; overflow-y:auto; border:none;"
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
      <b-button v-b-modal.program-input variant="primary" class="ml-1 float-right mt-1" >input <b-icon icon="input-cursor-text"></b-icon> </b-button>
      <b-button @click="compile" variant="success" class="ml-1 float-right mt-1">compilar</b-button>
      <b-button class="float-right mx-auto mt-1" variant="danger" @click="reset"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
    </b-card>

  </b-container>
</template>
<script>

import notas from './extra/notas.vue'
import themes from './extra/themes.vue'
import inputData from './extra/program-input.vue'

import {mapGetters} from 'vuex'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/dracula.css'
import 'codemirror/theme/yonce.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'


import 'codemirror/mode/clike/clike.js'
import 'codemirror/keymap/sublime.js'

export default {  

  name: "basecanvas",
  components: {
    notas,
    themes,
    inputData,
    codemirror
  },

  created() {
    this.charge();
    this.$root.$on('Theme',()=>{
      this.$forceUpdate();
    });
  },

  methods: {

    charge() {
      this.$store.commit('charge');
    },

    compile() {
        this.$store.commit('compile', this);
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
        'seed',
        'cmOption'
     ]),
       
       flags: {
         get() {       return this.$store.state.cxxflags; },
         set(value) {  this.$store.commit('superUpdate', {type: 'flags', data:value }); }
       },

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
      },

      bytheme() {
          return this.$store.state.bytheme;
      }
}   
  

};
</script>






<style scoped>

.dracula {
  background: rgb(40, 42, 54);
  min-height: 530px;
}
.monokai {
  background: rgb(39, 40, 34);
}
.yonce {
  background: rgb(28, 28, 28);
}
.base16-dark { 
  background: rgb(21, 21, 21);
}
.default {
  background: rgb(199, 200, 204);
}

</style>
