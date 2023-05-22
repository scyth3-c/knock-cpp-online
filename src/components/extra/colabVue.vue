<template>
    
<b-modal id="colab"  hide-backdrop hide-header hide-footer>
    <p style="cursor:pointer" @click="$bvModal.hide('colab')">X</p>
    <div class="jumbotron">
    <h2>Bienviendo a el modo colaboración <b-icon icon="sun"></b-icon>  </h2>
   </div>

   <div v-if="!visibles.colab">

    <p class="texty">
        una vez activado este modo, podras escribir codigo en simultaneo con tus amigos. 
        <br/> <br/>
        solo enviales tu enlace que te parece en la barra de direcciones, y ya podran escribir codigo juntos desde
        cualquier parte del mundo!
       </p>
    
       <div class="fluid">
        <b-button @click="activar" class="btn-sm mx-1 bg-dark">
            Activar
        </b-button>
        <b-button @click="close" class="btn-sm mx-1 bg-outline-dark bg-transparent text-dark">
            Volver
        </b-button>
       </div>
   </div>

   <div v-else>
    <p class="texty">
        parece que ya estas usando el modo colab, si deseas desactivarlo haz click en el boton desactivar
    </p>
    <b-button @click="desactivar" class="btn-sm mx-1 bg-dark">
        Desactivar
    </b-button>
   </div>
</b-modal>

</template>

<script>
export default {
    name: 'colabVue',
    methods:{
        close(){
            this.$bvModal.hide("colab")
            this.$bvModal.hide("extra-modal")
        },
        activar() {
            this.$store.dispatch('visibles_to_colab', false)
            this.close()
        },
        desactivar(){
            localStorage.removeItem("v.codespace")
            this.$store.dispatch('setColab', true)
            this.$store.commit('clearUrl')
            this.close()
            this.$store.commit('deleteCodeSpace')
            this.$store.state.isHost = false;
        },
    },
    computed:{
       visibles:{
        get(){ return this.$store.state.visibles }
       }
    }
}
</script>

<style scoped>
.texty{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>