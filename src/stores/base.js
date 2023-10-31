
const  state = () => ({
    //base
    API: "https://api-kcompiler-moi-2blrb.ondigitalocean.app/api/v2/",
    paypal: "https://www.paypal.com/paypalme/bohorquezrojas17",
    github: "https://github.com/scyth3-c",

    visibles: {
      options:
              ! localStorage.getItem("v.options")
              ? true
              : JSON.parse(localStorage.getItem("v.options")),
      addons:
              ! localStorage.getItem("v.addons")
              ? true
              : JSON.parse(localStorage.getItem("v.addons")),
      poo:
              ! localStorage.getItem("v.poo")
              ? true
              : JSON.parse(localStorage.getItem("v.poo")),
      tabs:
              ! localStorage.getItem("v.tabs")
              ? true
              : JSON.parse(localStorage.getItem("v.tabs")),
      libcurl:
              ! localStorage.getItem("v.libcurl")
              ? true
              : JSON.parse(localStorage.getItem("v.libcurl")),
    },

     themes: [],

    time: {
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds(),
    },

    seed: Math.floor(Math.random() * (89985 - 10)) + 10,
  });

export default {
    namespaced: true,
    state
}
