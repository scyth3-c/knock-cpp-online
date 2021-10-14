<script>
const {exec} = require('child_process');

const github ="https://github.com/scyth3-c";
const paypal =  "https://www.paypal.com/paypalme/bohorquezrojas17";



async function compilar(code) {
  var salida1, salida2, err;
  
  exec(`${code}`,(error, stdout, stderr)=>{
    console.log(stdout);
    console.log(stderr);
     salida1  = stdout;
     salida2 = stderr;
     err = error;
  });

  return {error: err, salida: salida1, salida2: salida2};
}



export default {
  github,
  paypal,
  compilar
}
</script>