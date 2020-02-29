<template lang="html">
  <table style="width:100%">
    <tr>
      <th>Company Name:</th>
      <th>Percentage of Total Value:</th>
      <th>Amount of Stocks:</th>
      <th>Trend:</th>
    </tr>
    <tr v-for="stock in clientStocks">
      <td>{{stock.companyName}}</td>
      <td>{{getPercentageTotalValue(stock)}}%</td>
      <td>{{stock.volumeOfStocks}}</td>
      <td style="color:red" v-if="stock.purchasePrice > getStockPrice(stock)">⬇</td> <!--  need to replace with api data -->
      <td style="color:green" v-if="stock.purchasePrice < getStockPrice(stock)">⬆</td>
      <td v-if="stock.purchasePrice === getStockPrice(stock)">-</td>
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
      return (((currentStock.volumeOfStocks * stockPrice) / this.totalValue)*100).toFixed(0)
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
</style>
