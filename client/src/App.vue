<template lang="html">
<div>

<section id="Left">
  <total-value :stocks="stocks" :clientStocks="clientStocks" :chartData="chartData"/>
</section>

<section id="Center">
<search :clientStocks="clientStocks"/>
<list-view :stocks="stocks" :clientStocks="clientStocks"/>
</section>


  <section id="Right">
<top-performing/>
<bottom-performing/>
  </section>

  </div>

</template>

<script>
import Search from './components/center_panel/SearchBar.vue';
import ListView from './components/center_panel/ListView.vue';
import TotalValue from './components/left_panel/TotalValue.vue'
import TopPerforming from './components/right_panel/TopPerforming.vue'
import BottomPerforming from './components/right_panel/BottomPerforming.vue'
import Header from './components/Header.vue'
import PortfolioService from './services/PortfolioService.js';
import {eventBus} from './main.js';

export default {
  name: 'app',
  data () {
    return {
      stocks: [],
      allSelectedSymbols: [],
      clientStocks: [],
      chartData: [["Shares", "Current Value"]],
      chartDataChecker: [],
      lastYear: null
    };
  },


  methods: {
    fetchData(){
      PortfolioService.getStocks()
      .then(stocks => {this.clientStocks = stocks,
        this.updateSymbols()})
      },

      updateSymbols(){
        for (const stock of this.clientStocks){
          this.allSelectedSymbols.push(stock.ticker)
        };
        this.getStockDetails();
      },

      sortData(){
        for (const stock of this.stocks){
          for (const clientStock of this.clientStocks)
          if (stock.symbol === clientStock.ticker && !this.chartDataChecker.includes(clientStock.ticker)){
            this.chartData.push([clientStock.name, stock.profile.price])
            this.chartDataChecker.push(clientStock.ticker)
          }
        }
      },


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
          this.sortData();
        })
      }
    },
    mounted() {
      this.fetchData()
      eventBus.$on("symbol-added", allSelectedSymbols => {this.allSelectedSymbols.push(allSelectedSymbols.toString()),
        this.getStockDetails()});

      },
      components: {
        'search': Search,
        'list-view': ListView,
        "total-value": TotalValue,
        "marquee-header": Header,
        "top-performing": TopPerforming,
        "bottom-performing": BottomPerforming,
      }
    }

    </script>

    <style lang="css" scoped>
