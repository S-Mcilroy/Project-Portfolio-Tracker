<template lang="html">
<table style="width:100%">
  <p>Top Performing</p>
  <tr>
    <th>Ticker Name:</th>
    <th>Price:</th>
    <th>Change Percentage:</th>
  </tr>
  <tr v-for="stock in mostGainer">
    <td>{{stock.ticker}}</td>
    <td>${{stock.price}}</td>
    <td>{{stock.changesPercentage}}</td>
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
</style>
