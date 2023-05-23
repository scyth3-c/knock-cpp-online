<template>
    <b-container fluid>
        <b-icon icon="share-fill" class="text-primary" ></b-icon> 

         <span class="text-dark font-weight-bolder ml-2"> Comparte este codigo usando este enlace</span> <br/> <br/>
            
          <b-button class="btn-outline-dark bg-transparent w-100">
            <a :href="shared_path()">{{shared_path()}}</a> 
          </b-button>
          <b-icon scale="1.7" class="text-dark mx-auto float-center mt-3 w-100"  @click="copy(shared_path())"  icon="files"></b-icon>
       </b-container>  
</template>

<script>
export default {
    name: 'shareVue',
    methods: {
    copy(value) {
      navigator.clipboard.writeText(value);
    },
    shared_path(){
      return window.location.origin + "?sq=" + this.$store.state.share_id
    },
    }
}
</script>