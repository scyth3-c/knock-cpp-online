<template>
  <b-card class="w-100 footer-vw" type="dark">
    <hr class="bg-dark" />
    <ul class="float-left mt-3 footer-list">
      <li><b-icon icon="code"></b-icon> Kevin Bohorquez <br></li>
      <li><b-icon icon="github"></b-icon> scyth3-c</li>
      <li><b-icon icon="twitter"></b-icon> scyth3_c</li>
    </ul>

    <b-modal hide-footer hide-header id="mensaje_enviado">
      <p style="cursor:pointer" @click="$bvModal.hide('mensaje_enviado')">X</p>
    <strong>  Tu mensaje fue enviado, Muchas Gracias</strong> <b-icon variant="warning" icon="emoji-smile"></b-icon>
    </b-modal>

    <b-card no-body class="col-md-4 float-center mx-auto footer-vw">
      <b-badge style="background: rgba(0, 0, 0, 0)" variant="dark" class="p-2"
        >enviame algun mensaje:</b-badge
      >
      <b-input
        title="escribe el mensaje aqui"
        v-model="model"
        placeholder="¡Hola!, ¿Cómo Estás?"
        class="font-weigth-bolder"
      ></b-input>
      <b-button
        title="enviar mensaje"
        class="btn-sm my-2 col-md-3 float-center mx-auto"
        variant="dark"
        @click="sendMsg"
        >enviar</b-button
      >
    </b-card>
    <hr class="bg-dark" />
  </b-card>
</template>

<script>
import store from "@/store";

export default {
  name: "footerVue",
  methods: {
    sendMsg() {
      store.commit("sendMsg");
      this.model = ""
      this.$bvModal.show("mensaje_enviado")
    },
  },
  computed: {
    model: {
      get() {
        return store.state.direct_msg;
      },
      set(value) {
        store.state.direct_msg = value;
      },
    },
  },
};
</script>

<style scoped>
.footer-vw {
  background: rgb(27, 27, 27);
}
.footer-list {
  list-style: none;
  color: white;
}
.text {
  font-family: "Courier New", Courier, monospace;
}
</style>