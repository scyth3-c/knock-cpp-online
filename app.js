const {exec} = require('child_process');
const express = require('express');
const path = require('path');

var result="";

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
   res.send("hola");
});

app.get('/code',(req,res)=>{

exec('g++ -std=c++17 main.cpp -o prueba && prueba.exe',(error, stdout, stderr)=>{
    console.log(stdout);
    result=stdout.toString();
});

   res.send(result);
});

app.get('/res',(req,res)=>{
       res.send(result);
    });

app.listen(app.get('port'),()=>{
   console.log("servidor corriendo en en el puerto: ", app.get('port')); 
});


