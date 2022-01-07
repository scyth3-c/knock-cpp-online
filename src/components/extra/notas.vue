<template>
  <b-container>
    <b-card v-if="init == false">
      <b-badge variant="danger">Hola! para inicia dime tu nombre</b-badge>
      <b-input class="mt-2" v-model="nombre"></b-input>
      <b-button class="btn-sm mt-2" variant="primary" @click="saveme"
        >guardame</b-button
      >
    </b-card>

    <b-card v-if="init == true">
      <b-badge variant="dark">aqui apareceran tus notas</b-badge>
      <b-card
        class="rounded"
        style="min-height: 200px; max-height: 200px; overflow:auto; border: none;"
      >
        <b-table hover :items="filterData" :fields="field">
          <template #cell(nombre)="data">
            <button
              class="btn btn-large btn-primary"
              @click="showNote(data.item._id)"
              style="min-width: 150px;"
            >
              {{ data.value }}
            </button>
            <b-button
              class="btn-sm"
              variant="white"
              @click="deleteNote(data.item._id)"
              ><b-icon variant="red" icon="trash"></b-icon
            ></b-button>
          </template>
        </b-table>
      </b-card>

      <b-button
        class="btn-sm ml-2"
        @click="$bvModal.hide('notas-modal')"
        variant="secondary"
        >cerrar</b-button
      >
      <b-button variant="success" class="ml-2 btn-sm" v-b-modal.add-note
        >agregar</b-button
      >
      <b-modal id="add-note" title="extra" @ok="sendNote">
        <b-badge variant="dark">nombre</b-badge>
        <b-input class="my-2" v-model="nuevaNota.nombre"></b-input>
        <b-badge variant="dark">contenido</b-badge>
        <b-textarea class="my-2" v-model="nuevaNota.conten"></b-textarea>
      </b-modal>

      <b-modal id="error-msg" title="error">
        <h1>error al enviar la nota</h1>
      </b-modal>
      <b-modal id="error-empty" title="error">
        <h4>error los campos estan vacios! escribe tanto nombre como cuerpo</h4>
      </b-modal>

      <b-modal id="notas-show" title="contenido de la nota">
        <b-badge variant="dark">{{ outputNote.nombre }}</b-badge> <br />
        <span class="font-weight-bolder text-secondary rounded">
          {{ outputNote.conten }}
        </span>
      </b-modal>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "notas",

  methods: {
    saveme() {
      this.$store.dispatch("saveme", { vm: this });
    },
    chargeNotes() {
      this.$store.commit("chargeNotes");
    },
    sendNote() {
      this.$store.commit("sendNote", this);
    },
    showNote(id) {
      this.$store.commit("showNote", { id: id, vm: this });
    },
    deleteNote(id) {
      this.$store.commit("deleteNote", { id: id, vm: this });
    },
  },
  computed: {
    ...mapGetters({
      field: "field",
      seed: "noteSeed",
    }),

    nuevaNota: {
      get() {
        return this.$store.state.nuevaNota;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", {
          type: "nuevaNota",
          data: value,
        });
      },
    },

    outputNote: {
      get() {
        return this.$store.state.outputNote;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", {
          type: "outputNote",
          data: value,
        });
      },
    },

    identity: {
      get() {
        return this.$store.state.identity;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", {
          type: "identity",
          data: value,
        });
      },
    },
    notes: {
      get() {
        return this.$store.state.notes;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", { type: "notes", data: value });
      },
    },
    init: {
      get() {
        return this.$store.state.init;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", { type: "init", data: value });
      },
    },
    nombre: {
      get() {
        return this.$store.state.nombre;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", { type: "nombre", data: value });
      },
    },
    api: {
      get() {
        return this.$store.state.API;
      },
      set(value) {
        this.$store.commit("superNoteUpdate", { type: "api", data: value });
      },
    },

    filterData() {
      return this.$store.state.notes.filter((item) =>
        item.author.includes(this.identity)
      );
    },
  },
  mounted() {
    this.init = localStorage.getItem("inited") ? true : false;
    if (this.init) {
      this.identity = localStorage.getItem("inited");
      this.$store.state.nuevaNota.author = localStorage.getItem("inited");
      this.chargeNotes();
    }
  },
};
</script>
