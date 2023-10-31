import Vue from "vue";
import Editor from "@/components/modales/editor.vue";
import Tab from "@/components/modales/tabbar.vue";
import axios from "axios";
import static_base from "./base"
import plantillas from "@/components/modales/plantillas/plantillas.json"
const state = () => ({

    API: static_base.state().API,
    mode: 0,
    ids: 0,
    actualCodeSpace: 0,
    CallEnv: null,
    isSocketActive: false,
    share_id: "",
    isInputValid: true,
    timer: null,
    globalTimer: null,
    fastGlobalTimer: null,
    emisor: false,
    asmPanel:
        ! localStorage.getItem("asmPanel")
        ? true
        : JSON.parse(localStorage.getItem("asmPanel")),

    share: {
        buffer: "",
        codespace: "",
    },

    cmOption: {
        lineWrapping: true,
        autofocus: true,
        lineNumbers: true,
        smartIndent: true,
        indentUnit: 2,
        styleActiveLine: true,
        keyMap: "sublime",
        mode: "text/x-c++src",
        theme: localStorage.getItem("theme") || "moxer"
    },
    cmOptionAsm: {
        lineNumbers:true,
        smartIndent: true,
        indentUnit: 1,
        theme: localStorage.getItem("theme") || "moxer"
    },

    visibles: {
        colab:
                ! localStorage.getItem("v.colab")
                ? false
                : JSON.parse(localStorage.getItem("v.colab")),
        codespace:
                ! localStorage.getItem("v.codespace")
                ? "null"
                : localStorage.getItem("v.codespace"),
    },

    isClient:
            ! localStorage.getItem("o.isClient")
            ? false
            : JSON.parse(localStorage.getItem("o.isClient")),
    isHost:
            ! localStorage.getItem("o.isHost")
            ? false
            : JSON.parse(localStorage.getItem("o.isHost")),

    templates: [ {
            code: plantillas.compile.base_code,
            files: plantillas.compile.base_for_files,
        },
        {
            code: plantillas.compile.poo_base,
            files: plantillas.compile.poo_file,
        },
    ],

    //editor
    codeSpaces: [
        {
            id: 0,
            visible: true,
            code: localStorage.getItem("space.code:0") ? localStorage.getItem("space.code:0") : plantillas.compile.base_code,
            deleted: false,
            asm: localStorage.getItem("space.asm:0") ? localStorage.getItem("space.asm:0") : "",
            visibleAsm: true,
            charged: false,
        },
    ],
});

const mutations = {

    setSpace(state, payload) {
        let num = payload.id.replace("tab_id", "");
        let it= parseInt(num);
        state.codeSpaces.map((c) => (c.visible = false));
        state.codeSpaces[it].visible = !state.codeSpaces[it].visible;
        state.actualCodeSpace = it;

        if (state.codeSpaces[it].charged === false) {
                state.codeSpaces[it].code = localStorage.getItem("space.code:" + it) ?
                localStorage.getItem("space.code:" + it) :
                state.codeSpaces[it].code;
        }

    },


    addSpaceArray(state) {
        state.codeSpaces.push({
            id: state.ids,
            visible: false,
            code: localStorage.getItem("space.code:"+state.ids) ? localStorage.getItem("space.code:"+state.ids) : state.templates[state.mode].files,
            deleted: false,
            asm: localStorage.getItem("space.asm:"+state.ids) ? localStorage.getItem("space.asm:"+state.ids) : "",
            visibleAsm: true,
            charged: false
        });
    },

    addSpaceEditor(state, id) {

        let files = document.querySelector("#files");
        let asms = document.querySelector("#asms");

        let space_node = document.createElement("div");
        let asm_node = document.createElement("div");

        space_node.id = "file_id" + id;
        asm_node.id = "asm_id" + id;

        files.appendChild(space_node);
        asms.appendChild(asm_node);

        let editorComp = Vue.extend(Editor);

        new editorComp({
            propsData: {
                ids: `editor:${id}`,
                codeSpaces:state.codeSpaces,
                options: state.cmOption,
                type: "code"
            },
        }).$mount("#file_id" + id);

        new editorComp({
            propsData: {
                ids: `editor:${id}`,
                codeSpaces: state.codeSpaces,
                options: state.cmOptionAsm,
                type: "asm"
            }
        }).$mount("#asm_id" + id)


    },



    addTabSpace(state, id) {

        let list = document.querySelector("#file-list");

        let tab_node = document.createElement("div");
        tab_node.id = "tab_id" + id;
        list.appendChild(tab_node);

        let buttonComp = Vue.extend(Tab);

        new buttonComp({
            propsData: {
                id: "tab_id" + state.ids,
                ctx: state.CallEnv.vm.$store
            },
        }).$mount("#tab_id" + id);
    },



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


    changeMode(state) {
        if (state.mode === 1) state.mode = 0;
        else state.mode = 1;
        state.codeSpaces[0].code = state.templates[state.mode].code;
        setTimeout(() => {
            document.getElementById("newspace-button").click();
        }, 10);
    },


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

    useVisible(state, payload) {
        let target_state = payload.target.split(".")[1] || payload.target;
        localStorage.setItem(payload.target, payload.value);
        state.visibles[target_state] = payload.value;
    },

    setColabUrl(state) {
        if (
            state.visibles.colab &&
            state.visibles.codespace !== "null" &&
            !window.location.origin.includes(state.visibles.codespace)
        ) {
            let url = new URL(window.location.href);
            url.searchParams.set("codespace", state.visibles.codespace.toString());
            window.history.replaceState({}, "", url.toString());
        }
    },

    clearUrl() {
        let urlObj = new URL(window.location.href);
        urlObj.search = "";
        urlObj.hash = "";
        window.location.replace(urlObj.toString());
    },

    async deleteCodeSpace(state) {
        await axios.delete(
            `${state.API}codespace/delete?id=${state.visibles.codespace}`
        );
    },
    setEnv(state, {vm, call}){
        if (vm !== undefined){
            state.CallEnv = {
                vm: vm, call: call
            }
        }
    },
    changeTheme(state, payload) {
        state.cmOption.theme = payload.data;
        state.bytheme = payload.data;
        localStorage.setItem("theme", payload.data)
        payload.vm.$forceUpdate();
    },
    saveIntoLocal(state){
        if ( localStorage.getItem("space.code:"+state.codeSpaces[state.actualCodeSpace].id) !== state.codeSpaces[state.actualCodeSpace].code ) {
            localStorage.setItem("space.code:"+state.codeSpaces[state.actualCodeSpace].id, state.codeSpaces[state.actualCodeSpace].code)
            localStorage.setItem("space.asm:"+state.codeSpaces[state.actualCodeSpace].id, state.codeSpaces[state.actualCodeSpace].asm)
        }
    },
    getActualAssebly: function (state, env) {
            env.$store.dispatch('compile/reagentAssembly',env);
    },

    interPanelAsm(state, val = !state.asmPanel){

        state.asmPanel = val;

        state.codeSpaces.forEach((item)=>{
            item.visibleAsm = state.asmPanel;
        });
    }

};

