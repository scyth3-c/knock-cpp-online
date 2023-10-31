<template>
  <b-container class="d-inline">
    <!-- las opciones -->
    <b-form-select
      class="text-center mt-1 text-dark col-sm-3 font-weight-bold noneshine"
      v-model="standar"
      title="el estandar con el que se compilara c++"
    >
      <b-form-select-option v-for="(estandar, index) in estandares" :key="index" :value="estandar.value">{{estandar.name}}</b-form-select-option>

    </b-form-select>
    <b-form-select
      variant="primary"
      class="ml-3 mt-1 text-dark col-sm-2 font-weight-bold noneshine"
      v-model="optimizar"
      title="el nivel de optimizacion a la hora de compilar, esto se vera en el codigo ensamblador"
    >
      <b-form-select-option v-for="(nivel, index) in niveles" :key="index" :value="nivel">O{{nivel}}</b-form-select-option>
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
import { mapState} from "vuex";
import share from "./share.vue"

export default {
  name: "optionsVue",

  components:{
    share
  },

  methods: {
    download() {
      this.$store.dispatch("compile/download", this);
    },
    share() {
      this.$store.dispatch("codespaces/share");
    },

    getAssembly() {
      this.$store.dispatch("compile/getAssembly", this);
    },
  },

  computed: {
    ...mapState('compile', ["estandares", "niveles"]),

    standar: {
      get() {
        return this.$store.state.compile.compile.standar;
      },
      set(value) {
        this.$store.state.compile.compile.standar = value;
      },
    },
    optimizar: {
      get() {
        return this.$store.state.compile.compile.optimizar;
      },
      set(value) {
        this.$store.state.compile.compile.optimizar = value;
      },
    },
    usecurl: {
      get() {
        return this.$store.state.compile.usecurl;
      },
      set(value) {
        this.$store.state.compile.usecurl = value
      },
    },
  },
};
</script>
