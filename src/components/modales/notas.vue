<template>
  <b-container>
    <b-card v-if="init == false" style="border: none">

      <b-badge variant="dark" class="p-2 w-100 text-dark bg-transparent"> <b-icon icon="pen"></b-icon> Escribe cualquier cosa, y vuelve a notas</b-badge>
        <b-input title="escribe tu nombre aqui" placeholder="palabra semilla" class="mt-2 input-sm inpfs" v-model="nombre"></b-input>
      <b-button title="guardar los datos" class="btn-sm mt-2 outln bg-dark" @click="saveme">Guardar</b-button>

    </b-card>

    <b-card v-if="init == true" style="border: none;">
      <b-badge variant="dark" class="bg-transparent text-dark"> <b-icon icon="pen"></b-icon> aqui apareceran tus notas </b-badge>
      <b-card
        class="rounded"
        style="
          min-height: 200px;
          max-height: 200px;
          overflow: auto;
          border: none;
        ">
        <b-table hover :items="filterData" :fields="field">
          <template #cell(nombre)="data">
            <button
            title="cuerpo de nota"
              class="btn btn-large btn-primary"
              @click="showNote(data.item._id)"
              style="min-width: 150px"
            >
              {{ data.value }}
            </button>
            <b-button
             title="borrar nota"
              class="btn-sm"
              variant="white"
              @click="deleteNote(data.item._id)"
              ><b-icon variant="red" icon="trash"></b-icon
            ></b-button>
          </template>
        </b-table>
      </b-card>

      <b-button
       title="cerrar modal"
        class="btn-sm ml-2 outwb"
        @click="$bvModal.hide('notas-modal')">
        cerrar
      </b-button>
      <b-button title="agregar notas" class="ml-2 btn-sm outwb" v-b-modal.add-note>
        agregar
      </b-button>

      <b-modal id="add-note" hide-header hide-footer>
        <b-badge  class="w-100 p-2 outfill" > <b-icon icon="pencil"></b-icon> Nueva  nota </b-badge>
        <b-input class="my-2 inpbt" placeholder=" name" v-model="nuevaNota.nombre"></b-input>
        <b-textarea class="my-2 inpbt noneshine" placeholder="i love c++ " v-model="nuevaNota.conten"></b-textarea>

        <b-button @click="sendNote" class=" bg-transparent text-dark btn-sm outln" > Ok </b-button>

      </b-modal>

      <b-modal id="error-msg" title="error" hide-footer hide-backdrop>
        <p style="cursor:pointer" @click="$bvModal.hide('error-msg')">X</p>
        <b-badge class="outfill my-3" >Error al enviar al servidor
          <b-icon icon="file-earmark-x-fill" variant="danger">
          </b-icon> </b-badge>
      </b-modal>

      <b-modal id="error-empty" title="error" hide-footer hide-header>
        <p style="cursor:pointer" @click="$bvModal.hide('error-empty')">X</p>
        <b-badge class="outfill my-3" >Error los campos estan vacios! escriba nombre y cuerpo
          <b-icon icon="exclamation-triangle-fill" variant="danger">
          </b-icon> </b-badge>
      </b-modal>


      <b-modal id="notas-show" title="contenido de la nota" hide-header hide-footer>
        <p style="cursor:pointer" @click="$bvModal.hide('notas-show')">X</p>
        <b-badge variant="dark">{{ outputNote.nombre }}</b-badge> <br />
        <pre class="font-weight-bolder text-secondary rounded">{{ outputNote.conten }}</pre>
      </b-modal>
    </b-card>

  </b-container>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "notas",

  methods: {
    saveme() {
      this.$store.dispatch("notes/saveme", { vm: this });
    },
    chargeNotes() {
      this.$store.commit("notes/chargeNotes");
    },
    sendNote() {
      this.$store.commit("notes/sendNote", this);
    },
    showNote(id) {
      this.$store.commit("notes/showNote", { id: id, vm: this });
    },
    deleteNote(id) {
      this.$store.commit("notes/deleteNote", { id: id, vm: this });
    },
  },
  computed: {

    ...mapState('notes', ['field', 'noteSeed']),

    nuevaNota: {
      get() {
        return this.$store.state.notes.nuevaNota;
      },
      set(value) {
        this.$store.commit("notes/superNoteUpdate", {
          type: "nuevaNota",
          data: value,
        });
      },
    },

    outputNote: {
      get() {
        return this.$store.state.notes.outputNote;
      },
      set(value) {
        this.$store.commit("notes/superNoteUpdate", {
          type: "outputNote",
          data: value,
        });
      },
    },

    identity: {
      get() {
        return this.$store.state.notes.identity;
      },
      set(value) {
        this.$store.commit("notes/superNoteUpdate", {
          type: "identity",
          data: value,
        });
      },
    },
    notes: {
      get() {
        return this.$store.state.notes.notes;
      },
      set(value) {
        this.$store.commit( "notes/superNoteUpdate", { type: "notes", data: value });
      },
    },
    init: {
      get() {
        return this.$store.state.notes.init;
      },
      set(value) {
        this.$store.commit("notes/superNoteUpdate", { type: "init", data: value });
      },
    },
    nombre: {
      get() {
        return this.$store.state.notes.nombre;
      },
      set(value) {
        this.$store.commit("notes/superNoteUpdate", { type: "nombre", data: value });
      },
    },
    filterData() {
      return this.$store.state.notes.notes.filter((item) =>
        item.author.includes(this.identity)
      );
    },
  },
  mounted() {
    this.init = !!localStorage.getItem("inited");
    if (this.init) {
      this.identity = localStorage.getItem("inited");
      this.$store.state.notes.nuevaNota.author = localStorage.getItem("inited");
      this.chargeNotes();
    }
  },
};
</script>

<style scoped>
@import "@/assets/general.v1.css";
</style>