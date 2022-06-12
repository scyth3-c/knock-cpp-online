import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //base
    API: "https://radiant-dusk-88409.herokuapp.com/",
    paypal: "https://www.paypal.com/paypalme/bohorquezrojas17",
    github: "https://github.com/scyth3-c",

    standar: "c++11",
    code: `#include <iostream>

int main() {
     
      
  
return 0;
}`,
    buffer: "1",
    output: "",
    temp: "",
    optimizar: 1,
    inputData: "",
   
     // extra flags

     cxxflags: "",


    // extra: notes
    notes: [],
    nombre: "",
    init: false,
    identity: localStorage.getItem("inited"),
    outputNote: {
      nombre: "",
      conten: "",
    },
    nuevaNota: {
      nombre: "",
      conten: "",
      author: localStorage.getItem("inited"),
    },
    cmOption: {
      lineNumbers: true,
      keyMap: "sublime",
      mode: 'text/x-csrc',
      theme: localStorage.getItem('theme') || "yonce",
    },
    bytheme: 'yonce',
    //readonly
    time: {
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds(),
    },
    seed: Math.floor(Math.random() * (89985 - 10)) + 10,

    noteSeed: Math.random() * 100 + new Date().getSeconds(),
    field: ["nombre"],
  },
  mutations: {
    superUpdate(state, payload) {
      switch (payload.type) {
        case "standar":
          state.standar = payload.data;
          break;
        case "code":
          state.code = payload.data;
          break;
        case "buffer":
          state.buffer = payload.data;
          break;
        case "output":
          state.output = payload.data;
          break;
        case "temp":
          state.temp = payload.data;
          break;
        case "optimizar":
          state.optimizar = payload.data;
          break;
        case "flags": 
          if(payload.data.includes("-")) {
          state.cxxflags = payload.data;
          } else {
            state.cxxflags = "";
          }
        break;
      }
    },

    superNoteUpdate(state, payload) {
      switch (payload.type) {
        case "nuevaNota":
          state.nuevaNota = payload.data;
          break;
        case "outputNote":
          state.outputNote = payload.data;
          break;
        case "identity":
          state.identity = payload.data;
          break;
        case "notes":
          state.notes = payload.data;
          break;
        case "init":
          state.init = payload.data;
          break;
        case "nombre":
          state.nombre = payload.data;
          break;
      }
    },

    async compile(state, vm) {
      if (state.code == state.buffer) {
        return (state.output = "> ya compilado, resultado: " + state.temp);
      } else if (state.code == "" || state.code == " ") {
        return (state.output =
          "> no puedo compilar codigo si no hay codigo, ¿verdad?");
      } else if(state.code.includes("cin") && state.inputData == "" || state.code.includes("getline") && state.inputData == "" || state.code.includes("&ostream") && state.inputData == ""){
        vm.$bvModal.show("program-input");
      } 
      else {
        state.output = "compilando...";
        state.buffer = state.code;
        const res = await axios.post(`${state.API}addon/compile`, state.code, {
          headers: {
            "Content-Type": "text/plain",
            title: `temp_file_${state.seed}_${(state.time.hour,
            state.time.min,
            state.time.sec)}`,
            standar: state.standar,
            o: state.optimizar,
            flags: state.cxxflags,
            data: state.inputData
          },
        });
        state.temp = res.data;
        state.output = "> " + res.data;
        return res.data;
      }
    },

    async charge(state) {
      await axios(`${state.API}addon`);
    },

    async download(state) {
      if (state.code === "" || state.code === " ") {
        return (state.code = "> codigo vacio! (empty)");
      }
      await axios
        .post(`${state.API}addon/download`, state.code, {
          headers: {
            "Content-Type": "text/plain",
            title: `temp_file_${state.seed}_${(state.time.hour,
            state.time.min,
            state.time.sec)}`,
          },
        })
        .then(async (res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "main.cpp");
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getAssembly(state) {
      await axios
        .post(`${state.API}addon/assembly`, state.code, {
          headers: {
            "Content-Type": "text/plain",
            title: `temp_file_${state.seed}_${(state.time.hour,
            state.time.min,
            state.time.sec)}`,
            standar: state.standar,
            o: state.optimizar,
          },
        })
        .then(async (result) => {
          const url = window.URL.createObjectURL(new Blob([result.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "assembly.asm");
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    saveme(state) {
      if (state.nombre != "") {
        const notesSeed = state.nombre + state.seed;
        localStorage.setItem("inited", notesSeed);
      }
    },
    async chargeNotes(state) {
      const response = await axios.get(`${state.API}notes/recollector`);
      state.notes = response.data;
    },

    async sendNote(state, vm) {
      if (state.nuevaNota.nombre != "" && state.nuevaNota.conten != "") {
        try {
          await axios({
            method: "POST",
            url: `${state.API}notes/new`,
            data: state.nuevaNota,
          });
          state.nuevaNota.nombre = "";
          state.nuevaNota.conten = "";
          vm.$bvModal.hide("notas-modal");
          vm.$bvModal.show("notas-modal");
        } catch {
          vm.$bvModal.show("error-msg");
        }
      } else {
        vm.$bvModal.show("error-empty");
      }
    },

    async showNote(state, payload) {
      const nota = await axios.get(`${state.API}notes/show?id=${payload.id}`);
      state.outputNote.nombre = nota.data.nombre;
      state.outputNote.conten = nota.data.conten;
      payload.vm.$bvModal.show("notas-show");
    },

    async deleteNote(state, payload) {
      await axios.delete(`${state.API}notes/delete?id=${payload.id}`);
      payload.vm.$bvModal.hide("notas-modal");
      payload.vm.$bvModal.show("notas-modal");
    },

    changeTheme(state,  payload) {
      state.cmOption.theme = payload.data;
      state.bytheme = payload.data;
      payload.vm.$forceUpdate();
    },

    setInputData(state, payload) {
      state.inputData = payload.data;
    }


  },




  actions: {
    saveme({ commit }, { vm }) {
      commit("saveme");
      vm.$bvModal.hide("notas-modal");
      commit("chargeNotes");
    },
  },



  getters: {
    cmOption(state) {
      return state.cmOption;
    },
    theme(state) {
      return state.cmOption.theme;
    },
    time(state) {
      return state.time;
    },
    seed(state) {
      return state.seed;
    },
    noteSeed(state) {
      return state.noteSeed;
    },
    field(state) {
      return state.field;
    },
  }
});
