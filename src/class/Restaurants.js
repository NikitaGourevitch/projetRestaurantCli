class Restaurants {

  constructor() {
    this.state = {
      edit: false,
      create: false,
      restaurants: [],
      nom: '',
      cuisine: '',
      nbRestaurants: 0,
      page: 0,
      lastUsedId: 0,
      nbRestaurantsParPage: 5,
      nomRecherche: "",
      i: 0,
      cle: new Array(),
      platsCommandes: new Map(),
      creation_en_cours: false,
      edition_en_cours: false,
      infos_en_cours: false,
      totalPrice: 0,
      alert: false,
      en_edition: {
        name: '',
        cuisine: '',
        _id: "",
        coord: {
          lat: 0,
          long: 0
        },
        street: "",
        grade: "",
        score: ""
      }
    }
  }

  getplatsCommandes() {
    return this.state.platsCommandes
  }

  addPlatsCommandes(p) {
    
    if (this.state.platsCommandes.get(p._id)) {
      this.state.platsCommandes.get(p._id).qte++;
    } else {
      this.state.platsCommandes.set(p._id, p);
    }
    this.state.platsCommandes = new Map(this.state.platsCommandes)
    this.state.totalPrice += p.prix;
    this.state.i++;
    this.state.cle = Array.from(this.state.platsCommandes.keys())
  }

  dellToCart(p) {
    if (this.state.platsCommandes.get(p._id)) {
      if (this.state.platsCommandes.get(p._id).qte > 1) {
        this.state.platsCommandes.get(p._id).qte--;
      } else {
        this.state.platsCommandes.delete(p._id);
      }
      this.state.totalPrice -= p.prix;
      this.state.platsCommandes = new Map(this.state.platsCommandes);
      this.state.i++;
      this.state.cle = Array.from(this.state.platsCommandes.keys());
    }
  }

  getRestaurantsFromServer() {
    let url = "http://localhost:8080/api/restaurants?page=" +
      this.state.page + "&name=" + this.state.nomRecherche +
      "&pagesize=" + this.state.nbRestaurantsParPage;


    fetch(url)
      .then((reponseJSON) => {
        return reponseJSON.json();
      })
      .then((reponseJS) => {
        this.state.restaurants = reponseJS.data;
        this.state.nbRestaurants = reponseJS.count;

      })
      .catch((err) => {
        console.log("Une erreur est intervenue " + err);
      })

  }

  supprimerRestaurant(id) {
    let url = "http://localhost:8080/api/restaurants/" + id;

    fetch(url, {
      method: "DELETE",
    })
      .then((responseJSON) => {
        responseJSON.json()
          .then((res) => { // arrow function préserve le this
            // Maintenant res est un vrai objet JavaScript
            this.getRestaurantsFromServer();
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getInfosRestaurant(id) {
    let url = "http://localhost:8080/api/restaurants/" + id;

    fetch(url, {
      method: "GET",
    })
      .then((responseJSON) => {
        responseJSON.json()
          .then((res) => { // arrow function préserve le this
            // Maintenant res est un vrai objet JavaScript
            console.log(res);
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  abort_edition() {
    this.state.alert = false;
    this.state.creation_en_cours = false;
    this.state.edition_en_cours = false;
    this.state.infos_en_cours = false;
    this.state.en_edition.nom = '';
    this.state.en_edition.cuisine = '';
    this.state.en_edition.id = '';
    this.state.nom = "";
    this.state.cuisine = "";
  }

  open_create_restaurant() {
    this.state.alert = true;
    this.state.creation_en_cours = true;
  }

  oppen_see_infos(r) {
    this.getInfosRestaurant(r._id);
    this.state.alert = true;
    this.state.infos_en_cours = true;
    this.state.en_edition.name = r.name;
    this.state.en_edition.cuisine = r.cuisine;
    this.state.en_edition._id = r._id;
    this.state.en_edition.coord.lat = r.address.coord[0];
    this.state.en_edition.coord.long = r.address.coord[1];
    this.state.en_edition.street = r.address.street;
    this.state.en_edition.grade = r.grades[0].grade;
    this.state.en_edition.score = r.grades[0].score;
    this.calculeNote();
  }

  open_edit_restaurant(r) {
    this.state.en_edition.name = r.name;
    this.state.en_edition.cuisine = r.cuisine;
    this.state.en_edition._id = r._id;
    this.state.alert = true;
    this.state.edition_en_cours = true;
  }

  edit_restaurant(event) {

    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;

    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(form);

    let url = "http://localhost:8080/api/restaurants/" + this.state.en_edition._id;
    fetch(url, {
      method: "PUT",
      body: donneesFormulaire

    })
      .then((responseJSON) => {
        responseJSON.json()
          .then((res) => { // arrow function préserve le this
            // Maintenant res est un vrai objet JavaScript

            // remettre le formulaire à zéro
            this.state.en_edition.nom = '';
            this.state.en_edition.cuisine = '';
            this.state.en_edition.id = '';
            this.getRestaurantsFromServer();
            this.state.alert = false;
            this.state.edition_en_cours_en_cours = false;
          });
      })
      .catch(function (err) {
        console.log(err);

      });
  }

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

            // remettre le formulaire à zéro
            this.state.nom = "";
            this.state.cuisine = "";
            this.state.alert = false;
            this.getRestaurantsFromServer();
            this.state.creation_en_cours = false;
          });
      })
      .catch(function (err) {
        console.log(err);
      });

  }

  getColor(index) {
    return (index == 4) ? 'pink' : 'orange';
  }

  pagePrecedente() {
    if (this.state.page > 0) {
      this.state.page--;
      this.getRestaurantsFromServer();
    }
  }

  pageSuivante() {
    this.state.page++;
    this.getRestaurantsFromServer();

  }

  pageMax() {
    let pagemax = 0
    if (this.state.nbRestaurants % this.state.nbRestaurantsParPage != 0) {
      pagemax = (this.state.nbRestaurants - this.state.nbRestaurants % this.state.nbRestaurantsParPage) / this.state.nbRestaurantsParPage;
    } else {
      pagemax = (this.state.nbRestaurants) / this.state.nbRestaurantsParPage - 1;
    }
    return pagemax
  }

  derniere_page() {
    this.state.page = this.pageMax();
    this.getRestaurantsFromServer();
  }

  premiere_page() {
    this.state.page = 0;
    this.getRestaurantsFromServer();
  }

  changePageSize() {
    this.state.page = 0;
    this.getRestaurantsFromServer();
  }

  calculeNote() {
    switch (this.state.en_edition.grade) {
      case "A":
        this.state.en_edition.note = 5;
        break;
      case "B":
        this.state.en_edition.note = 4;
        break;
      case "C":
        this.state.en_edition.note = 3;
        break;
      case "D":
        this.state.en_edition.note = 2;
        break;
      case "E":
        this.state.en_edition.note = 1;
        break;

    }
  }
}

export default new Restaurants()
