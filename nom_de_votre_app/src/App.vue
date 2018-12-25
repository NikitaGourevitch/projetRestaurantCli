<template>
  <div id="app">
    <h1>Resto à la carte</h1>
    <div v-if="alert==true" id="edition_layer">
      <div   v-if="edition_en_cours==true" class="card centred pop_up">
        <form v-on:submit="edit_restaurant(event)">
          <h3>Modiffier les informations</h3>
          Nom : <input type="text" name="nom" v-model="en_edition.name">


          Cuisine : <input style="margin-bottom: 15px" type="text" name="cuisine" v-model="en_edition.cuisine">
          <div class="button blue" v-on:click="abort_edition()" style="float:left;">Annuler </div>
          <button class="button green" style="float:right;" >Sauvegarder </button>
        </form>


      </div>
      <div  v-if="creation_en_cours==true"  class="card centred pop_up">
        <h3>Nouveau Restaurant</h3>
        <form   v-on:submit="ajouterRestaurant(event)(event)">
          Nom:
          <input type="text" name="nom" v-model="nom">
          Cuisine:
          <input style="margin-bottom: 15px" type="text" name="cuisine" v-model="cuisine">
          <div class="button blue" v-on:click="abort_edition()"style="float:left;">Annuler </div>
          <button class="button green" style="float:right;" >Rajouter</button>
        </form>

      </div>
    </div>

    <div class="card centred" id="main_container">


      <div id="recherche">
        <input v-on:input="searchRestaurantsFromServer" type="text" v-model="nomRecherche" placeholder="Rechercher">
        <img  v-on:click="open_create_restaurant()" class="actionIcon" src="src/img/add.png">
      </div>

      <div id="reglages">
        Nb restaurants par page :
        <input style="margin-top:10px;" type="range" min=5 max=100 value=10 v-on:input="changePageSize" v-model="nbRestaurantsParPage">
        {{nbRestaurantsParPage}}/{{nbRestaurants}}
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
          <tr v-for="r,index in restaurants">
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
        <div v-if="page!=0" class="pagination_element button blue"v-on:click="premiere_page()">first</div>
        <div v-if="page!=0"class=" pagination_element " v-on:click="pagePrecedente()">
          <div class=" icon_button button blue" style="float: right" >
            <img class=" actionIcon" src="src/img/prev.png">
          </div>
        </div>
        <div class=" pagination_element" style="padding-top:5px">{{page + 1}} / {{ pageMax()+1}}</div>
        <div v-if="page!= pageMax()"class=" pagination_element " v-on:click="pageSuivante()">
          <div class=" icon_button button blue" >
            <img class="actionIcon " src="src/img/next.png">
          </div>
        </div>
        <div v-if="page!= pageMax()"class=" pagination_element button blue" v-on:click=" derniere_page()">last</div>
      </div>
    </div>
  </div>

</template>

<script>

  import {debounce} from "lodash";
