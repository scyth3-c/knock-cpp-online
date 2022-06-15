<template>
  <codemirror :id="ids" v-if="visible" v-model="model" :options="options" />
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

import store from "@/store";

export default {
  name: "editor",
  props: ["ids", "options"],
  components: {
    codemirror,
  },

  computed: {
    visible: {
      get() {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);
        return store.getters.codeSpaces[it].visible;
      },
      set(value) {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);
        store.state.codeSpaces[it].visible = value;
      },
    },
    model: {
      get() {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);
        return store.getters.codeSpaces[it].code;
      },
      set(value) {
        let rp = this.ids.replace("editor:", "");
        let it = parseInt(rp);
        store.state.codeSpaces[it].code = value;
      },
    },
  },
};
</script>
