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
<hr>

  </div>

</template>

<script>

import PortfolioService from '../../services/PortfolioService.js';
// import { eventBus } from '../main';


export default {
  name: "list-item",
  props: ['stock'],

  methods: {
    // deleteStock(){
    //   PortfolioService.deleteStock(this.stock._id)
    //   .then(() => eventBus.$emit('stock-deleted', this.stock._id))
    // }
  }
}
</script>

<style lang="css" scoped>
.sighting {
	width: 30%;
	background: rgba(255, 255, 255, 0.7);
	margin-bottom: 20px;
	padding: 25px;
}

button {
	color: #fff;
	border: none;
	font-size: 18px;
	padding: 10px;
	margin-top: 10px;
	background: #F55536;
}
</style>
