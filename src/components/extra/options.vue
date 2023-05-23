<template>
  <b-container class="d-inline">
    <!-- las opciones -->
    <b-form-select
      class="text-center mt-1 text-dark col-sm-3 font-weight-bold noneshine"
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
      class="ml-3 mt-1 text-dark col-sm-2 font-weight-bold noneshine"
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

    <b-button
      v-b-modal.share-link
      title="share"
      @click="share"
      class="mt-1 ml-1 bg-transparent text-primary"
    >
      <b-icon icon="share-fill"></b-icon>
    </b-button>
    
    <!-- panel de compartir -->
    <b-modal title="Compartir" id="share-link" hide-footer hide-header>
        <p style="cursor:pointer" @click="$bvModal.hide('share-link')">X</p>
       <share/>
    </b-modal>

  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import share from "./share.vue"

export default {
  name: "optionsVue",

  components:{
    share
  },

  methods: {
    download() {
      this.$store.dispatch("download");
    },
    share() {
      this.$store.dispatch("share");
    },

    getAssembly() {
      this.$store.dispatch("getAssembly");
    },
  },

  computed: {
    ...mapGetters["visibles"],
    standar: {
      get() {
        return this.$store.state.standar;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "standar", data: value });
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
      get() {
        return this.$store.state.usecurl;
      },
      set(value) {
        this.$store.commit("superUpdate", { type: "curl", data: value });
      },
    },
  },
};
</script>
