<template lang="html" >
<table style="width:100%" id="bottom">
  <p>Bottom Performing</p>
  <tr>
    <th>Ticker Name</th>
    <th id="right">Yesterday's Price ($)</th>
    <th id="right">Today's Price ($)</th>
    <th id="right">Change ($)</th>
  </tr>
  <tr v-for="stock in mostLoser">
    <td>{{stock.ticker}}</td>
    <td id="right">{{parseFloat(stock.price - stock.changes).toFixed(2)}}</td>
    <td id="right">{{parseFloat(stock.price).toFixed(2)}}</td>
    <td id="right" style="color:#DC3546" v-if="parseFloat(stock.changes).toFixed(2) < 0">{{parseFloat(stock.changes).toFixed(2)}} ▼</td>
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
#right {
  text-align:right;
}

#bottom{
  background-color: #343A41;

}

</style>
