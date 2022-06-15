<template>
  <b-container>
    <b-card
      :class="bytheme"
      class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
    >
      <b-container style="display: inline">
        <b-form-select
          class="text-center mt-1 text-secondary col-sm-2 font-weight-bold"
          v-model="standar"
          style="background: rgba(0, 0, 0, 0)"
          title="el estandar con el que se compilara c++"
        >
          <b-form-select-option value="c++11">c++11</b-form-select-option>
          <b-form-select-option value="c++17">c++17</b-form-select-option>
          <b-form-select-option value="c++14">c++14</b-form-select-option>
          <b-form-select-option value="c++2a">c++2a</b-form-select-option>
        </b-form-select>
        <b-form-select
          class="ml-3 mt-1 text-center text-secondary col-md-1 font-weight-bold"
          v-model="optimizar"
          style="background: rgba(0, 0, 0, 0)"
          title="el nivel de optimizacion a la hora de compilar, esto se vera en el codigo ensamblador"
        >
          <b-form-select-option value="1">O1</b-form-select-option>
          <b-form-select-option value="2">O2</b-form-select-option>
          <b-form-select-option value="3">O3</b-form-select-option>
        </b-form-select>
        <b-button
          title="descarga el codigo assembly generado del codigo c++"
          @click="getAssembly"
          style="background: rgba(0, 0, 0, 0)"
          class="mt-1 ml-3"
          >.asm</b-button
        >
        <b-button
          title="descarga el codigo escrito"
          @click="download"
          style="background: rgba(0, 0, 0, 0)"
          class="mt-1 ml-2"
        >
          <b-icon icon="file-earmark-arrow-down" variant="white"></b-icon>
        </b-button>

        <b-button
          style="background: rgba(0, 0, 0, 0)"
          class="mt-1 float-right ml-1"
          v-b-modal.flags-modal
          title="banderas de compilacion para c++"
        >
          flags
        </b-button>
        <b-modal id="flags-modal" title="flags">
          <b-badge variant="dark" class="mb-1"
            >example: -Wall -pedantic</b-badge
          >
          <b-input v-model="flags"></b-input>
        </b-modal>

        <b-button
          style="background: rgba(0, 0, 0, 0)"
          class="mt-1 float-right ml-auto"
          v-b-modal.extra-modal
          title="muestra el panel de addons extra"
        >
          <b-icon variant="white" icon="puzzle-fill"></b-icon>
        </b-button>
        <b-modal id="extra-modal" title="addons">
          <b-button v-b-modal.notas-modal variant="dark">Notas</b-button>
          <b-modal id="notas-modal" hide-footer>
            <notas />
          </b-modal>

          <b-button class="ml-1" v-b-modal.themes-modal variant="dark"
            >themes</b-button
          >
          <b-modal id="themes-modal">
            <themes />
          </b-modal>
        </b-modal>

        <b-modal id="program-input">
          <inputData />
        </b-modal>

        <b-modal id="headers">
          <headers />
        </b-modal>
      </b-container>

      <div class="row">
        <div class="rounded col-md-12 shadow-md mt-2">
          <div id="file-list" class="files mb-3">
            <button @click="changeMode" class="classmode">class</button>
            <button class="classmode" id="newspace-button" @click="addSpace">
              <b-icon variant="white" icon="file-earmark-plus"></b-icon>
            </button>
            <button
              id="tab_id0"
              @click="setSpace({ id: 'tab_id0' })"
              class="tabs"
            >
              <b-icon icon="house" variant="white"></b-icon>
            </button>
          </div>

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
        <b-card
          class="w-100 mt-2"
          style="
            background: rgba(0, 0, 0, 0);
            max-height: 120px;
            min-height: 120px;
            overflow-y: auto;
            border: none;
          "
        >
          <b-badge variant="danger" class="text-white"
            >salida:
            <b-icon icon="receipt-cutoff" variant="white"></b-icon>
          </b-badge>
          <br />
          <span class="text-white" style="font-family: monospace">
            {{ output }}
          </span>
        </b-card>
      </div>
      <b-button
        v-b-modal.program-input
        variant="primary"
        class="ml-1 float-right mt-1"
        >entrada <b-icon icon="input-cursor-text"></b-icon>
      </b-button>
      <b-button
        v-b-modal.headers
        class="float-right mt-1 ml-2"
        variant="secondary"
        v-if="mode"
        >#include</b-button
      >
      <b-button @click="compile" variant="success" class="ml-1 float-right mt-1"
        >compilar</b-button
      >
      <b-button
        class="float-right mx-auto mt-1 ml-1"
        variant="danger"
        @click="reset"
      >
        <b-icon icon="arrow-counterclockwise"></b-icon>
      </b-button>
    </b-card>
  </b-container>
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

  methods: {
    changeMode() {
      this.$store.commit("changeMode");
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

    getAssembly() {
      this.$store.dispatch("getAssembly");
    },
    reset() {
      this.$store.state.output = "";
    },
  },

  computed: {
    ...mapGetters(["time", "seed", "cmOption", "codeSpaces", "mode"]),

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

    ids: {
      get() {
        return this.$store.state.ids;
      },
      set(value) {
        this.$store.state.ids = value;
      },
    },

    bytheme() {
      return this.$store.state.bytheme;
    },
  },
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

.files {
  margin-top: 5px;
  margin-bottom: 50px;
  margin-left: 20px;
  width: 100%;
  height: 28px;
  border-radius: 4px;
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
  width: 4%;
  height: 28px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid white;
  color: white;
  margin-right: 10px;
}
</style>
