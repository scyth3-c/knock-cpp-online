<template>


    <b-container>
            
  <b-card v-if="init==false">
    
    <b-badge variant="danger">Hola! para inicia dime tu nombre</b-badge>
    <b-input class="mt-2" v-model="nombre"></b-input>
     <b-button class="btn-sm mt-2" variant="primary"  @click="saveme">guardame</b-button>

  </b-card> 

   <b-card v-if="init==true">
   
   <b-badge variant="dark">aqui apareceran tus notas</b-badge>
    <b-card  class="rounded" style="min-height: 200px; max-height: 200px; overflow:auto; border: none;">
      <b-table hover :items="filterData" :fields="field" >
          <template #cell(nombre)="data"> 
             <button class="btn btn-large btn-primary" @click="showNote(data.item._id)"  style="min-width: 150px;" >{{data.value}}</button>
            <b-button class="btn-sm" variant="white" @click="deleteNote(data.item._id)"><b-icon variant="red" icon="trash"></b-icon></b-button>
          </template>
        </b-table>
       </b-card>
        
        <b-button class="btn-sm ml-2" @click="$bvModal.hide('notas-modal')" variant="secondary">cerrar</b-button>
        <b-button variant="success" class="ml-2 btn-sm"  v-b-modal.add-note>agregar</b-button>
          <b-modal id="add-note" title="extra" @ok="sendNote">
            <b-badge variant="dark">nombre</b-badge>
            <b-input class="my-2" v-model="nuevaNota.nombre"></b-input>
            <b-badge variant="dark">contenido</b-badge>
            <b-textarea class="my-2" v-model="nuevaNota.conten"></b-textarea>
          </b-modal>
        

        <b-modal
        id="error-msg"
        title="error"
        >  
            <h1>error al enviar la nota</h1>
        </b-modal>
        <b-modal
        id="error-empty"
        title="error"
        >  
        <h4>error los campos estan vacios! escribe tanto nombre como cuerpo
        </h4>
        </b-modal>

        <b-modal id="notas-show" title="contenido de la nota">
            <b-badge variant="dark">{{outputNote.nombre}}</b-badge> <br>
            <span class="font-weight-bolder text-secondary rounded">  {{outputNote.conten}} </span>
        </b-modal>

     </b-card>
    </b-container>


</template>


<script>
export default {
    name: 'notas',
    data() {
        return {
            api: this.GLOBAL.API,
            init: false,
            nombre: '',
            identity: localStorage.getItem('inited'),
            seed: Math.random()*100 + new Date().getSeconds(),
            notes: [

            ],
            field: ['nombre'],
            nuevaNota: {
                nombre: '',
                conten: '',
                author: this.identity
            },
            outputNote: {
                 nombre: '',
                conten: ''
            }
        }
    },
    methods: {
        saveme() {
            if(this.nombre != '') {
            const notesSeed = this.nombre+this.seed;
            localStorage.setItem('inited',notesSeed); 
            this.$bvModal.hide('notas-modal');
            this.chargeNotes();
            }
        },
      async chargeNotes() {
           const response = await this.axios.get(`${this.api}notes/recollector`);
           this.notes = response.data;
        },
     async sendNote() {
          
          if(this.nuevaNota.nombre != '' && this.nuevaNota.conten != '') 
          {   
           try {
               await this.axios({
               method: 'POST',
               url: `${this.api}notes/new`,
               data: this.nuevaNota
           });
           this.nuevaNota.nombre = '';
           this.nuevaNota.conten = '';
             this.$bvModal.hide('notas-modal');
             this.$bvModal.show('notas-modal');
           } catch {
               this.$bvModal.show('error-msg');
           }
          } else {
               this.$bvModal.show('error-empty');
          }

        },

       async showNote(id) {
            const nota = await this.axios.get(`${this.api}notes/show?id=${id}`);
            this.outputNote.nombre =nota.data.nombre;
            this.outputNote.conten = nota.data.conten;
            this.$bvModal.show('notas-show');
        },
      async deleteNote(id) {
         await this.axios.delete(`${this.api}notes/delete?id=${id}`);
          this.$bvModal.hide('notas-modal');
          this.$bvModal.show('notas-modal');
      }
    },
    computed: {
        filterData() {
            return this.notes.filter( item => item.author.includes(this.identity));
        }
    },
    mounted() {
       this.init = localStorage.getItem('inited') ? true : false;
       if(this.init) {
           this.identity = localStorage.getItem('inited');
           this.nuevaNota.author = localStorage.getItem('inited');
           this.chargeNotes();
       }
    }
}
</script>