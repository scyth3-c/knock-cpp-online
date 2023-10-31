<template>
  <b-form-select v-model="cmOption" title="el tema del editor" >
    <b-form-select-option v-for="(theme, index) in themes" :key="index" :value="theme.val">{{theme.name}}</b-form-select-option>
  </b-form-select>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "themes",

  computed: {
    ...mapState('base', ["themes"]),
    cmOption: {
      get() {
        return this.$store.state.codespaces.cmOption.theme;
      },
      set(value) {
        this.$store.commit("codespaces/changeTheme", { data: value, vm: this });
      },
    },
  },
};
</script>
