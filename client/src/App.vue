<template lang="html">
  <div class="app">

    <stockChart v-if="lastYear" :lastYear="lastYear"/>
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
import StockChart from './components/center_panel/StockChart.vue';
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

      getLastYear(){
        let yesterYear=new Date();
        yesterYear.setDate(-365);
        let yesterYearDate= yesterYear.getDate();
        let yesterYearMonth= yesterYear.getMonth();
        yesterYearMonth= yesterYearMonth+1;
        let yesterYearYear= yesterYear.getFullYear();
        this.lastYear = {
          year: yesterYearYear,
          month: yesterYearMonth,
          day: yesterYearDate
        }

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
            this.chartData.push([clientStock.companyName, stock.profile.price])
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
      this.getLastYear()
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
        "stockChart":StockChart,
      }
    }

    </script>

    <style lang="css" scoped>
