<template>
  <b-form-select v-model="cmOption" title="el tema del editor">
    <b-form-select-option value="dracula">dracula</b-form-select-option>
    <b-form-select-option value="monokai">monokai</b-form-select-option>
    <b-form-select-option value="yonce">yonce</b-form-select-option>
    <b-form-select-option value="base16-dark">dark</b-form-select-option>
  </b-form-select>
</template>

<script>
export default {
  name: "themes",
  computed: {
    cmOption: {
      get() {
        return this.$store.state.cmOption.theme;
      },
      set(value) {
        this.$store.commit("changeTheme", { data: value, vm: this });
      },
    },
  },
};
</script>
