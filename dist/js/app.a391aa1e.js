(function(t){function e(e){for(var n,i,s=e[0],c=e[1],u=e[2],l=0,m=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&m.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(m.length)m.shift()();return r.push.apply(r,u||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==o[c]&&(n=!1)}n&&(r.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},o={app:0},r=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var d=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("barra"),a("Base")],1)},r=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-navbar",{staticClass:"navbar-horizontal",attrs:{toggeable:"lg",type:"dark",variant:"dark"}},[a("b-navbar-nav",[a("b-navbar-brand",[a("b-icon",{attrs:{icon:"exclude",variant:"white"}}),a("span",{staticClass:"font-weight-bold ml-3"},[t._v("Knock-CPP")])],1)],1),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item",{attrs:{href:t.github}},[a("b-icon",{attrs:{icon:"github",variant:"white"}})],1),a("b-nav-item",{attrs:{href:t.paypal}},[a("b-icon",{attrs:{icon:"heart-fill",variant:"white"}})],1)],1)],1)},s=[],c={name:"barra",data:function(){return{github:this.$store.state.github,paypal:this.$store.state.paypal}}},u=c,d=a("2877"),l=Object(d["a"])(u,i,s,!1,null,null,null),m=l.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-card",{staticClass:"dracula col-md-12 mb-3 w-100 mt-2 shadow-lg",class:t.bytheme},[a("b-container",{staticStyle:{display:"inline"}},[a("b-form-select",{staticClass:"text-center mt-1 text-info col-sm-2 font-weight-bold",staticStyle:{background:"rgba(0,0,0,0)"},attrs:{title:"el estandar con el que se compilara c++"},model:{value:t.standar,callback:function(e){t.standar=e},expression:"standar"}},[a("b-form-select-option",{attrs:{value:"c++11"}},[t._v("c++11")]),a("b-form-select-option",{attrs:{value:"c++17"}},[t._v("c++17")]),a("b-form-select-option",{attrs:{value:"c++14"}},[t._v("c++14")]),a("b-form-select-option",{attrs:{value:"c++2a"}},[t._v("c++2a")])],1),a("b-form-select",{staticClass:"ml-3 mt-1 text-center text-info col-md-1 font-weight-bold",staticStyle:{background:"rgba(0,0,0,0)"},attrs:{title:"el nivel de optimizacion a la hora de compilar, esto se vera en el codigo ensamblador"},model:{value:t.optimizar,callback:function(e){t.optimizar=e},expression:"optimizar"}},[a("b-form-select-option",{attrs:{value:"1"}},[t._v("O1")]),a("b-form-select-option",{attrs:{value:"2"}},[t._v("O2")]),a("b-form-select-option",{attrs:{value:"3"}},[t._v("O3")])],1),a("b-button",{staticClass:" mt-1 ml-3",staticStyle:{background:"rgba(0,0,0,0)"},attrs:{title:"descarga el codigo assembly generado del codigo c++"},on:{click:t.getAssembly}},[t._v("ASM")]),a("b-button",{staticClass:"mt-1 ml-2",staticStyle:{background:"rgba(0,0,0,0)"},attrs:{title:"descarga el codigo escrito"},on:{click:t.download}},[a("b-icon",{attrs:{icon:"download",variant:"white"}})],1),a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.extra-modal",modifiers:{"extra-modal":!0}}],staticClass:"mt-1 float-right ml-auto",staticStyle:{background:"rgba(0,0,0,0)"},attrs:{title:"muestra el panel de addons extra"}},[a("b-icon",{attrs:{variant:"white",icon:"easel-fill"}})],1),a("b-modal",{attrs:{id:"extra-modal",title:"extra"}},[a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.notas-modal",modifiers:{"notas-modal":!0}}],attrs:{variant:"primary"}},[t._v("Notas")]),a("b-modal",{attrs:{id:"notas-modal","hide-footer":""}},[a("notas")],1),a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.themes-modal",modifiers:{"themes-modal":!0}}],staticClass:"ml-1",attrs:{variant:"primary"}},[t._v("themes")]),a("b-modal",{attrs:{id:"themes-modal"}},[a("themes")],1)],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"rounded col-md-12 shadow-md mt-2"},[a("codemirror",{attrs:{options:t.cmOption},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1),a("b-card",{staticClass:"w-100 mt-2",staticStyle:{background:"rgba(0,0,0,0)","max-height":"120px","min-height":"120px","overflow-y":"auto",border:"none"}},[a("b-badge",{staticClass:"text-white",attrs:{variant:"danger"}},[t._v("output: "),a("b-icon",{attrs:{icon:"file-earmark-arrow-down",variant:"white"}})],1),a("br"),a("span",{staticClass:"text-white",staticStyle:{"font-family":"monospace"}},[t._v(" "+t._s(t.output)+" ")])],1)],1),a("b-button",{staticClass:"ml-1 float-right mt-1",attrs:{variant:"success"},on:{click:t.compile}},[t._v("compilar")]),a("b-button",{staticClass:"float-right mx-auto mt-1",attrs:{variant:"danger"},on:{click:t.reset}},[a("b-icon",{attrs:{icon:"arrow-counterclockwise"}})],1)],1)],1)},b=[],f=a("5530"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[0==t.init?a("b-card",[a("b-badge",{attrs:{variant:"danger"}},[t._v("Hola! para inicia dime tu nombre")]),a("b-input",{staticClass:"mt-2",model:{value:t.nombre,callback:function(e){t.nombre=e},expression:"nombre"}}),a("b-button",{staticClass:"btn-sm mt-2",attrs:{variant:"primary"},on:{click:t.saveme}},[t._v("guardame")])],1):t._e(),1==t.init?a("b-card",[a("b-badge",{attrs:{variant:"dark"}},[t._v("aqui apareceran tus notas")]),a("b-card",{staticClass:"rounded",staticStyle:{"min-height":"200px","max-height":"200px",overflow:"auto",border:"none"}},[a("b-table",{attrs:{hover:"",items:t.filterData,fields:t.field},scopedSlots:t._u([{key:"cell(nombre)",fn:function(e){return[a("button",{staticClass:"btn btn-large btn-primary",staticStyle:{"min-width":"150px"},on:{click:function(a){return t.showNote(e.item._id)}}},[t._v(" "+t._s(e.value)+" ")]),a("b-button",{staticClass:"btn-sm",attrs:{variant:"white"},on:{click:function(a){return t.deleteNote(e.item._id)}}},[a("b-icon",{attrs:{variant:"red",icon:"trash"}})],1)]}}],null,!1,2714146291)})],1),a("b-button",{staticClass:"btn-sm ml-2",attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide("notas-modal")}}},[t._v("cerrar")]),a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.add-note",modifiers:{"add-note":!0}}],staticClass:"ml-2 btn-sm",attrs:{variant:"success"}},[t._v("agregar")]),a("b-modal",{attrs:{id:"add-note",title:"extra"},on:{ok:t.sendNote}},[a("b-badge",{attrs:{variant:"dark"}},[t._v("nombre")]),a("b-input",{staticClass:"my-2",model:{value:t.nuevaNota.nombre,callback:function(e){t.$set(t.nuevaNota,"nombre",e)},expression:"nuevaNota.nombre"}}),a("b-badge",{attrs:{variant:"dark"}},[t._v("contenido")]),a("b-textarea",{staticClass:"my-2",model:{value:t.nuevaNota.conten,callback:function(e){t.$set(t.nuevaNota,"conten",e)},expression:"nuevaNota.conten"}})],1),a("b-modal",{attrs:{id:"error-msg",title:"error"}},[a("h1",[t._v("error al enviar la nota")])]),a("b-modal",{attrs:{id:"error-empty",title:"error"}},[a("h4",[t._v("error los campos estan vacios! escribe tanto nombre como cuerpo")])]),a("b-modal",{attrs:{id:"notas-show",title:"contenido de la nota"}},[a("b-badge",{attrs:{variant:"dark"}},[t._v(t._s(t.outputNote.nombre))]),t._v(" "),a("br"),a("span",{staticClass:"font-weight-bolder text-secondary rounded"},[t._v(" "+t._s(t.outputNote.conten)+" ")])],1)],1):t._e()],1)},v=[],g=(a("4de4"),a("caad"),a("2532"),a("2f62")),w={name:"notas",methods:{saveme:function(){this.$store.dispatch("saveme",{vm:this})},chargeNotes:function(){this.$store.commit("chargeNotes")},sendNote:function(){this.$store.commit("sendNote",this)},showNote:function(t){this.$store.commit("showNote",{id:t,vm:this})},deleteNote:function(t){this.$store.commit("deleteNote",{id:t,vm:this})}},computed:Object(f["a"])(Object(f["a"])({},Object(g["b"])({field:"field",seed:"noteSeed"})),{},{nuevaNota:{get:function(){return this.$store.state.nuevaNota},set:function(t){this.$store.commit("superNoteUpdate",{type:"nuevaNota",data:t})}},outputNote:{get:function(){return this.$store.state.outputNote},set:function(t){this.$store.commit("superNoteUpdate",{type:"outputNote",data:t})}},identity:{get:function(){return this.$store.state.identity},set:function(t){this.$store.commit("superNoteUpdate",{type:"identity",data:t})}},notes:{get:function(){return this.$store.state.notes},set:function(t){this.$store.commit("superNoteUpdate",{type:"notes",data:t})}},init:{get:function(){return this.$store.state.init},set:function(t){this.$store.commit("superNoteUpdate",{type:"init",data:t})}},nombre:{get:function(){return this.$store.state.nombre},set:function(t){this.$store.commit("superNoteUpdate",{type:"nombre",data:t})}},api:{get:function(){return this.$store.state.API},set:function(t){this.$store.commit("superNoteUpdate",{type:"api",data:t})}},filterData:function(){var t=this;return this.$store.state.notes.filter((function(e){return e.author.includes(t.identity)}))}}),mounted:function(){this.init=!!localStorage.getItem("inited"),this.init&&(this.identity=localStorage.getItem("inited"),this.$store.state.nuevaNota.author=localStorage.getItem("inited"),this.chargeNotes())}},y=w,k=Object(d["a"])(y,h,v,!1,null,null,null),x=k.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-card",[a("b-form-select",{attrs:{title:"el tema del editor"},model:{value:t.cmOption,callback:function(e){t.cmOption=e},expression:"cmOption"}},[a("b-form-select-option",{attrs:{value:"dracula"}},[t._v("dracula")]),a("b-form-select-option",{attrs:{value:"monokai"}},[t._v("monokai")]),a("b-form-select-option",{attrs:{value:"yonce"}},[t._v("yonce")]),a("b-form-select-option",{attrs:{value:"base16-dark"}},[t._v("dark")]),a("b-form-select-option",{attrs:{value:"default"}},[t._v("light")])],1)],1)},$=[],N={name:"themes",computed:{cmOption:{get:function(){return this.$store.state.cmOption.theme},set:function(t){this.$store.commit("changeTheme",{data:t,vm:this})}}}},O=N,j=Object(d["a"])(O,_,$,!1,null,null,null),S=j.exports,C=a("8f94"),R=a.n(C),U=(a("a7be"),a("0109"),a("498a"),a("7a7a"),a("8c2e"),a("cc10"),a("4ba6"),a("9a48"),{name:"basecanvas",components:{notas:x,themes:S,codemirror:C["codemirror"]},created:function(){var t=this;this.charge(),this.$root.$on("Theme",(function(){t.$forceUpdate()}))},methods:{charge:function(){this.$store.commit("charge")},compile:function(){this.$store.commit("compile")},state:function(){this.$store.commit("charge")},download:function(){this.$store.commit("download")},getAssembly:function(){this.$store.commit("getAssembly")},reset:function(){this.$store.state.output=""}},computed:Object(f["a"])(Object(f["a"])({},Object(g["b"])(["time","seed","cmOption"])),{},{standar:{get:function(){return this.$store.state.standar},set:function(t){this.$store.commit("superUpdate",{type:"standar",data:t})}},code:{get:function(){return this.$store.state.code},set:function(t){this.$store.commit("superUpdate",{type:"code",data:t})}},buffer:{get:function(){return this.$store.state.buffer},set:function(t){this.$store.commit("superUpdate",{type:"buffer",data:t})}},output:{get:function(){return this.$store.state.output},set:function(t){this.$store.commit("superUpdate",{type:"output",data:t})}},temp:{get:function(){return this.$store.state.temp},set:function(t){this.$store.commit("superUpdate",{type:"temp",data:t})}},optimizar:{get:function(){return this.$store.state.optimizar},set:function(t){this.$store.commit("superUpdate",{type:"optimizar",data:t})}},bytheme:function(){return this.$store.state.bytheme}})}),P=U,M=(a("a4e7"),Object(d["a"])(P,p,b,!1,null,"bc66ed60",null)),A=M.exports,I={name:"App",components:{barra:m,Base:A}},z=I,T=Object(d["a"])(z,o,r,!1,null,null,null),D=T.exports,E=a("1da1"),q=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861"),a("bc3a")),B=a.n(q);n["default"].use(g["a"]);var L=new g["a"].Store({state:{API:"https://radiant-dusk-88409.herokuapp.com/",paypal:"https://www.paypal.com/paypalme/bohorquezrojas17",github:"https://github.com/scyth3-c",standar:"c++11",code:"#include <iostream>\n\nint main() {\n     \n      \n  \nreturn 0;\n}",buffer:"1",output:"",temp:"",optimizar:1,notes:[],nombre:"",init:!1,identity:localStorage.getItem("inited"),outputNote:{nombre:"",conten:""},nuevaNota:{nombre:"",conten:"",author:localStorage.getItem("inited")},cmOption:{lineNumbers:!0,keyMap:"sublime",mode:"text/x-csrc",theme:localStorage.getItem("theme")||"dracula"},bytheme:"dracula",time:{hour:(new Date).getHours(),min:(new Date).getMinutes(),sec:(new Date).getSeconds()},seed:Math.floor(89975*Math.random())+10,noteSeed:100*Math.random()+(new Date).getSeconds(),field:["nombre"]},mutations:{superUpdate:function(t,e){switch(e.type){case"standar":t.standar=e.data;break;case"code":t.code=e.data;break;case"buffer":t.buffer=e.data;break;case"output":t.output=e.data;break;case"temp":t.temp=e.data;break;case"optimizar":t.optimizar=e.data;break}},superNoteUpdate:function(t,e){switch(e.type){case"nuevaNota":t.nuevaNota=e.data;break;case"outputNote":t.outputNote=e.data;break;case"identity":t.identity=e.data;break;case"notes":t.notes=e.data;break;case"init":t.init=e.data;break;case"nombre":t.nombre=e.data;break}},compile:function(t){return Object(E["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.code!=t.buffer){e.next=4;break}return e.abrupt("return",t.output="> ya compilado, reultado: "+t.temp);case 4:if(!(t.code.includes("system(")||t.code.includes("<filesystem>")||t.code.includes('"filesystem"')||t.code.includes("std::filesystem")||t.code.includes("readDir(")||t.code.includes("deleteFile")||t.code.includes("strsafe.h"))){e.next=8;break}return e.abrupt("return",t.output=">  oye no deberias usar eso aqui");case 8:if(""!=t.code&&" "!=t.code){e.next=12;break}return e.abrupt("return",t.output="> no puedo compilar codigo si no hay codigo, ¿verdad?");case 12:return t.output="compilado...",t.buffer=t.code,e.next=16,B.a.post("".concat(t.API,"addon/compile"),t.code,{headers:{"Content-Type":"text/plain",title:"temp_file_".concat(t.seed,"_").concat((t.time.hour,t.time.min,t.time.sec)),standar:t.standar,o:t.optimizar}});case 16:return a=e.sent,t.temp=a.data.split("/knockapi/src/c++/temp/temp_"),t.output="> "+a.data.split("/knockapi/src/c++/temp/temp_"),e.abrupt("return",a.data);case 20:case"end":return e.stop()}}),e)})))()},charge:function(t){return Object(E["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,B()("".concat(t.API,"addon"));case 2:case"end":return e.stop()}}),e)})))()},download:function(t){return Object(E["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t.code&&" "!==t.code){e.next=2;break}return e.abrupt("return",t.code="> codigo vacio! (empty)");case 2:return e.next=4,B.a.post("".concat(t.API,"addon/download"),t.code,{headers:{"Content-Type":"text/plain",title:"temp_file_".concat(t.seed,"_").concat((t.time.hour,t.time.min,t.time.sec))}}).then(function(){var t=Object(E["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a"),n.href=a,n.setAttribute("download","main.cpp"),n.click();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t)}));case 4:case"end":return e.stop()}}),e)})))()},getAssembly:function(t){return Object(E["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,B.a.post("".concat(t.API,"addon/assembly"),t.code,{headers:{"Content-Type":"text/plain",title:"temp_file_".concat(t.seed,"_").concat((t.time.hour,t.time.min,t.time.sec)),standar:t.standar,o:t.optimizar}}).then(function(){var t=Object(E["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a"),n.href=a,n.setAttribute("download","assembly.asm"),n.click();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t)}));case 2:case"end":return e.stop()}}),e)})))()},saveme:function(t){if(""!=t.nombre){var e=t.nombre+t.seed;localStorage.setItem("inited",e)}},chargeNotes:function(t){return Object(E["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,B.a.get("".concat(t.API,"notes/recollector"));case 2:a=e.sent,t.notes=a.data;case 4:case"end":return e.stop()}}),e)})))()},sendNote:function(t,e){return Object(E["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(""==t.nuevaNota.nombre||""==t.nuevaNota.conten){a.next=15;break}return a.prev=1,a.next=4,B()({method:"POST",url:"".concat(t.API,"notes/new"),data:t.nuevaNota});case 4:t.nuevaNota.nombre="",t.nuevaNota.conten="",e.$bvModal.hide("notas-modal"),e.$bvModal.show("notas-modal"),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](1),e.$bvModal.show("error-msg");case 13:a.next=16;break;case 15:e.$bvModal.show("error-empty");case 16:case"end":return a.stop()}}),a,null,[[1,10]])})))()},showNote:function(t,e){return Object(E["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,B.a.get("".concat(t.API,"notes/show?id=").concat(e.id));case 2:n=a.sent,t.outputNote.nombre=n.data.nombre,t.outputNote.conten=n.data.conten,e.vm.$bvModal.show("notas-show");case 6:case"end":return a.stop()}}),a)})))()},deleteNote:function(t,e){return Object(E["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,B.a.delete("".concat(t.API,"notes/delete?id=").concat(e.id));case 2:e.vm.$bvModal.hide("notas-modal"),e.vm.$bvModal.show("notas-modal");case 4:case"end":return a.stop()}}),a)})))()},changeTheme:function(t,e){t.cmOption.theme=e.data,t.bytheme=e.data,e.vm.$forceUpdate()}},actions:{saveme:function(t,e){var a=t.commit,n=e.vm;a("saveme"),n.$bvModal.hide("notas-modal"),a("chargeNotes")}},getters:{cmOption:function(t){return t.cmOption},theme:function(t){return t.cmOption.theme},time:function(t){return t.time},seed:function(t){return t.seed},noteSeed:function(t){return t.noteSeed},field:function(t){return t.field}}}),H=a("130e"),J=a("5f5b"),F=a("b1e0");a("f9e3"),a("2dd8"),a("54ba");n["default"].config.productionTip=!1,n["default"].use(J["a"]),n["default"].use(F["b"]),n["default"].use(F["a"]),n["default"].use(R.a),n["default"].use(H["a"],B.a),new n["default"]({store:L,render:function(t){return t(D)}}).$mount("#app")},a4e7:function(t,e,a){"use strict";a("b774")},b774:function(t,e,a){}});
//# sourceMappingURL=app.a391aa1e.js.map