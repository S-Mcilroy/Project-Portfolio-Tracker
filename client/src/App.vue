<template lang="html">
<div class="app">
  <search></search>
  <list-view :stocks="stocks"></list-view>
  <total-value :stocks="stocks"></total-value>

</div>
</template>

<script>
import Search from './components/center_panel/SearchBar.vue';
import ListView from './components/center_panel/ListView.vue';
import TotalValue from './components/left_panel/TotalValue.vue'
import TopPerforming from './components/right_panel/TopPerforming.vue'
import BottomPerforming from './components/right_panel/BottomPerforming.vue'
import Header from './components/Header.vue'
import {eventBus} from './main.js';

export default {
  name: 'app',
  data () {
    return {
      stocks: [],
      allSelectedSymbols: []
    };
  },


  methods: {


    getStockDetails: function() {

      const arrayOfSymbolsFromSearchBar = this.allSelectedSymbols
      const promises = arrayOfSymbolsFromSearchBar.map(num => {
        return fetch(
          `https://financialmodelingprep.com/api/v3/company/profile/${num}`
        ).then(res => res.json());
      });

      Promise.all(promises)
      .then(data => {
        const stockData = data.reduce(
          (flat, toFlatten) => flat.concat(toFlatten),
          []
        );
        stockData.forEach(stock => (stock));
        this.stocks = stockData;
      })
    },

    // markFavourite: function(beer) {
    //   const index = this.beers.indexOf(beer);
    //   this.beers[index].isFavourite = true;
    // },
    // unmarkFavourite: function(beer) {
    //   const index = this.beers.indexOf(beer);
    //   this.beers[index].isFavourite = false;
    // }
  },


  mounted() {
    eventBus.$on("symbol-added", allSelectedSymbols => {this.allSelectedSymbols = allSelectedSymbols,
      this.getStockDetails()});

      // eventBus.$on("favourite-added", beer => this.markFavourite(beer));
      //
      // eventBus.$on("favourite-removed", beer => this.unmarkFavourite(beer));
    },


    components: {
      'search': Search,
      'list-view': ListView,
      "total-value": TotalValue,
      "marquee-header": Header,
      "top-performing": TopPerforming,
      "bottom-performing": BottomPerforming
    },
  }

  </script>


  <style lang="css" scoped>
