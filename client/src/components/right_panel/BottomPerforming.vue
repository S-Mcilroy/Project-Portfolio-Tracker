<template lang="html">
<table style="width:100%">
  <p>Bottom Performing</p>
  <tr>
    <th>Ticker Name:</th>
    <th>Price:</th>
    <th>Change Percentage:</th>
  </tr>
  <tr v-for="stock in mostLoser">
    <td>{{stock.ticker}}</td>
    <td>${{stock.price}}</td>
    <td>{{stock.changesPercentage}}</td>
  </tr>
</table>
</template>

<script>
export default {
  name: "bottom-performing",
  data(){
    return {
      mostLoser: []
    }
  },
  methods: {

  },
  mounted(){
    fetch('https://financialmodelingprep.com/api/v3/stock/losers')
    .then(res => res.json())
    .then(data => this.mostLoser = data["mostLoserStock"])
  },
  computed: {

  }
}
</script>

<style lang="css" scoped>
</style>
