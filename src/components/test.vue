<template>
    <codemirror class="CodeMirror"  :options="options"  />
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/theme/dracula.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/base16-dark.css";

import "codemirror/mode/clike/clike.js";
import "codemirror/keymap/sublime.js";
export default {
    name: 'test',
    components:{
        codemirror
    },
    data(){
        return {
     options: {
      lineWrapping: true,
      lineWrapping: true,
      autofocus: true,
      lineNumbers: true,
      smartIndent: true,
      indentUnit: 2,
      styleActiveLine: true,
      keyMap: "sublime",
      mode: "text/x-c++src",
      theme: localStorage.getItem("theme") || "yonce",
    },
        }
    }
}
</script>

<style>
.CodeMirror {
 /* Set height, width, borders, and global font properties here */
    font-family: monospace;
    height: 100%;
}
</style>