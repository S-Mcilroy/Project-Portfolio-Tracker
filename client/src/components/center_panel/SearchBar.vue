<template lang="html">
  <div class="">
<!-- <form v-on:submit="handleSubmit"  class="" >
<h2>Type in Stock Symbol</h2>
<div class="">
<label for="selectedStockInput">Stock Symbol:</label>
<select v-model="selectedStockInput">
<option disabled value="">Select a ticker...</option>
<option v-for="stockInput in stocksInput" :value="stockInput">{{stockInput.symbol}} - {{stockInput.name}}</option>
</select>
</div>
<input type="submit" name="" value="ADD">
<hr>
</form> -->
<form v-on:submit="handleSubmit"  class="" >
  <div  style="margin:10% 25%;">
    <ejs-autocomplete  :autofill='false' v-model="selectedStockInput" :dataSource='dataItem' :fields='dataFields'
    placeholder="Select stock..." popupWidth="250px" :highlight="true"
    popupHeight="400px"></ejs-autocomplete>
  </div>

  <input type="submit" name="" value="ADD">
</form>
<hr>
</div>
</template>

<script>
import PortfolioService from '../../services/PortfolioService.js';
import { eventBus } from '../../main';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'; //https://www.youtube.com/watch?v=oFZf8uFAtQE

export default {
  name: 'search',
  data () {
    return {
      selectedStockInput: {},
      stocksInput: [],
      allSelectedSymbols: [],
      dataItem: [],
      dataFields: {value: 'Stock'}
    }
  },

  mounted(){
    fetch('https://financialmodelingprep.com/api/v3/search?query=&exchange=NASDAQ')
    .then(res => res.json())
    .then(stocksInput => this.stocksInput = stocksInput)
    .then(() => {this.sortStocks("symbol"),this.allAutocompleteSuggestions()});
  },

  methods: {
    sortStocks: function(property) {
      this.stocksInput.sort((a, b) => {
        return a[property] < b[property] ? -1 : 1;
      });
    },
    addToAllSelectedSymbols: function(selectedStockSymbol) {
      this.allSelectedSymbols.push(selectedStockSymbol),
      this.symbolArray(selectedStockSymbol);
    },

    handleSubmit(e){
      e.preventDefault()
      this.addToAllSelectedSymbols(this.selectedStockInput.split('#')[1]);
    },

    symbolArray: function(symbol) {
      eventBus.$emit("symbol-added", symbol);
    },

    allAutocompleteSuggestions: function() {
      for (const stockInput of this.stocksInput) {
        this.dataItem.push(`${stockInput.name} #${stockInput.symbol}`)
      }
    }
  }
}
</script>


<style lang="css" scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>
