<template>
  <div class="div-container">
    <b-card :class="bytheme" class=" mb-3 shadow-lg cnbase">
      
      <!-- panel de opciones  -->
      <b-modal hide-header id="options" hide-footer v-if="visibles.options">
        <p style="cursor:pointer" @click="$bvModal.hide('options')">X</p>
        <options/>
      </b-modal>
      
      <!-- pandel de la entrada del usuario -->
      <b-modal hide-header hide-footer id="program-input">
        <p style="cursor:pointer" @click="$bvModal.hide('program-input')">X</p>
          <inputData />
        </b-modal>

      <!-- panel para las librerias -->
      <b-modal hide-footer id="headers">
        <headers />
      </b-modal>
      
      <!-- banderas de compilacion -->
      <b-modal hide-footer  hide-header  id="flags-modal">
          <p style="cursor:pointer" @click="$bvModal.hide('flags-modal')">X</p>
          <b-badge class="mb-1 bg-transparent text-dark">e.g  &nbsp; -Wall -pedantic</b-badge>
         <b-input placeholder="-some" class="mb-4" v-model="flags"></b-input>
      </b-modal>

      <!-- panel de complementos -->
      <b-modal hide-footer id="extra-modal" hide-header title="complementos">
        <p style="cursor:pointer" @click="$bvModal.hide('extra-modal')">X</p>
          <complementos/>
      </b-modal>

      <!-- barra de control principal -->
      <div class="row w-100 body-tam" >
        <div class="rounded col-md-12 shadow-md mt-2 editor-canva">
          <div id="file-list" class="files mb-3">

           <button v-b-modal.options class="configs">
            <b-icon icon="grid-fill"></b-icon>
           </button>

           <b-badge  v-if="visibles.colab" class="text-white" variant="transparent">Modo colaboracion <b-icon icon="emoji-smile" variant="white"></b-icon></b-badge>

            <button
            v-if="visibles.poo"
              title="cambiar a modo de clases"
              @click="changeMode"
              class="classmode mx-1 bt-hover"
  
            >
              {{getClassModeName}}
            </button>

            <button
            v-if="visibles.tabs"
              title="tab home"
              id="tab_id0"
              @click="setSpace({ id: 'tab_id0' })"
              class="tabs mx-1 bt-hover"
            >
              <b-icon icon="house" ></b-icon>
            </button>

            <button
            v-if="visibles.tabs"
              title="añadir un nuevo archivo"
              class="classmode bt-hover"
              id="newspace-button"
              @click="addSpace"
            >
              <b-icon  icon="file-earmark-plus"></b-icon>
            </button>

            
        <b-button
          :disabled="usecurl == 'on'"
          class="btn-sm float-right ml-1 bg-transparent"
          v-b-modal.flags-modal
          title="banderas de compilacion para c++"
          >
          Banderas
        </b-button> 
        <b-button
            class="btn-sm float-right ml-auto bg-transparent"
            v-b-modal.extra-modal
           title="muestra el panel de addons extra"
          >
            <b-icon variant="white" icon="puzzle-fill"></b-icon>
        </b-button>
  

          </div>

          <br v-if="local_widthMatch">

          <div id="files">
            <codemirror
              :style="codeSpaces[0].class"
              :id="codeSpaces[0].id"
              v-if="codeSpaces[0].visible"
              v-model="codeSpaces[0].code"
              :options="cmOption"
            />
          </div>
        </div>
      
        <!-- resultado de salida -->
       <b-modal size="lg" id="output-modal" hide-footer hide-header>
        <p style="cursor:pointer" @click="$bvModal.hide('output-modal')">X</p>
        <b-card
          class="w-100"
          style="
            background: rgba(0, 0, 0, 0);
            max-height: 400px;
            min-height: 160px;
            overflow-y: auto;
            border: none;
           "
        >
          <pre class="text-dark" style="font-family: monospace">{{ output }}</pre>
        </b-card> 
       </b-modal>
      </div>

      <!-- definir entrada de usuario  -->
      <b-button
        title="establer entrada del programa"
        v-b-modal.program-input
        variant="primary"
        style="background: rgba(0, 0, 0, 0)"
        class="ml-1 float-right mt-1"
        >entrada <b-icon icon="input-cursor-text"></b-icon>
      </b-button>

      <!-- entrada de linrerias -->
      <b-button
        id="establercer las librerias en el modo clasess"
        v-b-modal.headers
        class="float-right mt-1 ml-2"
        variant="secondary"
        style="background: rgba(0, 0, 0, 0)"
        v-if="mode"
        >#include</b-button
      >

      <!-- boton de compilar el codigo -->
      <b-button
        title="compilar"
        @click="compile"
        variant="success"
        style="background: rgba(0, 0, 0, 0)"
        class="ml-1 float-right mt-1"
        v-b-modal.output-modal
        >compilar</b-button
      >

      <!-- reiniciar resultado de salida  -->
      <b-button
        title="resetear la salida"
        class="float-right mx-auto mt-1 ml-1"
        style="background: rgba(0, 0, 0, 0)"
        variant="danger"
        @click="reset"
      >
        <b-icon icon="arrow-counterclockwise"></b-icon>
      </b-button>
    </b-card>
  </div>
