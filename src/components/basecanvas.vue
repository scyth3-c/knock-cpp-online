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
      <b-button @click="compile" variant="success" class="float-right mt-1"
        >compilar</b-button
      >
    </b-card>
  </b-container>
</template>

<script>

import notas from './extra/notas.vue'

export default {
  name: "basecanvas",
  components: {
    notas
  },
  data() {
    return {
      standar: "c++11",
      code: "",
      buffer: "1",
      output: "",
      temp: "",
      optimizar: '1',
      time: {
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds(),
      },
      seed: Math.floor(Math.random()*(89985 - 10)) + 10
    };
  },
  created() {
    this.charge();
  },
  methods: {
    async compile() {
      if (this.code == this.buffer) {
        return (this.output = "> ya compilado, reultado: " + this.temp);
      } else if (this.code.includes("system(")) {
        return (this.output = ">  oye no deberias usar system() aqui");
      } else if (this.code == "" || this.code == " ") {
        return (this.output =
          "> no puedo compilar codigo si no hay codigo, ¿verdad?");
      } else {
        this.output = "compilado...";
        this.buffer = this.code;
        const res = await this.axios.post(
          `${this.GLOBAL.API}addon/compile`,
          this.code,
          {
            headers: {
              "Content-Type": "text/plain",
              title: `temp_file_${this.seed}_${(this.time.hour,
              this.time.min,
              this.time.sec)}`,
              standar: this.standar,
              "o": this.optimizar
            },
          }
        );
        this.temp = res.data.split("/knockapi/src/c++/temp/temp_");
        this.output = "> " + res.data.split("/knockapi/src/c++/temp/temp_");
        return res.data;
      }
    },
    async charge() {
      await this.axios(`${this.GLOBAL.API}addon`);
    },
    async download() {
      
      if(this.code === "" || this.code === " "){
       return this.output = "> codigo vacio! (empty)";
      } 
        await this.axios.post(`${this.GLOBAL.API}addon/download`, this.code, {headers: {"Content-Type": "text/plain",  title: `temp_file_${this.seed}_${(this.time.hour,
       this.time.min,
       this.time.sec)}`}})
     .then(async(res)=>{
       this.onDownload(res, "main.cpp");
     }).catch(err=>{
      console.log(err);
     })
     
    },
     async getAssembly() {
     await this.axios.post( `${this.GLOBAL.API}addon/assembly`,
          this.code,
          {
            headers: {
              "Content-Type": "text/plain",
              title: `temp_file_${this.seed}_${(this.time.hour,
              this.time.min,
              this.time.sec)}`,
              standar: this.standar,
              "o": this.optimizar
            },
          })
     .then(async(result)=>{
   
         this.onDownload(result,"assembly");
    
     }).catch(err=>{
      console.log(err);
     })
    },
    onDownload(file, name) {
      const url = window.URL.createObjectURL(new Blob([file.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      link.click();
    },
   
  },
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
