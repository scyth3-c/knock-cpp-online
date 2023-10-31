import axios from "axios";
import static_base from "./base"
const state = () => ({
    API: static_base.state().API,
    notes: [],
    nombre: "",
    field: ["nombre"],
    init: false,
    identity: localStorage.getItem("inited"),
    noteSeed: Math.random() * 100 + new Date().getSeconds(),
    outputNote: {
        nombre: "",
        conten: "",
    },
    nuevaNota: {
        nombre: "",
        conten: "",
        author: localStorage.getItem("inited"),
    },

});

const mutations = {

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


    saveme(state) {
        if (state.nombre !== "") {
            const notesSeed = state.nombre + state.seed;
            localStorage.setItem("inited", notesSeed);
        }
    },


    async chargeNotes(state) {
        const response = await axios.get(`${state.API}notes/find`);
        state.notes = response.data.data;
    },

    async sendNote(state, vm) {
        if (state.nuevaNota.nombre !== "" && state.nuevaNota.conten !== "") {
            try {
                await axios({
                    method: "POST",
                    url: `${state.API}notes/new`,
                    data: state.nuevaNota,
                });
                state.nuevaNota.nombre = "";
                state.nuevaNota.conten = "";

                vm.$bvModal.show("ok-msg");
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
        const nota = await axios.get(`${state.API}notes/show?id=${payload.id.toString()}`);
        state.outputNote.nombre = nota.data.data.nombre;
        state.outputNote.conten = nota.data.data.conten;
        payload.vm.$bvModal.show("notas-show");
    },


    async deleteNote(state, payload) {
        await axios.delete(`${state.API}notes/delete?id=${payload.id}`);
        payload.vm.$bvModal.hide("notas-modal");
        payload.vm.$bvModal.show("notas-modal");
    },
};

const actions = {
    saveme({ commit }, { vm }) {
        commit("saveme");
        vm.$bvModal.hide("notas-modal");
        commit("chargeNotes");
    },
};

export  default  {
    namespaced: true,
    state,
    mutations,
    actions
}