const actions = {

    async internal_colab_clock({ state, commit }, enviroment) {
        clearTimeout(state.timer);

        state.timer = setTimeout(async () => {
            let codebase = state.codeSpaces[state.actualCodeSpace].code;
            await axios.put(
                `${state.API}codespace/update?id=${state.visibles.codespace}`,
                {
                    code: codebase,
                }
            );
            enviroment.$socketio.emit("UpdateCodeSpace", state.visibles.codespace);
        }, 1500);
    },

    internal_global_clock({state, commit}, enviromet){

        clearTimeout(state.globalTimer)
        clearInterval(state.fastGlobalTimer)

        state.fastGlobalTimer = setTimeout(()=>{
            if(state.asmPanel){
                commit('getActualAssebly', enviromet)
            }
        }, 800);
        state.globalTimer = setTimeout(()=>{
               commit('saveIntoLocal')
        }, 3000);
    },

    async socketOn({ state }, enviroment) {
        if (state.visibles.colab && state.visibles.codespace !== "null") {
            enviroment.$socketio.on("actualizacion_base", async (args) => {
                if (args === state.visibles.codespace) {
                    const code = await axios.get(
                        `${state.API}codespace/findone?id=${args}`
                    );
                    state.codeSpaces[0].code = code.data.data.code;
                }
            })
        }
    },

    setColab({ commit }, value) {
        commit("useVisible", { target: "v.libcurl", value: value });
        commit("useVisible", { target: "v.tabs", value: value });
        commit("useVisible", { target: "v.poo", value: value });
        commit("useVisible", { target: "v.colab", value: !value });
    },

    async visibles_to_colab({ state, dispatch, commit }, value) {
        dispatch("setColab", value);

        if (state.emisor) {
            return;
        }

        let codeBase = state.codeSpaces[state.actualCodeSpace].code;
        let query = await axios({
            method: "POST",
            url: `${state.API}codespace/new`,
            data: {
                code: codeBase,
                codespace: state.identity,
                time: new Date().getDate().toString(),
            },
        });

        localStorage.setItem("v.codespace", String(query?.data.data._id || undefined));
        state.visibles.codespace = String(query?.data.data._id);
        state.share.codespace =
            window.location.origin + "?codespace=" + query?.data.data._id;
        commit("setColabUrl");
        window.location.reload(true);
    },


    toColabClient({ state }, codespace) {
        localStorage.setItem("v.codespace", codespace);
        state.visibles.codespace = codespace;
        state.visibles.colab = true;
    },


    async share({ state, commit }) {
        let code = state.codeSpaces[state.actualCodeSpace].code;

        if (state.mode === 0) {
            let query = await axios({
                method: "POST",
                url: `${state.API}notes/new`,
                data: {
                    nombre: state.identity,
                    conten: code,
                    author: state.identity,
                },
            });
            state.share_id = query.data.data._id;
        } else {
            commit("code_builder");
            let query = await axios({
                method: "POST",
                url: `${state.API}notes/new`,
                data: {
                    nombre: "share",
                    conten: state.code_build,
                    author: state.identity,
                },
            });
            state.share_id = query.data.data._id;
        }
    },


    async extract_codespace({ state, commit }, id) {
       try{
           const code = await axios.get(`${state.API}codespace/findone?id=${id.toString()}`);
           state.codeSpaces[0].code = code?.data.data.code;
       } catch (e) {
           commit("clearUrl")
       }
    },
    async extract_notecode({ state, commit }, id) {
       try {
           const nota = await axios.get(`${state.API}notes/show?id=${id.toString()}`);
           state.codeSpaces[0].code = nota.data.data.conten;
       } catch (e){
           commit("clearUrl")
       }
    },

    newSpace({ commit, state }, { vm }) {

        commit('setEnv', {vm:vm,call: 'newSpace'})
        state.ids = state.ids + 1;

        commit("addTabSpace",    state.ids);
        commit("addSpaceArray",  state.ids);
        commit("addSpaceEditor", state.ids);
        state.saveThis = vm;
    }
};



export default {
    namespaced: true,
    state,
    mutations,
    actions
}