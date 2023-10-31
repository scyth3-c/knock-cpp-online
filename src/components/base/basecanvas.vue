<template>

  <div class="div-container"  >
    <b-card id="panel" class="mb-3 smglass">

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
      <b-modal hide-footer id="headers" hide-header>
        <p style="cursor:pointer" @click="$bvModal.hide('headers')">X</p>
        <headers :ctx="this.$store.state.compile" />
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
        <div class="rounded col-md-12 shadow-md mt-2">
          <div id="file-list" class="files mb-3">

           <button v-b-modal.options class="configs">
            <b-icon icon="grid-fill"></b-icon>
           </button>

           <b-badge  v-if="cVisibles.colab" class="text-white" variant="transparent">Modo colaboracion <b-icon icon="emoji-smile" variant="white"></b-icon></b-badge>

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
          :disabled="usecurl === 'on'"
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


          <div class="row c-editor">

            <div id="files" class="col-md-6 ">
              <codemirror
                :id="codeSpaces[0].id"
                v-if="codeSpaces[0].visible"
                v-model="codeSpaces[0].code"
                :options="cmOption"
              />
            </div>

            <div id="asms" class="col-md-6 asm" disabled="true">
              <codemirror
                  :id="codeSpaces[0].id"
                  v-if="codeSpaces[0].visibleAsm"
                  v-model="codeSpaces[0].asm"
                  :options="cmOptionAsm"
              />
            </div>
          </div>

          <div class="col mx-auto float-right botones">
            <!-- definir entrada de usuario  -->
            <b-button
                title="establer entrada del programa"
                v-b-modal.program-input
                variant="primary"
                style="background: rgb(3,3,10)"
                class="ml-1 float-right mt-1 act-btn"
            >entrada <b-icon icon="input-cursor-text"></b-icon>
            </b-button>

            <!-- entrada de linrerias -->
            <b-button
                title="establercer las librerias en el modo clasess"
                v-b-modal.headers
                class="float-right mt-1 ml-2 act-btn"
                variant="secondary"
                style="background: rgb(3,3,10)"
                v-if="mode"
            >#include</b-button
            >

            <!-- boton de compilar el codigo -->
            <b-button
                title="compilar"
                @click="compile"
                variant="success"
                style="background: rgb(3,3,10)"
                class="ml-1 float-right mt-1 act-btn"
                v-b-modal.output-modal
            >compilar</b-button
            >

            <!-- reiniciar resultado de salida  -->
            <b-button
                title="resetear la salida"
                class="float-right mx-auto mt-1 ml-1 act-btn"
                style="background: rgb(3,3,10)"
                variant="danger"
                @click="reset"
            >
              <b-icon icon="arrow-counterclockwise"></b-icon>
            </b-button>


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

    </b-card>
  </div>
</template>
<script>

import inputData from "@/components/modales/program-input.vue";
import Editor from "@/components/modales/editor.vue";
import headers from "@/components/modales/headers.vue";
import complementos from "@/components/modales/complementos.vue";

import options from "@/components/modales/options.vue";

import {mapActions, mapState} from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/mode/clike/clike.js";
import "codemirror/keymap/sublime.js";
import axios from "axios";

export default {
  name: "basecanvas",
  components: {
    inputData, codemirror,
    Editor, headers,
    options, complementos
  },

  async beforeCreate() {
    let API = this.$store.state.base.API;
    let query = await axios.get(`${API}options`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    if(query !== undefined) {
      let data = query.data.data;
      if (data){
        this.$store.state.base.themes = data?.find((z)=> z.name === "themes").values || [];
        this.$store.state.compile.compile =  data?.find((z)=> z.name === "initPackages").values.find((x)=>x.name === "compile").value;
        this.$store.state.compile.estandares = data?.find((z)=>z.name === "standars").values;
        this.$store.state.compile.niveles = data?.find((z)=> z.name === "levels").values;
      }
    }
    this.$forceUpdate();
    this.$store.dispatch('compile/reagentAssembly',this);
  },

  beforeMount(){
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const Search_Query = params.get('sq');

    if(Search_Query){
      this.$store.dispatch("codespaces/extract_notecode", Search_Query)
    }

    const codespace = params.get('codespace');

    if(this.vColab && codespace){
      this.vCodespaces = codespace

      this.setColab(false)
      this.extract_codespace(codespace)
      this.toColabClient(codespace)
      this.socketOn(this)
    }

    if(codespace && this.vCodespaces === "null"){
      this.vCodespaces = codespace.toString()
      this.setColab(false)
      this.extract_codespace(codespace)
      this.socketOn(this)
    }
  },
  mounted() {
    this.local_widthQuery.addEventListener('change',()=>{
    this.local_widthMatch = this.local_widthQuery.matches;
    });
    this.$store.commit("codespaces/setColabUrl");
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

    ...mapActions('codespaces', ['setColab', 'extract_codespace', 'socketOn', 'toColabClient' ]),

    changeMode() {
      this.$store.commit("codespaces/changeMode");
      this.local_mode = this.$store.state.codespaces.mode ? 'On' : 'Off';
    },
    setSpace(value) {
      this.$store.commit("codespaces/setSpace", value);
    },
    addSpace() {
      this.$store.dispatch("codespaces/newSpace", { vm: this });
    },
    compile() {
      this.$store.dispatch("compile/compile", { vm: this, code: this.codeSpaces[this.actualCodeSpace].code });
    },
    reset() {
      this.$store.state.compile.output = "";
    }
  },

  watch:{
    'read_model':{
      handler() {
       if(this.vColab && this.vCodespaces !== "null"){
            this.$store.dispatch('codespaces/internal_colab_clock', this)
        }
      },
    },
    'total_model': {
      handler() {
        this.$store.dispatch('codespaces/internal_global_clock', this)
      }
    },
    deep: true,
  },

  computed: {
    ...mapState( 'codespaces', ["cmOption", "cmOptionAsm", "codeSpaces", "mode", "actualCodeSpace"]),
    ...mapState('base', ["time", "seed", "visibles"]),

    ...mapState('codespaces', {
      read_model: state => state.codeSpaces[0].code,
      total_model: state => state.codeSpaces[state.actualCodeSpace].code,
      vColab: state => state.visibles.colab,
      ids: state => state.ids,
      cVisibles: state => state.visibles
    }),

    ...mapState('compile', {
      buffer: state => state.compile?.buffer,
      output: state => state.compile?.output,
      temp: state => state.compile?.temp,
      usecurl: state => state?.usecurl
    }),

    flags: { get(){ return this.$store.state.compile.compile?.cxxflags; }, set(value) { this.$store.state.compile.compile.cxxflags = value;}},
    vCodespaces: { get() { return  this.$store.state.codespaces.visibles.codespace; }, set(value) { this.$store.state.codespaces.visibles.codespace = value; }},
    headersFlag: { get() { return this.$store.state.compile.compile.headers; }, set(value) { this.$store.state.compile.compile.headers = value; } },

    getClassModeName() {
      return this.local_widthMatch ? '.h' : this.local_class_mode_name + this.local_mode;
    }
  },
};
</script>

<style scoped>
 @import "@/assets/basecanvas.scoped.css";
</style>

<style>
@import "@/assets/basecanvas.unscoped.css";
</style>