<template lang="html">
  <section>
    <h1>Portfilo Tracker</h1>
    <p>Most Active Stocks:</p>
    <marquee v-if="activeStocks" behavior="scroll" direction="left">{{list}}</marquee>
  </section>
</template>

<script>
import PortfolioService from '../services/PortfolioService.js';

export default {
  name: "marquee-header",
  data(){
    return {
      activeStocks: [],
      list: ""
    }
  },
  props: [],
  mounted(){
    fetch('https://financialmodelingprep.com/api/v3/stock/actives')
    .then(res => res.json())
    .then(data => {this.activeStocks = data["mostActiveStock"],
    this.sortData()})
  },
  methods: {
    sortData(){
      for (const stock of this.activeStocks){
        this.list += (stock.ticker + stock.changesPercentage).concat() + " "
      }

    }
  },
  computed: {

  },
  components: {

  }
}
</script>

<style lang="css" scoped>
marquee {
  width: 30%;
}
</style>
