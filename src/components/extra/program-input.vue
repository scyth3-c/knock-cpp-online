<template>
  <b-card>
    <b-badge variant="dark" class="p-2"
      >Write the input required in the code
    </b-badge>
    <b-badge variant="transparent" class="my-2"
      >actual input data: [ {{ setInput }} ]</b-badge
    >
    <b-input
      title="establece la entrada del programa"
      v-model="setInput"
      class="mt-2"
      placeholder="10 kevin 99"
    ></b-input>
  </b-card>
</template>

<script>
export default {
  name: "program-input",

  computed: {
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
