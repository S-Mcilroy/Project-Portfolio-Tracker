<template lang="html">
  <div class="">
    <section>
      <h1>Portfilo Tracker</h1>
      
      <marquee-text
      :duration="10"
      :repeat="3"
      class="py-2 bg-dark text-white"
      >

      <span v-for="stock in activeStocks"><span v-bind:class="classObject(stock)">{{parseFloat(stock.changesPercentage.slice(1, -1)).toFixed(2)}}%</span>{{stock.ticker}}</span>
    </marquee-text>


  </section>
</div>
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

    },
    classObject(stock) {
      if (parseFloat(stock.changesPercentage.slice(1, -2)) < 0){
        return "badge badge-danger ml-2"
      } else if (parseFloat(stock.changesPercentage.slice(1, -2)) > 0) {
        return "badge badge-success ml-2"
      } else {
        return "badge badge-info ml-2"
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

@import'~bootstrap/dist/css/bootstrap.css';
table code {
  white-space: nowrap;
}

</style>
