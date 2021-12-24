<template>
    <b-container>
        <b-card  class="col-md-12 bg-dark w-100 mt-3 shadow-lg" style="min-height: 530px;">
          <b-form-select class="text-center bg-dark text-white col-md-2 font-weight-bold" v-model="standar">
            <b-form-select-option value="c++2a">c++2a</b-form-select-option>
            <b-form-select-option value="c++17">c++17</b-form-select-option>
            <b-form-select-option value="c++14">c++14</b-form-select-option>
            <b-form-select-option value="c++11">c++11</b-form-select-option>
          </b-form-select>
          <b-button @click="download" variant="dark" class="ml-3"><b-icon icon="download" variant="white"></b-icon></b-button>
           <div class="row"> 
          <div  class="contencore rounded ml-1 col-md-12 shadow-md mt-2">
            <textarea v-model="code" autofocus required class="codecore mt-2 font-weight-bold" name="code" id="content"  rows="13"></textarea>
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

export default {
    name: 'basecanvas',
    data() {

      return {
        standar: 'c++2a',
        code: '',
        buffer: '1',
        output: '',
        temp: '',
        time: {
          hour: new Date().getHours(),
          min: new Date().getMinutes(),
          sec: new Date().getSeconds()
        }
      }
    },
    created(){
        this.charge();
    },
    methods: {
       async compile() {
         if(this.code == this.buffer)
         {
           return this.output = '-> ya compilado, reultado: '+ this.temp;
         } else if(this.code.includes('system(')) {
          return this.output = '->  oye no deberias usar system() aqui';
         } 
          else if(this.code == '' || this.code == ' ') {
            return this.output = '-> no puedo compilar codigo si no hay codigo, ¿verdad?';
          }
         else {
                 this.output = 'compilado...';
                 this.buffer = this.code;
        const res = await this.axios.post(`${this.GLOBAL.API}addon/compile`, this.code, {
        headers: { 'Content-Type': 'text/plain', 'title' : `temp_file_${this.time.hour, this.time.min, this.time.sec}`, 'standar': this.standar }
        });
        console.log(res);
        this.temp = res.data;
        this.output = '-> ' + res.data;   
         }
      },
      async charge() {
        await this.axios(`${this.GLOBAL.API}addon`);
      },
      async download() {


      }
    }
    }
</script>

  <style>

  .codecore {
    background-color:rgb(13, 33, 51);
    color:rgb(139, 223, 230);  
    width:99%; border:none; 
    outline:0;
    font-family:monospace;
  }
 .contencore {
   background-color:rgb(13, 33, 51);
   min-height:300px;
   border-bottom: 10px solid rgb(10, 22, 32);
 }
::-webkit-scrollbar {
  width: 10px;
  border: none;
}
::-webkit-scrollbar-track {
  background: rgb(13, 33, 51); 
}
::-webkit-scrollbar-thumb {
  background: rgb(13, 33, 51); 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(13, 33, 51); 
}
 </style>