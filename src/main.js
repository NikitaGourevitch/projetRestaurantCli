import Vue from 'vue'
import App from './App.vue'
import Edit from './components/Edit.vue'
import appCommande from './components/app-commande.vue'
import appRestauDetail from './components/app-restau-detail.vue'
import appMenuRestaurant from './components/app-menu-restaurant.vue'


window.onload = init;

function init() {
  Vue.component("edit", Edit)
  Vue.component("app-commande", appCommande)
  Vue.component("app-restau-detail", appRestauDetail)
  Vue.component("app-menu-restaurant", appMenuRestaurant)
  new Vue({
    el: "#app",
    render: h => h(App)
  });
}
