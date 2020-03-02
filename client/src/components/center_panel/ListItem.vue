<template lang="html">
  <div class="stock" v-if="stock" >
    <h2 >{{stock.profile.companyName}}</h2>
    <img :src="stock.profile.image">
    <ul>
      <li>Symbol: {{stock.symbol}}</li>
      <li>Real-time Stock Price: {{stock.profile.price}}</li>
      <li>Volume: {{stock.profile.volAvg}}</li>
      <li>Absolute Change: {{stock.profile.changes}}</li>
      <li>Percentage Change: {{stock.profile.changesPercentage}}</li>
      <li>Sector: {{stock.profile.sector}}</li>
      <li>Exchange: {{stock.profile.exchange}}</li>
    </ul>

    <label for="amount">Volume:</label>
    <input v-model="amount" type="number" name="amount" value="0" step="1" min="1">
    <button v-on:click="addToPortfolio" :stock="stock">Add to Portfolio</button>
    <button v-on:click="updatePortfolio" :stock="stock">Update to Portfolio</button>
    <button v-on:click="removeFromPortfolio" :stock="stock" :clientStocks="clientStocks" >Remove from Portfolio</button>
    <stockChart :stock="stock"/>
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
      clientStockSymbols: []
    }
  },
  methods: {
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
  },
  mounted(){
    this.sortingClientStocks()
  },
  components: {
    "stockChart":StockChart
  }
}

</script>

<style lang="css" scoped>

</style>
