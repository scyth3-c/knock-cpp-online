<template>
  <div class="div-container">
    <b-card :class="bytheme" class=" mb-3 shadow-lg cnbase">
      
      <b-modal id="options" hide-footer>
        <b-container class="d-inline">
        <b-form-select
          class="text-center mt-1 text-dark col-sm-3 font-weight-bold"
          v-model="standar"
        
          title="el estandar con el que se compilara c++"
        >
          <b-form-select-option value="c++11">c++11</b-form-select-option>
          <b-form-select-option value="c++17">c++17</b-form-select-option>
          <b-form-select-option value="c++14">c++14</b-form-select-option>
          <b-form-select-option value="c++2a">c++2a</b-form-select-option>
        </b-form-select>
        <b-form-select
         variant="primary"
          class="ml-3 mt-1 text-dark col-sm-2 font-weight-bold"
          v-model="optimizar"
          title="el nivel de optimizacion a la hora de compilar, esto se vera en el codigo ensamblador"
        >
          <b-form-select-option value="1">O1</b-form-select-option>
          <b-form-select-option value="2">O2</b-form-select-option>
          <b-form-select-option value="3">O3</b-form-select-option>
        </b-form-select>
        <b-button
          :disabled="usecurl == 'on'"
          title="descarga el codigo assembly generado del codigo c++"
          @click="getAssembly"
          class="mt-1 ml-3 bg-transparent text-dark"
          >.asm</b-button
        >
        <b-button
          title="descarga el codigo escrito"
          @click="download"
          class="mt-1 ml-2 bg-transparent text-dark"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
        </b-button>
          
        <b-button v-b-modal.share-link title="share" @click="share" class="mt-1 ml-1 bg-transparent text-primary">
          <b-icon icon="share-fill"></b-icon>
        </b-button>

      </b-container>  

      </b-modal>
      
      <b-modal hide-footer id="program-input">
          <inputData />
        </b-modal>

        <b-modal hide-footer id="headers">
          <headers />
        </b-modal>

      <b-modal title="Compartir" id="share-link" hide-footer>
         <b-icon icon="share-fill" class="text-primary" ></b-icon> 

         <span class="text-dark font-weight-bolder ml-2 mb-"> Comparte este codigo usando este enlace</span> <br/> <br/>
         <a :href="shared_path()">{{shared_path()}}</a> <b-icon scale="1.3" class="ml-1 hovery"  @click="copy(shared_path())"  icon="files"></b-icon>      </b-modal>
      
        <b-modal hide-footer   id="flags-modal" title="flags">
          <b-badge class="mb-1 bg-transparent text-dark"
            >e.g  &nbsp; -Wall -pedantic</b-badge
          >
         <b-input placeholder="-some" class="mb-4" v-model="flags"></b-input>
        </b-modal>

      <b-modal hide-footer id="extra-modal" title="addons">
          <b-button
            v-b-modal.notas-modal
            title="mostrar panel de  notas"
            variant="dark"
            >Notas</b-button
          >
          <b-modal id="notas-modal" hide-footer>
            <notas />
          </b-modal>

          <b-button
            title="mostrar lista de themas"
            class="ml-1"
            v-b-modal.themes-modal
            variant="dark"
            >themes</b-button
          >
          <b-modal id="themes-modal">
            <themes />
          </b-modal>

            <b-form-checkbox
             class="ml-3 mt-2 p-3 "
            id="curlmode"
            v-model="usecurl"
            name="curlmode"
            value="on"
            unchecked-value="off"> enable libcurl <b-icon icon="cloud"></b-icon>  </b-form-checkbox>
            
        </b-modal>

      <div class="row w-100 body-tam" >
        <div class="rounded col-md-12 shadow-md mt-2 editor-canva">
          <div id="file-list" class="files mb-3">

           <button v-b-modal.options class="configs">
            <b-icon icon="grid-fill"></b-icon>
           </button>

            <button
              title="cambiar a modo de clases"
              @click="changeMode"
              class="classmode mx-1 bt-hover"
  
            >
              {{getClassModeName}}
            </button>

            <button
              title="tab home"
              id="tab_id0"
              @click="setSpace({ id: 'tab_id0' })"
              class="tabs mx-1 bt-hover"
            >
              <b-icon icon="house" ></b-icon>
            </button>

            <button
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
          flags
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
       
       <b-modal id="output-modal" hide-footer>
        <b-card
          class="w-100 mt-2"
          style="
            background: rgba(0, 0, 0, 0);
            max-height: 400px;
            min-height: 160px;
            overflow-y: auto;
            border: none;
           "
        >
          <b-badge variant="danger" class="text-white"
            >salida:
            <b-icon icon="receipt-cutoff" variant="white"></b-icon>
          </b-badge>
          <br />
          <span class="text-dark" style="font-family: monospace">
            {{ output }}
          </span>
        </b-card> 
       </b-modal>

      </div>
      <b-button
        title="establer entrada del programa"
        v-b-modal.program-input
        variant="primary"
        style="background: rgba(0, 0, 0, 0)"
        class="ml-1 float-right mt-1"
        >entrada <b-icon icon="input-cursor-text"></b-icon>
      </b-button>
      <b-button
        id="establercer las librerias en el modo clasess"
        v-b-modal.headers
        class="float-right mt-1 ml-2"
        variant="secondary"
        style="background: rgba(0, 0, 0, 0)"
        v-if="mode"
        >#include</b-button
      >
      <b-button
        title="compilar"
        @click="compile"
        variant="success"
        style="background: rgba(0, 0, 0, 0)"
        class="ml-1 float-right mt-1"
        v-b-modal.output-modal
        >compilar</b-button
      >
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
import notas from "./extra/notas.vue";
import themes from "./extra/themes.vue";
import inputData from "./extra/program-input.vue";
import Editor from "./editor.vue";
import headers from "./extra/headers.vue";

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
    notas,
    themes,
    inputData,
    codemirror,
    Editor,
    headers,
  },

  created() {
    this.charge();
    this.$root.$on("Theme", () => {
      this.$forceUpdate();
    });
  },
  beforeMount(){
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const Search_Query = params.get('sq');
    if(Search_Query){
      this.$store.dispatch("extract_notecode", Search_Query)
    }
  },
  mounted() {
    this.local_widthQuery.addEventListener('change',()=>{
    this.local_widthMatch = this.local_widthQuery.matches;
    });
    
  },

  data(){
    const local_widthQuery = matchMedia("(min-width: 300px) and (max-width:  991px )") 
   return {
    local_class_mode_name: 'POO ',
    local_mode: 'off',
    local_widthQuery: local_widthQuery,
    local_widthMatch: local_widthQuery.matches
   }
  },

  methods: {

    copy(value) {
      navigator.clipboard.writeText(value);
    },

    shared_path(){
      return window.location.origin + "?sq=" + this.share_id
    },

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

    charge() {
      this.$store.commit("charge");
    },

    compile() {
      this.$store.dispatch("compile", { vm: this });
    },
    state() {
      this.$store.commit("charge");
    },

    download() {
      this.$store.dispatch("download");
    },
     share(){
      this.$store.dispatch("share");
     },

    getAssembly() {
      this.$store.dispatch("getAssembly");
    },
    reset() {
      this.$store.state.output = "";
    },
  },

  computed: {
    ...mapGetters(["time", "seed", "cmOption", "codeSpaces", "mode"]),

    share_id:{
      get(){
       return this.$store.state.share_id
      },
      set(value){
        this.$store.state.share_id = value
      }
    },
    flags: {
      get() {
        return this.$store.state.cxxflags;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "flags", data: value });
      },
    },

    standar: {
      get() {
        return this.$store.state.standar;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "standar", data: value });
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
    optimizar: {
      get() {
        return this.$store.state.optimizar;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "optimizar", data: value });
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
}
.tabs {
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
color: #A5D6A7;
}
.hovery:hover{
color:#839192;
}

</style>