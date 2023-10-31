import axios from "axios";
import static_base from "./base"

const state = () => ({
       API: static_base.state().API ,
       compile: null,
       usecurl: mutations.useLocal(null, {target: "usecurl", def: "off"}),
       estandares: [],
       niveles: [],
       base: null,
       codespaces: null
    })

    const mutations = {

        async compileCore(state, source_code) {
            const res = await axios.post(`${state.API}addon/compile`, source_code, {
                headers: {
                    "Content-Type": "text/plain",
                    title: `temp_file_${state.base.seed}_${
                        (state.base.time.hour, state.base.time.min, state.base.time.sec)
                    }`,
                    standar: state.compile.standar,
                    o: state.compile.optimizar,
                    flags: state.compile.cxxflags,
                    data: state.compile.inputData,
                    curl: state.usecurl,
                },
            });
            state.compile.temp = res.data;
            state.compile.output = "$ " + res.data;
            return res.data;
        },

        async assemblyCore(state, source_code ) {
            await axios
                .post(`${state.API}addon/assembly`, source_code, {
                    headers: {
                        "Content-Type": "text/plain",
                        title: `temp_file_${state.base.seed}_${
                            (state.base.time.hour, state.base.time.min, state.base.time.sec)
                        }`,
                        standar: state.compile.standar,
                        o: state.compile.optimizar,
                    },
                })
                .then(async (result) => {
                    const url = window.URL.createObjectURL(new Blob([result?.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "assembly.asm");
                    link.click();
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        async downloadCore(state, source_code) {
            await axios
                .post(`${state.API}addon/download`, source_code, {
                    headers: {
                        "Content-Type": "text/plain",
                        title: `temp_file_${state.base.seed}_${
                            (state.base.time.hour, state.base.time.min, state.base.time.sec)
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

        code_builder(state) {
            let splitHeaders = state.compile.headers.split(" ");
            let list = "";

            splitHeaders.forEach(function (H) {
                list += `#include "${H}"\n`;
            });

            let totalCode = "";
            totalCode += list;

            state.codespaces.codeSpaces.forEach(function (C) {
                if (C?.deleted === false && C.id !== 0) {
                    totalCode += C.code;
                }
            });
            totalCode += state.codespaces.codeSpaces[0].code;
            state.compile.code_build = totalCode;
        },

        useLocal(state, {target, def}) {
            return localStorage.getItem(target) !== undefined ? localStorage.getItem(target) : def
        },

        async setActualAsm(state,  source_code){
            let query = await axios
                .post(`${state.API}addon/assembly`, source_code, {
                    headers: {
                        "Content-Type": "text/plain",
                        title: `temp_file_${state.base.seed}_${
                            (state.base.time.hour, state.base.time.min, state.base.time.sec)
                        }`,
                        standar: state.compile.standar,
                        o: state.compile.optimizar,
                    },
                });
            if (query){


                if ( typeof query.data === "string"){
                    const { actualCodeSpace, codeSpaces } = state.codespaces;
                    const codeSpace = codeSpaces[actualCodeSpace];

                    codeSpace.asm = query.data
                } else {
                    const raw = query.data?.stderr;

                    const removeCommandRegex = /Error: Command failed: (.+)([\s\S]+)/;
                    const tempFileRegex = /\/knockapi\/src\/c\+\+\/temp\/temp_file/g;
                    const uid = /\/[0-9a-f-]+/g
                    const cppFileRegex = /(\w+)\.cpp/g;


                    const { actualCodeSpace, codeSpaces } = state.codespaces;
                    const codeSpace = codeSpaces[actualCodeSpace];

                    codeSpace.asm = raw
                        .replace(removeCommandRegex, '$2')
                        .replace(tempFileRegex, '')
                        .replace(uid, '')
                        .replace(cppFileRegex, "");
                }

               }
        }
    }

    const actions = {

        compile({ state, commit }, { vm, code }) {

            const regex = /(cin|getline|&ostream)/;
            state.codespaces = vm.$store.state.codespaces;
            state.base = vm.$store.state.base;

            if (code === state.compile.buffer) {

                return (state.compile.output = "> ya compilado, resultado: " + state.compile.temp);

            } else if ((!code || !code.trim())) {
                return (state.compile.output =
                    "# no puedo compilar sin codigo! ");
            } else if (regex.test(code) && state.compile.inputData === "") {
                vm.$bvModal.show("program-input");
            } else {
                //switch class or no
                if (state.codespaces.mode === 0) {
                    state.compile.output = "compilando...";
                    state.compile.buffer = code;
                    commit("compileCore", code);
                } else {
                    commit("code_builder");
                    state.compile.output = "compilando...";
                    commit("compileCore", state.compile.code_build);
                }
            }
        },

        getAssembly({ state, commit }, vm) {
            state.codespaces = vm.$store.state.codespaces;

            let code = state.codespaces.codeSpaces[state.codespaces.actualCodeSpace].code;

            if (state.codespaces.mode === 0) {
                commit("assemblyCore", code);
            } else {
                commit("code_builder");
                commit("assemblyCore", state.compile.code_build);
            }
        },
        download({ state, commit }, vm) {
            state.codespaces = vm.$store.state.codespaces;

            let code = state.codespaces.codeSpaces[state.codespaces.actualCodeSpace].code;

            if (state.codespaces.mode === 0) {
                commit("downloadCore", code);
            } else {
                commit("code_builder");
                commit("downloadCore", state.compile.code_build);
            }
        },

        reagentAssembly({state, commit}, env){

            state.codespaces = env.$store.state.codespaces;
            state.base = env.$store.state.base;

            let code = state.codespaces.codeSpaces[state.codespaces.actualCodeSpace].code;

            if (state.codespaces.mode === 0) {
                commit('setActualAsm', code)
            } else {
                commit("code_builder");
                commit('setActualAsm', code)
            }
        }
    }
export  default {
    namespaced: true,
    state,
    mutations,
    actions
}