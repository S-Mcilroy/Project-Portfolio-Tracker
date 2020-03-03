<template lang="html">
  <div>
    <h3>Your Portfolio</h3>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" id = "chart"/>
    <br>
    <p>Total Value of Shares: ${{parseFloat(totalValue).toLocaleString()}}.00</p>
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
        'backgroundColor': "transparent",
        'pieHole': 0.2,
        'legend': {
          'position': 'none',
          'alignment': 'center',
          'textStyle': {
            'color': 'white'
          }
        },
        'chartArea': {
          'height': '100%',
          'width': '100%'
        },
        'colors': ['#028F18', '#840008', '#003900', '#004200', '#390000', '#4A0000', '#006B00', '#05D12A', '#02B01F']
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

h3 {
  display: flex;
  justify-content: center;
  background: #FFA500;
  color: #343A41;
}

p {
  display: flex;
  justify-content: center;
}
</style>
