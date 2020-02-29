<template lang="html">
 <form v-on:submit="handleSubmit"  class="" >
   <h2>Type in Stock Symbol</h2>
   <div class="">
     <label for="selectedStockInput">Stock Symbol:</label>

     <select v-model="selectedStockInput">
         <option disabled value="">Select a ticker...</option>
         <option v-for="stockInput in stocksInput" :value="stockInput">{{stockInput.symbol}} - {{stockInput.name}}</option>
       </select>

   </div>
   </div>
<input type="submit" name="" value="ADD">
<hr>

 </form>
</template>

<script>
import PortfolioService from '../../services/PortfolioService.js';
import { eventBus } from '../../main';

export default {
  name: 'search',
  data () {
    return {
      selectedStockInput: {},
      stocksInput: [],
      allSelectedSymbols: []

    }
  },

  // https://financialmodelingprep.com/api/v3/quotes/NASDAQ
  mounted(){
    fetch('https://financialmodelingprep.com/api/v3/search?query=&exchange=NASDAQ')
    .then(res => res.json())
    .then(stocksInput => this.stocksInput = stocksInput)
    .then(() => this.sortStocks("symbol"));


  },


  methods: {

    sortStocks: function(property) {
      this.stocksInput.sort((a, b) => {
        return a[property] < b[property] ? -1 : 1;
      });
    },
    addToAllSelectedSymbols: function(selectedStockSymbol) {
      this.allSelectedSymbols.push(selectedStockSymbol),
      this.symbolArray();
    },

    handleSubmit(e){
      e.preventDefault()
        this.addToAllSelectedSymbols(this.selectedStockInput.symbol);
      },

      symbolArray: function() {
            eventBus.$emit("symbol-added", this.allSelectedSymbols);
          }



  }

}

</script>




<style lang="css" scoped>
</style>
