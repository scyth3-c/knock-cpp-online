<template>
  <div>
    <b-badge class="p-2" variant="white">set the headers here: </b-badge>
    <b-input
      title="escribe las cabeceras aqui"
      class="text-black font-weight-bold"
      v-model="headers"
      placeholder="iostream math vector"
    ></b-input>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "headers",
  computed: {
    headers: {
      get() {
        return store.state.headers;
      },
      set(value) {
        store.state.headers = value;
      },
    },
  },
};
</script>