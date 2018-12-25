import Vue from 'vue';
window.onload = init;

function init() {


  new Vue({
    el: "#app",
    data: {
      restaurants: [{
        nom: 'café de Paris',
        cuisine: 'Française',
      },
        {
          nom: 'Sun City Café',
          cuisine: 'Américaine',
        }
      ],
      alert:false,
      creation_en_cours:false,
      edition_en_cours:false,
      en_edition:{
        name:'',
        cuisine:'',
        _id:""
      },
      nom: '',
      cuisine: '',
      nbRestaurants: 0,
      page: 0,
      nbRestaurantsParPage: 5,
      nomRecherche: ""

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
      searchRestaurantsFromServer: _.debounce(
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
  });
}
