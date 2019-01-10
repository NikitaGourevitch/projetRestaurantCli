<template>

  <div v-if="state.infos_en_cours==true" class="card centred infoResto">
    <img class="closeButton" v-on:click="abort_edition()" src="src/img/cross.png"/>
    <div id="map" class="map"></div>

    <div class="photoResto">
      <img src="src/img/photoRestp.jpg"/>
      <div class="scoreBoard">
        Grade:
        <img v-if="this.state.en_edition.note<1" src="src/img/starEmpty.png"/>
        <img v-if="this.state.en_edition.note<2" src="src/img/starEmpty.png"/>
        <img v-if="this.state.en_edition.note<3" src="src/img/starEmpty.png"/>
        <img v-if="this.state.en_edition.note<4" src="src/img/starEmpty.png"/>
        <img v-if="this.state.en_edition.note<5" src="src/img/starEmpty.png"/>
        <img v-if="this.state.en_edition.note>=1" src="src/img/star.png"/>
        <img v-if="this.state.en_edition.note>=2" src="src/img/star.png"/>
        <img v-if="this.state.en_edition.note>=3" src="src/img/star.png"/>
        <img v-if="this.state.en_edition.note>=4" src="src/img/star.png"/>
        <img v-if="this.state.en_edition.note>=5" src="src/img/star.png"/>
      </div>
    </div>
    <div class="infos">
      <h2>{{state.en_edition.name}}</h2>
      <h3>{{state.en_edition.cuisine}}</h3>
      {{state.en_edition.street}}<br/>
      Score :{{state.en_edition.score}} /10
    </div>
    <div v-if="menuActif==false" v-on:click="ouvrirMenu()" class="voirMenu centred">Voir Menu</div>
    <!--<div v-on:click="abort_edition()" style="margin-top:5px; cursor: pointer;">Fermer</div>-->
    <app-menu-restaurant v-if="menuActif==true"></app-menu-restaurant>
  </div>
</template>

<script>
  import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
  import 'leaflet/dist/leaflet.css'
  import Resto from '../class/Restaurants.js'

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker
    },

    data() {
      return {
        menuActif: false,
        state: Resto.state,
        menu: "",
        map: null,
        note: 1
      }
    },
    mounted() {
      this.setMap();
    },
    methods: {
      setMap() {
        var map = L.map('map').setView([this.state.en_edition.coord.long, this.state.en_edition.coord.lat], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var icon = new L.Icon.Default();
        icon.options.shadowSize = [0, 0];
        var marker = new L.Marker(map.getCenter(), {icon: icon}).addTo(map);
      },

      ouvrirMenu() {
        this.menuActif = true;
        console.log(this.menuActif);
      },
      abort_edition() {
        Resto.abort_edition()
      },
      abort_edition() {
        Resto.abort_edition()
      }
    }
  }

</script>

<style scoped>
  .infoResto {
    height: auto;
    width: 800px;

  }

  .map {
    height: 200px;
    width: 100%;
    margin-bottom: 40px;
  }

  .infos {
    float: left;
    font-size: 12px;
    width: 550px;
    height: 150px;
    padding-left: 10px;
    text-align: left;
  }

  h2, h3 {
    text-align: left;
    margin: 0px;
  }

  .photoResto {
    height: auto;
    width: 200px;
    float: left;
    border-radius: 4px;
  }

  .photoResto > img {
    width: 200px;

  }

  .scoreBoard {
    height: 25px;
    width: 200px;
    padding: 1px;
    padding-right: 5px;
    padding-left: 5px;
    text-align: left;
    line-height: 25px;
    margin-top: -18px;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: -32px;
    position: absolute;
  }

  .scoreBoard img {
    height: 20px;
    float: right;
    margin-right: 4px;
    z-index: 10;
  }

  .voirMenu {
    height: 30px;
    color: #3EB058;
    text-align: center;
    padding: 2px;
    border: 1px solid #3EB058;
    border-radius: 4px;
    position: relative;
    width: 80%;
    cursor: pointer;
  }

  .voirMenu:hover {
    background-color: aliceblue;
  }

</style>
