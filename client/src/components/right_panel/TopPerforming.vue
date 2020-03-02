<template lang="html">
<table style="width:100%">
  <p>Top Performing</p>
  <tr>
    <th>Ticker Name</th>
    <th id="right">Yesterday's Price ($)</th>
    <th id="right">Today's Price ($)</th>
    <th id="right">Change ($)</th>
  </tr>
  <tr v-for="stock in mostGainer">
    <td>{{stock.ticker}}</td>
    <td id="right">{{parseFloat(stock.price - stock.changes).toFixed(2)}}</td>
    <td id="right">{{parseFloat(stock.price).toFixed(2)}}</td>
    <td id="right" style="color:#28A745" v-if="parseFloat(stock.changes).toFixed(2) > 0">{{parseFloat(stock.changes).toFixed(2)}} ▲</td>
  </tr>
</table>
</template>

<script>
export default {
  name: "top-performing",
  data(){
    return {
      mostGainer: []
    }
  },
  methods: {

  },
  mounted(){
    fetch('https://financialmodelingprep.com/api/v3/stock/gainers')
    .then(res => res.json())
    .then(data => this.mostGainer = data["mostGainerStock"])
  },
  computed: {

  }
}
</script>

<style lang="css" scoped>
#right {
  text-align:right;
}

</style>
