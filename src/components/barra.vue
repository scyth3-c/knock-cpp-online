<template>
    

  <b-navbar toggeable="lg" class="navbar-horizontal" type="dark" variant="dark">
    <!-- primera parte de la barra -->
   <b-navbar-nav>
    <b-navbar-brand>
    <b-icon icon="exclude" variant="white"></b-icon>
    <span class="font-weight-bold ml-3">Knock-CPP</span>
    </b-navbar-brand>
   </b-navbar-nav>

   <!-- segunda parte de la barra -->
   <b-navbar-nav class="ml-auto">
    <b-nav-item :href="github"><b-icon icon="github" variant="white"></b-icon></b-nav-item>
    <b-nav-item :href="paypal"><b-icon icon="heart-fill" variant="white"></b-icon></b-nav-item>
   </b-navbar-nav>
  </b-navbar>



</template>

<script>
export default {
    name: 'barra',
    data() {
        return {
            github: this.GLOBAL.github,
            paypal: this.GLOBAL.paypal
        }
    }
}
</script>