export default {
  data() {
    return {
      restaurants: [{
        nom: 'café de Paris',
        cuisine: 'Française',
      },
        {
          nom: 'Sun City Café',
          cuisine: 'Américaine',
        }
      ],
      alert: false,
      creation_en_cours: false,
      edition_en_cours: false,
      en_edition: {
        name: '',
        cuisine: '',
        _id: ""
      },
      nom: '',
      cuisine: '',
      nbRestaurants: 0,
      page: 0,
      nbRestaurantsParPage: 5,
      nomRecherche: ""
    }
  },
  mounted(){
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?page=" +
        this.page + "&name=" + this.nomRecherche +
        "&pagesize=" + this.nbRestaurantsParPage;

      console.log("Je vais chercher les restaurants sur : "+ url)

      fetch(url)
        .then((reponseJSON) => {
          //console.log("reponse json");
          return reponseJSON.json();
        })
        .then((reponseJS) => {
          // ici on a une réponse en JS
          this.restaurants = reponseJS.data;
          this.nbRestaurants = reponseJS.count;

        })
        .catch((err) => {
          console.log("Une erreur est intervenue " + err);
        })
    },

    // _.debounce vient de lodash et permet de n'appeler getRestaurantsFromServer que lorsqu'on a arrêté de taper
    // pendant 300ms, ça évite d'envoyer une requête au serveur à chaque touche...
    searchRestaurantsFromServer: debounce(
      function () {
        this.getRestaurantsFromServer();
      }, 300),


    supprimerRestaurant(id) {
      let url = "http://localhost:8080/api/restaurants/"+id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json()
            .then((res) => { // arrow function préserve le this
              // Maintenant res est un vrai objet JavaScript
              console.log("Restaurant supprimé");
              this.getRestaurantsFromServer();
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    abort_edition(){
      this.alert=false;
      this.creation_en_cours=false;
      this.edition_en_cours=false;
      this.en_edition.nom ='';
      this.en_edition.cuisine = '';
      this.en_edition.id = '';
      this.nom = "";
      this.cuisine = "";
    },
    open_create_restaurant(){
      this.alert=true;
      this.creation_en_cours=true;
    },
    open_edit_restaurant(r){
      console.log(r);
      this.en_edition.name = r.name;
      this.en_edition.cuisine = r.cuisine;
      this.en_edition._id = r._id;

      console.log(this.en_edition);
      this.alert=true;
      this.edition_en_cours=true;
    },
    edit_restaurant(event){

      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants/"+this.en_edition._id;
      console.log("edition",donneesFormulaire);
      fetch(url, {
        method: "PUT",
        body: donneesFormulaire

      })
        .then((responseJSON) => {
          responseJSON.json()
            .then((res) => { // arrow function préserve le this
              // Maintenant res est un vrai objet JavaScript
              console.log("Restaurant inséré");

              // remettre le formulaire à zéro
              this.en_edition.nom ='';
              this.en_edition.cuisine = '';
              this.en_edition.id = '';
              this.getRestaurantsFromServer();console.log(this.alert);
              this.alert=false;
              this.edition_en_cours_en_cours=false;
            });
        })
        .catch(function (err) {
          console.log(err);

        });

    },

    ajouterRestaurant(event) {
      // On récupère le formulaire
      // on l'envoie en multipart sur le serveur
      // Pour éviter que la page ne se ré-affiche
      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire
      })
        .then((responseJSON) => {
          responseJSON.json()
            .then((res) => { // arrow function préserve le this
              // Maintenant res est un vrai objet JavaScript
              console.log("Restaurant inséré");

              // remettre le formulaire à zéro
              this.nom = "";
              this.cuisine = "";
              this.alert=false;
              this.getRestaurantsFromServer();console.log(this.alert);
              this.creation_en_cours=false;
            });
        })
        .catch(function (err) {
          console.log(err);
        });

    },
    getColor(index) {
      return (index == 4) ? 'pink' : 'orange';
    },
    pagePrecedente() {
      if (this.page > 0) {
        this.page--;
        this.getRestaurantsFromServer();
      }
    },
    pageSuivante() {
      this.page++;
      this.getRestaurantsFromServer();
    },
    pageMax(){
      let pagemax = 0
      if (this.nbRestaurants%this.nbRestaurantsParPage != 0){
        pagemax = (this.nbRestaurants - this.nbRestaurants%this.nbRestaurantsParPage )/ this.nbRestaurantsParPage  ;
      }
      else {
        pagemax = (this.nbRestaurants)/ this.nbRestaurantsParPage  -1;
      }
      return pagemax
    },

    derniere_page() {
      this.page = this.pageMax();
      console.log((this.nbRestaurants+1)%10);
      this.getRestaurantsFromServer();
    },

    premiere_page() {
      this.page=0;
      this.getRestaurantsFromServer();
    },


    changePageSize() {
      this.page=0;
      this.getRestaurantsFromServer();
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
