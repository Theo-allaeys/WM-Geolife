import { reactive } from "vue";

export const loggedinstore = reactive({
  loggedin: localStorage.getItem("loggedinuser"),
  pseudo: localStorage.getItem("pseudo"),
  exp: localStorage.getItem("experience"),
  
  setItem() {
    this.loggedin = localStorage.getItem("loggedinuser");
    this.pseudo = localStorage.getItem("pseudo");
    this.exp = localStorage.getItem("experience");
  },
});