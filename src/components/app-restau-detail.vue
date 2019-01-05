<template>
    <div v-if="state.infos_en_cours==true" class="card centred infoMenu">
      <div class="map">
        <l-map ref="map" :zoom=13 :center="[state.en_edition.coord.lat, state.en_edition.coord.long]">
        </l-map>
      </div>
      <div class="photoResto">
        <img src="src/img/photoRestp.jpg"/>
         <div class="scoreBoard">
          Grade:
           <img v-if="this.note<1"  src="src/img/starEmpty.png"/>
           <img v-if="this.note<2" src="src/img/starEmpty.png"/>
           <img v-if="this.note<3" src="src/img/starEmpty.png"/>
           <img v-if="this.note<4" src="src/img/starEmpty.png"/>
           <img v-if="this.note<5" src="src/img/starEmpty.png"/>
          <img v-if="this.note>=1"  src="src/img/star.png"/>
          <img v-if="this.note>=2" src="src/img/star.png"/>
          <img v-if="this.note>=3" src="src/img/star.png"/>
          <img v-if="this.note>=4" src="src/img/star.png"/>
          <img v-if="this.note>=5" src="src/img/star.png"/>
        </div>
      </div>
      <div class="infos">
        <h2>{{state.en_edition.name}}</h2>
        <h3>{{state.en_edition.cuisine}}</h3>
        {{state.en_edition.street}}<br/>
        Score :{{state.en_edition.score}} /10
      </div>
      <div class="voirMenu centred" >Voir Menu</div>
      <div v-on:click="abort_edition()" style="margin-top:5px; cursor: pointer;">Fermer</div>
    </div>
</template>

<script>
  import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  import 'leaflet/dist/leaflet.css'
  import Resto from '../class/Restaurants.js'

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker
    },

    data() {
      return{
        state: Resto.state,
        menu:"",
        map: null,
        note:1
      }
    },
    mounted(){
      this.calculeNote();
    },
    methods:{
      get_menu_restaurant(event){
        this.menu = Resto.get_menu_restaurant(event);
      },
      ajouterRestaurant(event){
        Resto.ajouterRestaurant(event)
      },
      abort_edition(){
        Resto.abort_edition()
      },
      calculeNote(){
        switch(this.state.en_edition.grade){
          case "A":
            this.note=5;
            break;
          case "B":
            this.note=4;
            break;
          case "C":
            this.note=3;
            break;
          case "D":
            this.note=2;
            break;
          case "E":
            this.note=1;
            break;

        }
      },
      abort_edition(){
        Resto.abort_edition()
      }
    }
  }

</script>

<style scoped>
  .infoMenu{
    height: auto;
    width:800px;

  }

  .map{
    height:200px;
    width:100%;
    margin-bottom:20px;
  }
  .infos{
    float:left;
    font-size: 12px;
    width:550px;
    height:150px;
    padding-left:10px;
    text-align: left;
  }

  h2,h3{
    text-align: left;
    margin: 0px;
  }
  .photoResto{
    height:auto;
    width:200px;
    float: left;
    border-radius: 4px;
  }
  .photoResto>img{
    width:200px;

  }
  .scoreBoard{
    height: 25px;
    width: 200px;
    padding: 1px;
    padding-right:5px;
    padding-left:5px;
    text-align: left;
    line-height: 25px;
    margin-top: -18px;
    z-index: 10;
    background-color: rgba(255,255,255,0.5);
    margin-top: -32px;
    position: absolute;
  }

  .scoreBoard img{
    height:20px;
    float:right;
    margin-right: 4px;
    z-index: 10;
  }

  .voirMenu{
    height:30px;
    color:#3EB058;
    text-align: center;
    padding:2px;
    border:1px solid #3EB058;
    border-radius: 4px;
    position: relative;
    width: 80%;
    cursor: pointer;
  }
  .voirMenu:hover{
    background-color: aliceblue;
  }
</style>
