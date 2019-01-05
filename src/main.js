import Vue from 'vue'
import App from './App.vue'
import Edit from './components/Edit.vue'
import appCommande from './components/app-commande.vue'
import appMenuRestaurant from './components/app-menu-restaurant.vue'
import { inherits } from 'util';



window.onload = init;
function init(){
  Vue.component("edit", Edit)
  Vue.component("app-commande", appCommande)
  Vue.component("app-menu-restaurant", appMenuRestaurant)
  new Vue({
    el: "#app",
    render: h => h(App)
  });  
}
