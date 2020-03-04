<template lang="html">
  <div class="stock" v-if="stock" >

    <section id="top-list-view">
      <h2>{{stock.profile.companyName}}</h2>
      <img :src="stock.profile.image">
    </section>

    <div id="buttons">
      <input v-model="amount" type="number" name="amount" placeholder="Enter amount..." value="0" step="1" min="1">
      <button v-if="!counter >= 1 && !clientStockSymbols.includes(stock.symbol)" v-on:click="addToPortfolio" :stock="stock">Add to Portfolio</button>
      <button v-on:click="updatePortfolio" :stock="stock">Update Portfolio</button>
      <button v-on:click="removeFromPortfolio" :stock="stock" :clientStocks="clientStocks" >Remove from Portfolio</button>
      <button v-on:click="showChart" type="button">View/Hide Chart</button>
    </div>


    <ul>
      <li> <b>Symbol:</b> {{stock.symbol}}</li>
      <li> <b>Current Price:</b> ${{stock.profile.price.toLocaleString()}}</li>
      <li> <b>Volume:</b> {{parseFloat(stock.profile.volAvg).toLocaleString()}}</li>
      <li> <b>Absolute Change:</b> ${{stock.profile.changes.toLocaleString()}}</li>
      <li v-if="parseFloat(stock.profile.changesPercentage.slice(1, -1)) < 0"><b>Percentage Change:</b> <span style="color:#DC3546" >{{parseFloat(stock.profile.changesPercentage.slice(1, -1)).toFixed(2)}}% ▼</span></li>
      <li v-if="parseFloat(stock.profile.changesPercentage.slice(1, -1)) > 0"><b>Percentage Change:</b> <span style="color:#28A745" >{{parseFloat(stock.profile.changesPercentage.slice(1, -1)).toFixed(2)}}% ▲</span></li>
      <li v-if="parseFloat(stock.profile.changesPercentage.slice(1, -1)) == 0"><b>Percentage Change:</b> <span style="color:black" >{{parseFloat(stock.profile.changesPercentage.slice(1, -1)).toFixed(2)}}% ◀︎▶︎</span></li>
      <li><b>Sector:</b> {{stock.profile.sector}}</li>
      <li><b>Exchange:</b> {{stock.profile.exchange}}</li>
    </ul>


    <stockChart  hidden v-bind:id="classObject(stock)" :lastYear="lastYear" :stock="stock"/>
    <hr>

  </div>

</template>

<script>

import StockChart from './StockChart.vue';
import PortfolioService from '../../services/PortfolioService.js';
import { eventBus } from '../../main';


export default {
  name: "list-item",
  props: ['stock', 'clientStocks'],
  data(){
    return {
      amount: null,
      clientStockSymbols: [],
      lastYear: null,
      counter: 0
    }
  },
  methods: {
    getLastYear(){
      let yesterYear=new Date();
      yesterYear.setDate(-365);
      let yesterYearDate= yesterYear.getDate();
      let yesterYearMonth= yesterYear.getMonth();
      yesterYearMonth= yesterYearMonth+1;
      let yesterYearYear= yesterYear.getFullYear();
      this.lastYear = {
        year: yesterYearYear,
        month: yesterYearMonth,
        day: yesterYearDate
      }

    },
    addToPortfolio(e){
      e.preventDefault()
      this.counter = 1
      const newStock = {
        name: this.stock.profile.companyName,
        ticker: this.stock.symbol,
        volumeOfStocks: parseInt(this.amount),
        purchasePrice: this.stock.profile.price
      };
      if  (this.amount > 0 && typeof(parseInt(this.amount)) === 'number') {
        PortfolioService.postStock(newStock)
      }
    },

    removeFromPortfolio(){

      for (const clientStock of this.clientStocks){
        if (clientStock.ticker === this.stock.symbol){
          PortfolioService.deleteStock(clientStock._id)
        }
      }
    },

    updatePortfolio(e){
      e.preventDefault()
      const newStock = {
        name: this.stock.profile.companyName,
        ticker: this.stock.symbol,
        volumeOfStocks: parseInt(this.amount),
        purchasePrice: this.stock.profile.price
      };
      for (const clientStock of this.clientStocks){
        if (clientStock.ticker === this.stock.symbol){
          if  (this.amount > 0 && typeof(parseInt(this.amount)) === 'number') {
            PortfolioService.updateStock(clientStock._id, newStock)
          }
        }
      }
    },

    sortingClientStocks(){
      for (const stock of this.clientStocks){
        this.clientStockSymbols.push(stock.ticker)
      }
    },

    showChart(){
      let chartElement = document.getElementById(this.stock.symbol)
      if (chartElement.getAttribute("hidden")){
        chartElement.removeAttribute("hidden")
      } else {
        chartElement.setAttribute("hidden", "hidden")
      }
    },

    classObject(stock){
      return stock.symbol
    }
  },
  mounted(){
    this.sortingClientStocks()
    this.getLastYear()
  },
  components: {
    "stockChart":StockChart
  }
}

</script>

<style lang="css" scoped>

#top-list-view {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 2%;
}

button {
  color: white;
  background: #343A41;
  border: 1px solid lightgrey;
  width: 25%;
}

 button:hover {background-color: #FFA500;}

 button:active {}

input {
  background-color: orange;
  border: dimgray 1px solid;
  width: 25%;
}

#buttons {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-flow: column;
  margin-right: 5%;
}

ul {
  margin-top: -25%;
}

img {
  height: 80px;
  width: 80px;
  margin-bottom: 10px;
  margin-right: 5.5%;
}

li {
  list-style: none;
}

hr {
  border: black 1px solid;
}

h2 {
  margin-bottom: 10%;
}

</style>
