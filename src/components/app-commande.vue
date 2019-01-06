<template>

    <div v-if="state.booking_en_cours==true" class="card centred infoMenu">
      <form v-on:submit="book_restaurant($event)">
        <h3>COMMANDE</h3>
          <div v-model="state.en_edition.name"></div>
          Cuisine : <input style="margin-bottom: 15px" type="text" name="cuisine" v-model="state.en_edition.cuisine">
        <div class="button blue" v-on:click="abort_edition()" style="float:left;">Annuler </div>
        <button class="button green" style="float:right;" >Commander </button>
      </form>
    </div>

</template>

  <script>

  import Resto from '../class/Restaurants.js'
  export default {
    data() {
      return{
        state: Resto.state
      }
    },
    mounted(){

    },
    methods:{
      edit_restaurant(event){
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

<style scoped>
  .infoMenu{
    height: 200px;
    width:200px;
  }
</style>
