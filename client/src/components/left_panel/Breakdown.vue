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
      <td>{{getPercentageTotalValue(stock)}}</td>
      <td>{{stock.volumeOfStocks}}</td>
      <td style="color:red" v-if="stock.purchasePrice < 380.42">⬇</td> <!--  need to replace with api data -->
      <td style="color:green" v-if="stock.purchasePrice > 380.42">⬆</td>
      <td v-if="stock.purchasePrice === 380.42">-</td>
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
  props: ["clientStocks", "totalValue"],
  methods: {
    getPercentageTotalValue(stock){
      return (((stock.volumeOfStocks * stock.purchasePrice) / this.totalValue)*100).toFixed(2)
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
