import Vue from 'vue'
import App from './App.vue'
import Edit from './components/Edit.vue'
import { inherits } from 'util';



window.onload = init;
function init(){
  Vue.component("edit", Edit)

  new Vue({
    el: "#app",
    render: h => h(App)
  });  
}
