<template>
  <div>
    <b-badge variant="transparent" class="p-2 text-dark w-100"
      >Escribe la entrada del usuario al programa
    </b-badge>
     <b-input disabled class="w-100 text-dark mb-1" placeholder="entrada del usuario" title="entrada del usuario al programa" v-model="getIn">
     </b-input>
    <b-input
      title="establece la entrada del programa"
      v-model="setInput"
      class="mt-2"
      placeholder="10 kevin 99"
    ></b-input>
  </div>
</template>

<script>
export default {
  name: "program-input",

  computed: {

    getIn(){
      return `[\"${this.setInput.split(" ").join("\"],[\"")}"]`;
    },

    setInput: {
      get() {
        return this.$store.state.compile.compile.inputData;
      },
      set(value) {
        return this.$store.state.compile.compile.inputData = value;
      },
    },
  },
};
</script>

<style scoped>
@import "@/assets/general.v1.css";
</style>