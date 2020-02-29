<template lang="html">
  <div>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" id = "chart"/>
    <p>Total Value of Shares: ${{totalValue}}</p>
    <breakdown :totalValue="totalValue" :clientStocks="clientStocks"/>
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
      clientStocks: [],
      chartData: [],
      chartOptions: {
      }
    }
  },
  methods: {
    fetchData(){
      PortfolioService.getStocks()
      .then(stocks => {this.clientStocks = stocks,
      this.sortData()});

    },
    sortData(){
      this.chartData.push(["Shares", "Current Value"])
      for (const stock of this.clientStocks){
        this.chartData.push([stock.companyName, stock.purchasePrice])
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    totalValue(){
      let total = 0
      for (const stock of this.clientStocks){
        total += (stock.purchasePrice * stock.volumeOfStocks)// Replace with Prop Later
      }
      return total
    }
  },
  components: {
    "breakdown": Breakdown
  }

}
</script>

<style lang="css" scoped>
</style>
