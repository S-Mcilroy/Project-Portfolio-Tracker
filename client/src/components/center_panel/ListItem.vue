<template lang="html">
  <div class="stock">
    <h2>{{stock.profile.companyName}}</h2>
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

    <button v-on:click="addToPortfolio">Add to Portfolio</button>
    <!-- <button v-on:click="removeFromPortfolio">Remove from Portfolio</button> -->
<hr>

  </div>

</template>

<script>

import PortfolioService from '../../services/PortfolioService';
// import { eventBus } from '../main';


export default {
  name: "list-item",
  props: ['stock'],

  methods: {
  addToPortfolio(e){
          e.preventDefault()
          const game = {
            name: this.stock.profile.companyName,
            ticker: this.stock.symbol,
            volumeOfStocks: 44,
            purchasePrice: this.stock.profile.price
          }
          PortfolioService.postStock(game)
        },

  // removeFromPortfolio(){
  //     PortfolioService.deleteStock(this.stock._id)

    }
  }

</script>

<style lang="css" scoped>

</style>
