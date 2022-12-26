<template>
  <div>
    <b-badge variant="transparent" class="p-2 text-dark"
      >Write the input required in the code
    </b-badge> <br>
    <b-badge variant="transparent" class="my-2"
      >actual input data: {{ getIn }}</b-badge
    >
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
      return this.setInput.split(" ");
    },

    setInput: {
      get() {
        return this.$store.state.inputData;
      },
      set(value) {
        this.$store.commit("setInputData", { data: value });
      },
    },
  },
};
</script>
