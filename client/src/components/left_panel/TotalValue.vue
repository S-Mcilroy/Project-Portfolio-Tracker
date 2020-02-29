<template lang="html">
  <div>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" id = "chart"/>
    <p>Total Value of Shares: ${{totalValue}}</p>
    <breakdown :totalValue="totalValue" :stocks="stocks" :clientStocks="clientStocks"/>
  </div>
</template>

<script>

import PortfolioService from '../../services/PortfolioService.js';
import Breakdown from './Breakdown.vue'
import { eventBus } from '../../main.js';

export default {
  name: "total-value",
  data(){
    return {
      chartOptions: {
      },
    }
  },
  props: ["stocks", "clientStocks", "chartData"],
  methods: {

  },
  mounted() {

  },
  computed: {
    totalValue(){
      let total = 0
      for (const clientStock of this.clientStocks){
        let stockPrice = 0
        for (const stock of this.stocks){
          if (clientStock.ticker === stock.symbol){
            stockPrice = stock.profile.price
          }
        }
        total += (clientStock.volumeOfStocks * stockPrice)
      }
      return total.toFixed(2);
    }
  },
  components: {
    "breakdown": Breakdown
  }

}
</script>

<style lang="css" scoped>
</style>
