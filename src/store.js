import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Editor from "./components/editor.vue";
import Tab from "./components/extra/tabbar.vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //base
    API: "https://lobster-app-tadp5.ondigitalocean.app/",
    paypal: "https://www.paypal.com/paypalme/bohorquezrojas17",
    github: "https://github.com/scyth3-c",

    actualCodeSpace: 0,
    standar: "c++17",
    buffer: "1",
    output: "",
    temp: "",
    optimizar: 1,
    inputData: "",
    mode: 0,
    code_build: "",
    direct_msg: "",

    headers: "iostream string",
    usecurl: "off",
    isSocketActive: false,
    visibles: {
      options: JSON.parse(localStorage.getItem("v.options")) == undefined ? true : JSON.parse(localStorage.getItem("v.options")) ,
      addons: JSON.parse(localStorage.getItem("v.addons")) == undefined ? true : JSON.parse(localStorage.getItem("v.addons")),
      poo: JSON.parse(localStorage.getItem("v.poo")) == undefined ? true : JSON.parse(localStorage.getItem("v.poo")),
      tabs:  JSON.parse(localStorage.getItem("v.tabs")) == undefined ? true : JSON.parse(localStorage.getItem("v.tabs")),
      libcurl: JSON.parse(localStorage.getItem("v.libcurl"))== undefined ? true : JSON.parse(localStorage.getItem("v.libcurl")),
      colab: JSON.parse(localStorage.getItem("v.colab"))== undefined ? false : JSON.parse(localStorage.getItem("v.colab")),
      codespace: localStorage.getItem("v.codespace") == undefined ? "null" : localStorage.getItem("v.codespace")
    },


    templates: [
      {
        code: `#include <iostream>

int main(int argc, char *argv[]) {

  std::cout << "hola mundo";

  return 0;
}        `,
        files: `#include <iostream>

int main(int argc, char *argv[]) {

  std::cout << "hola mundo ";

  return 0;
}
      `,
      },

      {
        code: `int main(int argc, char *argv[]) {

  //nosotros  nos encargamos de las librerias
  
  return 0;
}`,

        files: `class MyClass {
  private:
    int foo{};
  public:
    MyClass(int _foo) : foo(std::move(_foo)) {}
};
`,
      },
    ],

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

    //editor
    codeSpaces: [
      {
        id: 0,
        visible: true,
        code: `#include <iostream>
int main() {
    
 std::cout << "hola mundo";

  return 0;
}`,
        deleted: false,
      },
    ],

    saveThis: this,
    baseCanvasthis: this,
    ids: 0,
    cmOption: {
      lineWrapping: true,
      lineWrapping: true,
      autofocus: true,
      lineNumbers: true,
      smartIndent: true,
      indentUnit: 2,
      styleActiveLine: true,
      keyMap: "sublime",
      mode: "text/x-c++src",
      theme: localStorage.getItem("theme") || "yonce",
    },
    bytheme: "yonce",
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
    /**
     * It's a switch statement that takes a payload and a type, and depending on the type, it assigns
     * the payload to a variable.
     * @param state - The state object
     * @param payload - {
     */
    superUpdate(state, payload) {
      switch (payload.type) {
        case "standar":
          state.standar = payload.data;
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
        case "curl":
          state.usecurl = payload.data;
          break;
        case "flags":
          if (payload.data.includes("-")) {
            state.cxxflags = payload.data;
          } else {
            state.cxxflags = "";
          }
          break;
      }
    },

    /**
     * It's a function that takes two parameters, state and payload, and then it uses a switch statement
     * to update the state based on the payload.type.
     * @param state - the state of the store
     * @param payload - {type: "nuevaNota", data: "nuevaNota"}
     */
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

    /**
     * It sends a POST request to a server with the source code, and the server compiles it and returns
     * the output.
     * </code>
     * @param state - is the vuex state
     * @param source_code - the code to be compiled
     * @returns The return value is the response data from the server.
     */

    async compileCore(state, source_code) {
      const res = await axios.post(`${state.API}addon/compile`, source_code, {
        headers: {
          "Content-Type": "text/plain",
          title: `temp_file_${state.seed}_${
            (state.time.hour, state.time.min, state.time.sec)
          }`,
          standar: state.standar,
          o: state.optimizar,
          flags: state.cxxflags,
          data: state.inputData,
          curl: state.usecurl
        },
      });
      state.temp = res.data;
      state.output = "> " + res.data;
      return res.data;
    },

    /**
     * It sends a POST request to the server with the source code, and then the server returns a file
     * with the assembly code.
     * </code>
     * @param state - is the state of the vuex store
     * @param source_code - the code that the user writes in the editor
     */
    async assemblyCore(state, source_code) {
      await axios
        .post(`${state.API}addon/assembly`, source_code, {
          headers: {
            "Content-Type": "text/plain",
            title: `temp_file_${state.seed}_${
              (state.time.hour, state.time.min, state.time.sec)
            }`,
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

    /**
     * The function charge() is an asynchronous function that uses the axios library to make a GET
     * request to the API endpoint specified in the state object.
     * @param state - The state object of the Vuex store.
     */
    async charge(state) {
      await axios(`${state.API}addon`);
    },

    /**
     * It sends a POST request to the server with the code as the body, and the server returns a file
     * with the code inside.
     * </code>
     * @param state - the state of the vuex store
     * @returns The code is being returned.
     */
    async downloadCore(state, source_code) {
      await axios
        .post(`${state.API}addon/download`, source_code, {
          headers: {
            "Content-Type": "text/plain",
            title: `temp_file_${state.seed}_${
              (state.time.hour, state.time.min, state.time.sec)
            }`,
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

    /**
     * It sends a POST request to the server with the code, and the server returns a file with the
     * assembly code.
     * </code>
     * @param state - the state of the vuex store
     */

    /**
     * If the state.nombre is not empty, then the notesSeed is set to the state.nombre plus the
     * state.seed. Then the localStorage is set to the inited value of the notesSeed.
     * @param state - the state object
     */
    saveme(state) {
      if (state.nombre != "") {
        const notesSeed = state.nombre + state.seed;
        localStorage.setItem("inited", notesSeed);
      }
    },

    /**
     * It's an async function that uses axios to get data from an API and then sets the state of the
     * notes property to the data returned from the API.
     * @param state - The state object
     */
    async chargeNotes(state) {
      const response = await axios.get(`${state.API}notes/recollector`);
      state.notes = response.data;
    },

    /**
     * It sends a POST request to the server with the data from the state.nuevaNota object.
     * </code>
     * @param state - The state object
     * @param vm - is the Vue instance
     */
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

    /**
     * It gets a note from the database and then shows it in a modal.
     * @param state - The Vuex state object.
     * @param payload - {
     */
    async showNote(state, payload) {
      const nota = await axios.get(`${state.API}notes/show?id=${payload.id}`);
      state.outputNote.nombre = nota.data.nombre;
      state.outputNote.conten = nota.data.conten;
      payload.vm.$bvModal.show("notas-show");
    },

    /**
     * I'm trying to delete a note from the database and then refresh the modal that contains the list
     * of notes.
     * </code>
     * @param state - The state object
     * @param payload - {
     */
    async deleteNote(state, payload) {
      await axios.delete(`${state.API}notes/delete?id=${payload.id}`);
      payload.vm.$bvModal.hide("notas-modal");
      payload.vm.$bvModal.show("notas-modal");
    },

    /**
     * ChangeTheme(state, payload) {
     *       state.cmOption.theme = payload.data;
     *       state.bytheme = payload.data;
     *       payload.vm.();
     *     }
     * </code>
     * @param state - the state object
     * @param payload - {
     */
    changeTheme(state, payload) {
      state.cmOption.theme = payload.data;
      state.bytheme = payload.data;
      payload.vm.$forceUpdate();
    },

    /**
     * It takes the state and payload as arguments and sets the state.inputData to the payload.data.
     * @param state - The state object
     * @param payload - The data that is passed to the mutation.
     */
    setInputData(state, payload) {
      state.inputData = payload.data;
    },

    /**
     * It takes the id of the tab clicked, replaces the "tab_id" part of the id with an empty string,
     * then parses the remaining number into an integer. Then it loops through the array of code spaces
     * and sets all of them to invisible. Then it sets the code space with the index of the number
     * parsed from the id to visible. Finally, it sets the actualCodeSpace to the index of the code
     * space that was just set to visible.
     * @param state - the state of the store
     * @param payload - {id: "tab_id0", name: "Tab 1"}
     */
    setSpace(state, payload) {
      let num = payload.id.replace("tab_id", "");
      let it = parseInt(num);
      state.codeSpaces.map((c) => (c.visible = false));
      state.codeSpaces[it].visible = !state.codeSpaces[it].visible;
      state.actualCodeSpace = it;
    },

    /**
     * It adds a new object to the array codeSpaces.
     * @param state - the state object
     */
    addSpaceArray(state) {
      state.codeSpaces.push({
        id: state.ids,
        visible: false,
        code: state.templates[state.mode].files,
        deleted: false,
      });
    },

    /**
     * It creates a new div element, appends it to the DOM, and then mounts a new Vue component to that
     * div.
     * </code>
     * @param state - the state of the vuex store
     * @param id - the id of the editor
     */
    addSpaceEditor(state, id) {
      let files = document.querySelector("#files");

      let space_node = document.createElement("div");
      space_node.id = "file_id" + id;
      files.appendChild(space_node);

      let editorComp = Vue.extend(Editor);
      new editorComp({
        propsData: {
          ids: `editor:${id}`,
          options: state.cmOption,
        },
      }).$mount("#file_id" + id);
    },

    /**
     * It creates a new div element, appends it to the file-list div, and then creates a new Vue
     * component and mounts it to the newly created div.
     * @param state - the state object
     * @param id - the id of the tab
     */
    addTabSpace(state, id) {
      let list = document.querySelector("#file-list");

      let tab_node = document.createElement("div");
      tab_node.id = "tab_id" + id;
      list.appendChild(tab_node);

      let buttonComp = Vue.extend(Tab);
      new buttonComp({
        propsData: {
          id: "tab_id" + state.ids,
        },
      }).$mount("#tab_id" + id);
    },

    /**
     * It deletes a tab and its corresponding editor.
     * @param state - the state of the store
     * @param payload - {
     */
    deleteSpace(state, payload) {
      let id = payload.id;
      let numero = id.replace("tab_id", "");
      let id_editor = "editor:" + parseInt(numero);

      let target = document.getElementById(id);
      let editor = document.getElementById(id_editor);

      if (target) {
        document.getElementById("file-list").removeChild(target);
      }
      if (editor) {
        document.getElementById("files").removeChild(editor);
      }

      state.codeSpaces[parseInt(numero)].deleted = true;
      setTimeout(() => {
        document.querySelector("#tab_id0").click();
      }, 20);
    },

    /**
     * It changes the mode of the editor, and then creates a new space
     * @param state - the state object
     */
    changeMode(state) {
      if (state.mode === 1) state.mode = 0;
      else state.mode = 1;
      state.codeSpaces[0].code = state.templates[state.mode].code;
      setTimeout(() => {
        document.getElementById("newspace-button").click();
      }, 10);
    },

    /**
     * It takes the headers and code from the state and puts them together in a string
     * @param state - the state of the application
     */
    code_builder(state) {
      let splitHeaders = state.headers.split(" ");
      let list = "";

      splitHeaders.forEach(function (H) {
        list += `#include "${H}"\n`;
      });

      let totalCode = "";
      totalCode += list;

      state.codeSpaces.forEach(function (C) {
        if (C.deleted === false && C.id !== 0) {
          totalCode += C.code;
        }
      });
      totalCode += state.codeSpaces[0].code;
      state.code_build = totalCode;
    },

    async sendMsg(state) {
      let data = {
        nombre: "mensaje directo",
        conten: state.direct_msg,
      };
      await axios({
        method: "POST",
        url: `${state.API}notes/new`,
        data: data,
      });
    },

    useVisible(state, payload){
      let target_state = payload.target.split(".")[1] || payload.target
      localStorage.setItem(payload.target, payload.value)
      state.visibles[target_state] = payload.value
    },

    setColabUrl(state){
      if( state.visibles.colab && state.visibles.codespace != "null" && !window.location.origin.includes(state.visibles.codespace)){
        let url = new URL(window.location.href);
        url.searchParams.set('codespace', state.visibles.codespace.toString());
        window.history.replaceState({}, '', url.toString());
      }
    },

   async deleteCodeSpace(state){
      await axios.delete(`${state.API}codespace/delete?id=${state.visibles.codespace}`);
    },

    async codeServerUpdate(state){
      if(state.visibles.codespace != "null" && state.isSocketActive) {
        await axios.put(`${state.API}codespace/update?id=${state.visibles.codespace}`, { 
          code: state.codeSpaces[state.actualCodeSpace].code
        } );
      }
    },  

  },

  actions: {
    /**
     * It compiles the code in the editor
     * @returns The return is the output of the program.
     */
    compile({ state, commit }, { vm }) {
      let code = state.codeSpaces[state.actualCodeSpace].code;
      if (code == state.buffer) {
        return (state.output = "> ya compilado, resultado: " + state.temp);
      } else if (code == "" || code == " ") {
        return (state.output =
          "> no puedo compilar codigo si no hay codigo, ¿verdad?");
      } else if (
        (code.includes("cin") && state.inputData == "") ||
        (code.includes("getline") && state.inputData == "") ||
        (code.includes("&ostream") && state.inputData == "")
      ) {
        vm.$bvModal.show("program-input");
      } else {
        //switch class or no
        if (state.mode === 0) {
          state.output = "compilando...";
          state.buffer = code;
          commit("compileCore", code);
        } else {
          commit("code_builder");
          state.output = "compilando...";
          commit("compileCore", state.code_build);
        }
      }
    },

    codeUpdate({state, commit}, enviroment){
      if(state.isSocketActive && state.visibles.codespace != "null") {
        commit('codeServerUpdate');
        enviroment.$socketio.emit(`UpdateCodeSpace`, {id: state.visibles.codespace})
      }
    },

    socketOn({state, dispatch}, enviroment){
      if(!state.isSocketActive && state.visibles.codespace != "null"){
          enviroment.$socketio.on('GenUpdate',(args)=>{
            console.log(args.id)
            if(args.id == state.visibles.codespace){
              state.isSocketActive = true
              dispatch('extract_codespace')
            }
          });
      }
    },
    
    setColab({commit}, value){
      commit('useVisible', { target: "v.libcurl", value: value  })
      commit('useVisible', { target: "v.tabs", value: value  })
      commit('useVisible', { target: "v.poo", value: value  })
      commit('useVisible', { target: "v.colab", value: !value  })
    },

    async visibles_to_colab({state, dispatch, commit}, value) {
       
        dispatch("setColab", value)

        let codeBase = state.codeSpaces[state.actualCodeSpace].code;
        let query = await axios({
          method: "POST",
          url: `${state.API}codespace/new`,
          data: { code: codeBase, codespace: state.identity, time: new Date().getDate().toString()},
        });

        localStorage.setItem("v.codespace", String(query?.data || undefined) )
        state.visibles.codespace = String(query?.data)
        state.share.codespace = window.location.origin + "?codespace="+query.data
        commit('setColabUrl')
    },

    async extract_codespace({state, commit}, id){
      const nota = await axios.get(`${state.API}codespace/extract?id=${id}`);
        state.codeSpaces[0].code = nota.data.conten
     },

     async share({state,commit}){
      
      let code = state.codeSpaces[state.actualCodeSpace].code;

      if (state.mode === 0) {
        let query = await axios({
          method: "POST",
          url: `${state.API}notes/new`,
          data: {nombre: state.identity, conten: code, author: state.identity },
        });
        state.share_id = query.data
      } else {
        commit("code_builder");
        let data = await axios({
          method: "POST",
          url: `${state.API}notes/new`,
          data: {nombre: "share", conten: state.code_build, author: state.identity },
        });
        state.share_id = data.data
      }

     }, 

     async extract_notecode({state,commit}, id){
      const nota = await axios.get(`${state.API}notes/show?id=${id}`);
        state.codeSpaces[0].code = nota.data.conten
     },

    /**
     * It gets the code from the code space and assembles it
     */
    getAssembly({ state, commit }) {
      let code = state.codeSpaces[state.actualCodeSpace].code;

      if (state.mode === 0) {
        commit("assemblyCore", code);
      } else {
        commit("code_builder");
        commit("assemblyCore", state.code_build);
      }
    },

    /**
     * It downloads the code from the editor.
     */
    download({ state, commit }) {
      let code = state.codeSpaces[state.actualCodeSpace].code;

      if (state.mode === 0) {
        commit("downloadCore", code);
      } else {
        commit("code_builder");
        commit("downloadCore", state.code_build);
      }
    },

    /**
     * I'm trying to close a modal after a user clicks a button.
     * </code>
     */
    saveme({ commit }, { vm }) {
      commit("saveme");
      vm.$bvModal.hide("notas-modal");
      commit("chargeNotes");
    },

    /**
     * I'm trying to save the vue instance of the component that called the function.
     * </code>
     */
    newSpace({ commit, state }, { vm }) {
      state.ids = state.ids + 1;
      let id = state.ids;
      commit("addTabSpace", id);
      commit("addSpaceArray", id);
      commit("addSpaceEditor", id);
      state.saveThis = vm;
    },
  },

  /*
    getters
  */

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
    codeSpaces(state) {
      return state.codeSpaces;
    },
    mode(state) {
      return state.mode;
    },
    bytheme(state){
      return state.bytheme;
    }
  },
});