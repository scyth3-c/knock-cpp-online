<template>
    
    
    <b-container>
        <b-card  class="col-md-12 bg-dark w-100 mt-3 shadow-lg" style="min-height: 530px;">
        
          <b-form-select class="text-center bg-dark text-white col-md-2 font-weight-bold" v-model="standar">
            <b-form-select-option value="c++20">c++20</b-form-select-option>
            <b-form-select-option value="c++17">c++17</b-form-select-option>
            <b-form-select-option value="c++14">c++14</b-form-select-option>
            <b-form-select-option value="c++11">c++11</b-form-select-option>
          </b-form-select>
      
           <div class="row"> 
          <div  class="rounded ml-1 col-md-12 shadow-md mt-2" style="background-color:black; min-height:300px;">
            <textarea v-model="code" autofocus required class="mt-2 font-weight-bold" name="code" id="content"  rows="13" style="background-color:black; color:green;  width:99%; border:none; outline:0; font-family:monospace;"></textarea>
          </div>

           <b-card class="w-100 ml-2 bg-dark mt-2" style="max-height: 130px; min-height: 130px; overflow-y:auto; border:none;">
              <b-badge variant="danger" class="text-white">output: <b-icon icon="file-earmark-arrow-down" variant="white"></b-icon> </b-badge>
              <br>
              <span class="text-white" style="font-family:monospace;">
               {{output}}
               </span>
           </b-card>   


           </div>
           <b-button @click="compile" variant="success" class="float-right mt-1">compilar</b-button>    
          
      </b-card>
    </b-container>
       
      


</template>

<script>

import api from '@/recursos/apis.js'
export default {
    name: 'basecanvas',
    data() {
      return {
        standar: 'c++20',
        code: '',
        output: '',
      }
    },
    methods: {
       async compile() {
        const exs = await api.get(`/test?cd=${this.code}`);
         console.log(`codigo enviado: ${this.code}`,exs);  
      }
    }
    }
</script>

  <style>

::-webkit-scrollbar {
  width: 10px;
  border: none;
}
::-webkit-scrollbar-track {
  background: #fefeff; 
}
::-webkit-scrollbar-thumb {
  background: #484f58; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(27, 53, 77); 
}
 </style>