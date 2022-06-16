<template>
  <button :id="id" @click="changeTab" class="ml-2 tabs">
    <b-icon title="agrega una tab" icon="file-code"></b-icon>
    <b-icon title="cierra la tab" @click="delspace()" scale="1" variant="white" icon="x"></b-icon>
  </button>
</template>

<script>
import store from "@/store";
export default {
  name: "tabbar",
  props: ["id"],
  methods: {
    changeTab() {
      store.commit("setSpace", { id: this.id, vm: this });
    },
    delspace() {
      store.commit("deleteSpace", { id: this.id });
    },
  },
};
</script>

<style>
.tabs {
  width: 10%;
  height: 28px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid white;
  color: white;
}
</style>
