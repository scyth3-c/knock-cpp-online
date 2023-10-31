<template>
  <button :id="id" @click="changeTab" class="ml-2 tabs">
    <b-icon title="agrega una tab" icon="file-code"></b-icon>
    <b-icon title="cierra la tab" @click="delspace()" scale="1" icon="x"></b-icon>
  </button>
</template>

<script>

export default {
  name: "tabbar",
  props: ["id", "ctx"],
  methods: {
    changeTab() {
      this.ctx.commit("codespaces/setSpace", { id: this.id, vm: this });
    },
    delspace() {
      this.ctx.commit("codespaces/deleteSpace", { id: this.id });
    },
  },
};
</script>

<style>
@import "@/assets/general.v1.css";
</style>
