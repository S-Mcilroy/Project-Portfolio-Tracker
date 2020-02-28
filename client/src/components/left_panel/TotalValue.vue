<template lang="html">
  <div>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" id = "chart"/>
    <p>Total Value of Shares: ${{totalValue}}</p>
  </div>
</template>

<script>

import PortfiloService from '../../services/PortfiloService';
import { eventBus } from '../../main';

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
      PortfiloService.getStocks()
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
        total += stock.purchasePrice // Replace with Prop Later
      }
      return total
    }
  }

}
</script>

<style lang="css" scoped>
</style>
