<template>
  <codemirror  class="CodeMirror" :id="ids" v-if="visible" v-model="model" :options="options" />
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/theme/moxer.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/zenburn.css";
import "codemirror/theme/ayu-mirage.css";

import "codemirror/mode/clike/clike.js";
import "codemirror/keymap/sublime.js";

export default {
  name: "editor",
  props: ["ids", "options", "codeSpaces","type"],
  components: {
    codemirror,
  },

  computed: {

    visible: {
      get() {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);
        return this.codeSpaces[it].visible;
      },
      set(value) {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);
        this.codeSpaces[it].visible = value;
      },
    },
    model: {
      get() {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);

        return this.type === "code" ? this.codeSpaces[it].code : this.codeSpaces[it].asm;
      },
      set(value) {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);

        if (this.type === "code")
          this.codeSpaces[it].code = value;
        else
          this.codeSpaces[it].asm = value

      },
    },
  },
};
</script>
<style>
@import "@/assets/general.v1.css";
</style>