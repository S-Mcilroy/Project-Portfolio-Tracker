<template lang="html">
  <div>

    <section>
      <marquee-header></marquee-header>
    </section>

    <div class="row" id="app">

      <div class="col-md-3" id="total-value">
        <total-value :stocks="stocks" :clientStocks="clientStocks" :chartData="chartData"/>
      </div>


      <div class="col-md-6" id="center">
        <search id="searchbar" :clientStocks="clientStocks"/>
        <list-view id="list-items" :stocks="stocks" :clientStocks="clientStocks"/>
      </div>


      <div class="col-md-3" id="performing">
        <top-performing/>
        <bottom-performing/>
      </div>

    </div>

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
            this.chartData.push([clientStock.name, stock.profile.price*clientStock.volumeOfStocks])
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

    #list-items {
      overflow: scroll;
      height: 585px;
      border: black 1px solid;

    }

    #performing {
      overflow: scroll;
      border: black 1px solid;
      height: 650px;

    }

    #total-value {
      border: black 1px solid;
      overflow: scroll;
      height: 650px;

    }

    #center {
      border: black 1px solid;
      padding: 0;
    }

    #app {
      padding: 20px;
    }

    .col-md-3 {
      padding: 0
    }

    #searchbar {
      background-color: orange;
      padding-top: 0.01%;
      padding-bottom: 0.01%;
      align-self: center;
    }
    </style>
