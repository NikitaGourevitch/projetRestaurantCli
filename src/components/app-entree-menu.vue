<template>
  <div class="list" >
    <div class="header">
      <img src="src/img/entre.jpg"/>
      <div class="title">Entrés</div>
    </div>
    <div class="scrollContainer">
      TOTAL{{state.totalPrice}}€
      <div v-for="e in Resto.platsCommandes" class="listElemnt">
        <div class="elementTexts">
          <div class="nomElement">{{e.nom}} <img v-on:click="addToCart(e)" class="add" src="src/img/add.png"/></div>
          <div class="descElement"> {{e.desc}}</div>
        </div>
        <div class="priceElement">{{e.prix}}€ </div>
      </div>
    </div>
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

<style scoped>

  .list{
    height: auto;
    width:250px;
    background-color: white;
    float: left;
  }
  .header{
    height:50px;
    width:100%;

  }
  .title{
    height:50px;
    width:250px;
    text-align: center;
    font-size: 30px;
    color:#fff;
    background-color: rgba(0,0,0,0.5);
    line-height: 50px;
    margin-top:-58px;
    position: absolute;
  }

  .header img{
    height:50px;
    width:250px;
    object-fit: cover;
  }

  .scrollContainer{
    height:150px;
    overflow-y:scroll;
    border:1px solid #cdcdcd;
  }
  .listElemnt{
    height:60px;
    width: 100%;
  }
  .elementTexts{
    padding:4px;
    float: left;
    width: 80%;
    height: 100%;

  }
  .nomElement{
    height:20px;
    font-size:12px;
    text-transform:uppercase;
    text-align: left;
    color: #3eb058;
  }

  .descElement{
    height:30px;
    font-size: 10px;
    text-align: left;
    line-height: 10px;
    color: #434343;
    overflow: hidden;
  }
  .priceElement{
    padding:5px;
    float: left;
    text-align: center;
    font-size:20px;
    line-height: 60px;
    text-transform:uppercase;
    border-left:1px solid #cdcdcd;
  }
</style>
