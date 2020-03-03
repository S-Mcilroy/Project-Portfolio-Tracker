<template lang="html">
  <table style="width:100%">
    <tr>
      <th>Ticker</th>
      <th>% of TV</th>
      <th>#</th>
      <th>Trend</th>
    </tr>
    <tr v-for="stock in clientStocks">
      <td>{{stock.ticker}}</td>
      <td id="right" >{{getPercentageTotalValue(stock)}}%</td>
      <td id="right" >{{parseFloat(stock.volumeOfStocks).toLocaleString()}}</td>
      <td id="center" style="color:#DC3546" v-if="stock.purchasePrice > getStockPrice(stock)">▼</td>
      <td id="center" style="color:#28A745" v-if="stock.purchasePrice < getStockPrice(stock)">▲</td>
      <td id="center" v-if="stock.purchasePrice === getStockPrice(stock)">◀︎▶︎</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "breakdown",
  data(){
    return {

    }
  },
  props: ["clientStocks", "totalValue", "stocks"],
  methods: {
    getPercentageTotalValue(currentStock){
      let stockPrice = 0
      for (const stock of this.stocks){
        if (currentStock.ticker === stock.symbol){
          stockPrice = stock.profile.price
        }
      }
      return (((currentStock.volumeOfStocks * stockPrice) / this.totalValue)*100).toFixed(1)
    },
    getStockPrice(currentStock){
      let stockPrice = 0
      for (const stock of this.stocks){
        if (currentStock.ticker === stock.symbol){
          stockPrice = stock.profile.price
        }
      }
      return stockPrice
    }

  },
  computed: {

  },
  mounted(){

  }
}
</script>


<style lang="css" scoped>

#right {
  text-align:right;
}
#center {
  text-align:center;
}

td {
  width: 25%;
}

th {
  text-align: center;

}

table tr:nth-child(even){background-color: #696969;}
table tr:hover {background-color: #FFA500;}
table th {
  background-color: gray;
  color: white;
}


</style>
