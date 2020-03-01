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

    <button  v-on:click="addToPortfolio" :stock="stock">Add to Portfolio</button>
    <button v-on:click="removeFromPortfolio" :stock="stock" :clientStocks="clientStocks" >Remove from Portfolio</button>
<hr>

  </div>

</template>

<script>


import PortfolioService from '../../services/PortfolioService.js';
// import { eventBus } from '../main';


export default {
  name: "list-item",
  props: ['stock', 'clientStocks'],

  methods: {
  addToPortfolio(e){
          e.preventDefault()
          const newStock = {
            name: this.stock.profile.companyName,
            ticker: this.stock.symbol,
            volumeOfStocks: 44,
            purchasePrice: this.stock.profile.price
          }
          PortfolioService.postStock(newStock)
        },

  removeFromPortfolio(){

      for (const clientStock of this.clientStocks){
        if (clientStock.ticker === this.stock.symbol){
          PortfolioService.deleteStock(clientStock._id)
        }
      }
    },

    }

    }



</script>

<style lang="css" scoped>

</style>
