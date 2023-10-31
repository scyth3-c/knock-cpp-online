<template>
  <b-navbar toggeable="lg" class="navbar-horizontal apagado mt-1" type="dark">
    <!-- primera parte de la barra -->
    <b-navbar-nav>
      <b-navbar-brand>
        <span class="font-weight-bold fstyle">knock </span>
      </b-navbar-brand>
    </b-navbar-nav>

    <!-- segunda parte de la barra -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item :href="github"
        ><b-icon icon="github" variant="white"></b-icon
      ></b-nav-item>
      <b-nav-item :href="paypal"
        ><b-icon icon="heart-fill" variant="white"></b-icon
      ></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "barra",
  computed: {
     ...mapState({
       github: state => state.base.github,
       paypal: state => state.base.paypal
     }),
  }
};
</script>

<style scoped>
@import "@/assets/general.v1.css";
</style>