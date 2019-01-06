<template>

  <div class=" centred infoMenu">

      <h3>MENU</h3>
    <div class="list" >
      <div class="header">
        <img src="src/img/entre.jpg"/>
        <div class="title">Entrés</div>
      </div>
      <div class="scrollContainer">
        <div v-for="e in entres" class="listElemnt">
          <div class="elementTexts">
            <div class="nomElement">{{e.nom}} <img v-on:click="addToCart(e)"class="add" src="src/img/add.png"/></div>
            <div class="descElement"> {{e.desc}}</div>
          </div>
          <div class="priceElement">{{e.prix}}€ </div>
        </div>
      </div>
    </div>
    <div class="list" style="margin-left:10px; margin-right: 10px;">
      <div class="header">
        <img src="src/img/plat.jpg"/>
        <div class="title">Plats</div>
      </div>
      <div class="scrollContainer">
        <div v-for="e in plats" class="listElemnt">
          <div class="elementTexts">
            <div class="nomElement">{{e.nom}} <img v-on:click="addToCart(e)"class="add" src="src/img/add.png"/></div>
            <div class="descElement"> {{e.desc}}</div>
          </div>
          <div class="priceElement">{{e.prix}}€ </div>
        </div>
      </div>
    </div>
    <div class="list" >
      <div class="header">
        <img src="src/img/dessert.jpg"/>
        <div class="title">Desserts</div>
      </div>
      <div class="scrollContainer">
        <div v-for="e in desserts" class="listElemnt">
          <div class="elementTexts">
            <div class="nomElement">{{e.nom}} <img v-on:click="addToCart(e)"class="add" src="src/img/add.png"/></div>
            <div class="descElement"> {{e.desc}}</div>
          </div>
          <div class="priceElement">{{e.prix}}€ </div>
        </div>
      </div>
    </div>
    </div>
     <!-- <div>Plats</div>
      <div>Desserts</div>-->


</template>

<script>

  import Resto from '../class/Restaurants.js'
  import '../class/loremIpsum.js'
  export default {
    data() {
      return{
        state: Resto.state,
        entres: this.crerPlats(10),
        plats: this.crerPlats(30),
        desserts: this.crerPlats(10),
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
      },

      crerPlats(PrixMax){

        let plats;
        plats= new Array();
        for(let i=0;i<10;i++){
          var ipsum = new LoremIpsum();
          console.log(ipsum.sentence(2));
            plats.push({
              nom: ipsum.sentence(2),
              desc: ipsum.sentence(10,15),
              prix: this._count(1,PrixMax)});
        }
        console.log(plats);
        return plats;

      },

      _count: function(min, max) {
        var result;
        if (min && max) result = Math.floor(Math.random() * (max - min + 1) + min);
        else if (min) result = min;
        else if (max) result = max;
        else result = this._random(8, 2);

        return result;
      }
    }


  }

</script>

<style scoped>

.infoMenu{
  width:770px;
  height: 250px
}
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
  .add{
    height:15px;
    float:right;
    cursor:pointer;
  }

</style>
