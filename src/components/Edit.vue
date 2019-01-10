<template>
  <div v-if="state.edition_en_cours==true" class="card centred pop_up">
    <form v-on:submit="edit_restaurant($event)">
      <h3>Modifier informations</h3>
      Nom : <input type="text" name="nom" v-model="state.en_edition.name">
      Cuisine : <input style="margin-bottom: 15px" type="text" name="cuisine" v-model="state.en_edition.cuisine">
      <div class="button blue" v-on:click="abort_edition()" style="float:left;">Annuler</div>
      <button class="button green" style="float:right;">Sauvegarder</button>
    </form>
  </div>

  <div v-else-if="state.creation_en_cours==true" class="card centred pop_up">
    <h3>Nouveau Restaurant</h3>
    <form v-on:submit="ajouterRestaurant($event)">
      Nom:
      <input type="text" name="nom" v-model="state.nom">
      Cuisine:
      <input style="margin-bottom: 15px" type="text" name="cuisine" v-model="state.cuisine">
      <div class="button blue" v-on:click="abort_edition()" style="float:left;">Annuler</div>
      <button class="button green" style="float:right;">Rajouter</button>
    </form>
  </div>
</template>

<script>

  import Resto from '../class/Restaurants.js'

  export default {
    data() {
      return {
        state: Resto.state
      }
    },
    mounted() {

    },
    methods: {
      edit_restaurant(event) {
        Resto.edit_restaurant(event)
      },
      ajouterRestaurant(event) {
        Resto.ajouterRestaurant(event)
      },
      abort_edition() {
        Resto.abort_edition()
      }
    }
  }
</script>