</template>
<script>

import inputData from "./extra/program-input.vue";
import Editor from "./editor.vue";
import headers from "./extra/headers.vue";
import complementos from "./extra/complementos.vue";

import options from "./extra/options.vue";

import { mapGetters } from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";


import "codemirror/theme/dracula.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/base16-dark.css";

import "codemirror/mode/clike/clike.js";
import "codemirror/keymap/sublime.js";


export default {
  name: "basecanvas",
  components: {
    inputData,
    codemirror,
    Editor,
    headers,
    options,
    complementos
  },

  beforeMount(){
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const Search_Query = params.get('sq');
    if(Search_Query){
      this.$store.dispatch("extract_notecode", Search_Query)
    }
    const codespace = params.get('codespace');

    if(this.$store.state.visibles.colab && codespace){  
      this.$store.state.visibles.codespace = codespace
      this.$store.dispatch('setColab', false)
      this.$store.dispatch("extract_codespace", codespace)
      this.$store.dispatch('toColabClient', codespace)
      this.$store.dispatch('socketOn', this)
    }

    if(codespace && this.$store.state.visibles.codespace == "null"){
      this.$store.state.visibles.codespace = codespace
      this.$store.dispatch('setColab', false)
      this.$store.dispatch("extract_codespace", codespace)
      this.$store.dispatch('socketOn', this)
    }
  },
  mounted() {
    this.local_widthQuery.addEventListener('change',()=>{
    this.local_widthMatch = this.local_widthQuery.matches;
    });
    this.$store.commit("setColabUrl")
  },

  data(){
    const local_widthQuery = matchMedia("(min-width: 300px) and (max-width:  991px )") 
   return {
    local_class_mode_name: 'POO ',
    local_mode: 'off',
    local_widthQuery: local_widthQuery,
    local_widthMatch: local_widthQuery.matches,
   }
  },

  methods: {

    changeMode() {
      this.$store.commit("changeMode");
      this.local_mode = this.$store.state.mode ? 'On' : 'Off';
    },

    setSpace(value) {
      this.$store.commit("setSpace", value);
    },

    addSpace() {
      this.$store.dispatch("newSpace", { vm: this });
    },

    compile() {
      this.$store.dispatch("compile", { vm: this });
    },
    reset() {
      this.$store.state.output = "";
    },
  },

  watch:{
    'read_model':{
      handler(newValue, oldValue) {
        if(this.$store.state.visibles.colab && this.$store.state.visibles.codespace != "null"){
            this.$store.dispatch('internal_colab_clock', this)
        }
      },
    },
    deep: true,
  },


  computed: {
    ...mapGetters(["time", "seed", "cmOption", "codeSpaces", "mode", "visibles"]),

    read_model() {
      return this.$store.getters.codeSpaces[0].code;
    },

    flags: {
      get() {
        return this.$store.state.cxxflags;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "flags", data: value });
      },
    },

    
    buffer: {
      get() {
        return this.$store.state.buffer;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "buffer", data: value });
      },
    },
    output: {
      get() {
        return this.$store.state.output;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "output", data: value });
      },
    },
    temp: {
      get() {
        return this.$store.state.temp;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "temp", data: value });
      },
    },
    
    usecurl: {
      get(){
        return this.$store.state.usecurl;
      },
      set(value) {
        this.$store.commit("superUpdate",{type: "curl", data: value});
      }
    },

    ids: {
      get() {
        return this.$store.state.ids;
      },
      set(value) {
        this.$store.state.ids = value;
      },
    },

    bytheme() {
      return this.$store.getters.bytheme;
    },
    getClassModeName() {
      return this.local_widthMatch ? '.h' : this.local_class_mode_name + this.local_mode;
    }
  },
};
</script>

<style scoped>

.cnbase {
  min-height: 100vh;
 
}
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
.files {
  margin-top: 5px;
  margin-bottom: 50px;
  margin-left: 20px;
  width: 100%;
  min-height: 28px;
  max-height: 65px;
  border-radius: 4px;
  overflow-y: scroll;
}.tabs {
  width: 10%;
  height: 28px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid white;
  color: white;
}
.classmode {
  width: 13%;
  height: 28px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid white;
  color: white;
}
.configs {
  width: 10%;
  height: 28px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid white;
  color: rgb(255, 255, 255);
  margin-right: 10px;
}
.div-container {
  margin: 0 auto;
  max-width: 1800px;
}
.body-tam {
  height: 550px;
  margin-bottom: 10px;
}
.editor-canva {
  height: 490px;
}
.bt-hover{
  border-color:#839192;
}
.bt-hover:hover{
  background: #A5D6A7;
  color: black;
}
.hovery{
color: #272927;
}
.hovery:hover{
color:#171818;
}
</style>


<style>
input:focus, select:focus, select, input.form-control:focus {
  outline:none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}
pre {
  white-space: pre-wrap;
  margin-left: 0;
  margin: 0;
  padding: 0;
}
.noneshine {
  outline: none;
  box-shadow: none !important;
}
</style>  