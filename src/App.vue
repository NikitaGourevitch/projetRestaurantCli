<template>
  <div id="app">
    <h1><edit></edit></h1>
    <h1>Resto à la carte</h1>
    

    <div class="card centred" id="main_container">


      <div id="recherche">
        <input v-on:input="searchRestaurantsFromServer" type="text" v-model="state.nomRecherche" placeholder="Rechercher">
        <img v-on:click="open_create_restaurant()" class="actionIcon" src="src/img/add.png">
      </div>

      <div id="reglages">
        Nb restaurants par page :
        <input style="margin-top:10px;" type="range" min=5 max=100 value=10 v-on:input="changePageSize" v-model="state.nbRestaurantsParPage">
        {{state.nbRestaurantsParPage}}/{{state.nbRestaurants}}
      </div>
      <div class="tab_header">
        <div>
          NOM
        </div>
        <div>
          CUISINE
        </div>
      </div>
      <div id="results">
        <table style="width:100%;">
          <tr v-for="r in state.restaurants">
            <td style="width:50%;" >{{r.name}} </td>
            <td style="width:50%;">
              <div style="width:130px;float:left;word-wrap: break-word;">{{r.cuisine}}</div>
              <img  v-on:click="open_edit_restaurant(r)" class="actionIcon" src="src/img/pen.png">
              <img  v-on:click="supprimerRestaurant(r._id)" class="actionIcon" src="src/img/bin.png">

            </td>
          </tr>
        </table>
      </div>


      <div id="pagination">
        <div v-if="state.page!=0" class="pagination_element button blue" v-on:click="premiere_page()">first</div>
        <div v-if="state.page!=0" class="pagination_element " v-on:click="pagePrecedente()">
          <div class=" icon_button button blue" style="float: right" >
            <img class=" actionIcon" src="src/img/prev.png">
          </div>
        </div>
        <div class= "pagination_element" style="padding-top:5px">{{state.page + 1}} / {{ pageMax()+1}}</div>
        <div v-if="state.page!= pageMax()" class=" pagination_element " v-on:click="pageSuivante()">
          <div class=" icon_button button blue" >
            <img class="actionIcon " src="src/img/next.png">
          </div>
        </div>
        <div v-if="state.page != pageMax()" class="pagination_element button blue" v-on:click=" derniere_page()">last</div>
      </div>
    </div>
  </div>

</template>

<script>

import {debounce} from "lodash"
import Resto from './class/Restaurants.js'
export default {
  data() {
    return {
      state: Resto.state
    }
  },
  mounted(){
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    getRestaurantsFromServer() {
      Resto.getRestaurantsFromServer()
    },

    // _.debounce vient de lodash et permet de n'appeler getRestaurantsFromServer que lorsqu'on a arrêté de taper
    // pendant 300ms, ça évite d'envoyer une requête au serveur à chaque touche...
    searchRestaurantsFromServer: debounce(
      function () {
      this.getRestaurantsFromServer();
      }, 300),

    supprimerRestaurant(id) {
      Resto.supprimerRestaurant(id)
    },

    abort_edition(){
      Resto.abort_edition()
    },

    open_create_restaurant(){
      Resto.open_create_restaurant()
    },

    open_edit_restaurant(r){
      Resto.open_edit_restaurant(r)
    },

    getColor(index) {
      return Resto.getColor(index)
    },

    pagePrecedente() {
      Resto.pagePrecedente()
    },

    pageSuivante() {
      Resto.pageSuivante()
    },

    pageMax(){
      return Resto.pageMax()
    },

    derniere_page() {
      Resto.derniere_page()
    },

    premiere_page() {
      Resto.premiere_page()
    },

    changePageSize() {
      Resto.changePageSize()
    },
    edit_restaurant(event){
      console.log("Coucou, je suis l'event "+event)
      Resto.edit_restaurant(event)
    },
    ajouterRestaurant(event){
      Resto.ajouterRestaurant(event)
    },
    abort_edition(){
      Resto.abort_edition()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
