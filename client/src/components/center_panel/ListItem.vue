<template lang="html">
  <div class="stock" v-if="stock" >
    <h2 >{{stock.profile.companyName}}</h2>
    <img :src="stock.profile.image">
    <ul>
      <li>Symbol: {{stock.symbol}}</li>
      <li>Real-time Stock Price: ${{stock.profile.price.toLocaleString()}}</li>
      <li>Volume: {{parseFloat(stock.profile.volAvg).toLocaleString()}}</li>
      <li>Absolute Change: ${{stock.profile.changes.toLocaleString()}}</li>
      <li v-if="parseFloat(stock.profile.changesPercentage.slice(1, -1)) < 0">Percentage Change: <span style="color:#DC3546" >{{parseFloat(stock.profile.changesPercentage.slice(1, -1)).toFixed(2)}}%</span></li>
      <li v-if="parseFloat(stock.profile.changesPercentage.slice(1, -1)) > 0">Percentage Change: <span style="color:#28A745" >{{parseFloat(stock.profile.changesPercentage.slice(1, -1)).toFixed(2)}}%</span></li>
      <li>Sector: {{stock.profile.sector}}</li>
      <li>Exchange: {{stock.profile.exchange}}</li>
    </ul>

    <label for="amount">Volume:</label>
    <input v-model="amount" type="number" name="amount" value="0" step="1" min="1">
    <button v-on:click="addToPortfolio" :stock="stock">Add to Portfolio</button>
    <button v-on:click="updatePortfolio" :stock="stock">Update to Portfolio</button>
    <button v-on:click="removeFromPortfolio" :stock="stock" :clientStocks="clientStocks" >Remove from Portfolio</button>

    <button v-on:click="showChart" type="button">View/Hide Chart</button>
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
      lastYear: null
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

</style>
