<template>
    <div id="booking">
      <div id="buttonBooking"></div>
        <div class="list" >
          <div class="header">
            <img src="src/img/entre.jpg"/>
            <div class="title">Commande</div>
          </div>
          <div class="scrollContainer" >
          <div  v-for="e in state.cle.slice().reverse()" class="listElemnt">
              <div class="elementTexts">
                <div class="nomElement">{{state.platsCommandes.get(e).nom}}</div>
                <div class="descElement"> {{state.platsCommandes.get(e).desc}}</div>
                <div class ="manageQte">
                  <div class="moins"><img v-on:click="dellToCart(state.platsCommandes.get(e))" class="manageBtn centred" src="src/img/minus.png"/></div>
                  <div class="plus"><img v-on:click="addToCart(state.platsCommandes.get(e))" class="manageBtn centred" src="src/img/plus.png"/></div>
                </div>
                <div class="qte">{{state.platsCommandes.get(e).prix}}€ X {{state.platsCommandes.get(e).qte}}</div>
              </div>

              <div class="priceElement">{{state.platsCommandes.get(e).prix*state.platsCommandes.get(e).qte}}€ </div>


          </div>
          </div>
          <div>TOTAL : {{state.totalPrice}} €</div>
        </div>
      </div>

</template>

  <script>

  import Resto from '../class/Restaurants.js'
  export default {
    data() {
      return{
        state: Resto.state,
        seeBooking:true,
        total:Resto.state.totalPrice
      }
    },
    mounted(){
    },
    methods:{
      abort_edition(){
        Resto.abort_edition();
      },
      addToCart(p){
        Resto.addPlatsCommandes(p);
        console.log(p);
        this.state= Resto.state;
        this.total = Resto.state.totalPrice;
      },
      dellToCart(p){
        console.log(p);
        Resto.dellToCart(p);
        this.state= Resto.state;
        this.total = Resto.state.totalPrice;
      }
    }
  }

</script>

<style scoped>


  #booking{
    position:fixed;
    right:0px;
    bottom: 0px;
    background-color: #fff;
    height: 350px;
    width:250px;
  }

  .list{
    height: 350px;
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
    height:270px;
    overflow-y:scroll;
    border:1px solid #cdcdcd;
  }
  .listElemnt{
    height:110px;
    width: 100%;
  }
  .elementTexts{
    padding:4px;
    float: left;
    width: 80%;
    height: 120px;

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
    line-height: 110px;
    text-transform:uppercase;
    border-left:1px solid #cdcdcd;
  }
  .add{
    height:15px;
    float:right;
    cursor:pointer;
  }

  .manageQte{
    width:100%;
    height:40px;
    position: relative;

  }
  .moins{
    width: 48%;
    height:40px;

    float:left;
  }
  .plus{
    width: 48%;
    float:right;
    height:40px;
  }
  .qte{
    height:12px;
    line-height: 10px;
    font-size: 10px;
    color:#434343;
    padding-bottom: 4px;
    border-bottom: solid 1px #cdcdcd;

  }
  .manageBtn{
    height:30px;
    margin-top: 5px;
    cursor: pointer;
  }
</style>
