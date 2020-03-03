<template lang="html">
  <div class="">
    <h4>Bottom Performing</h4>
    <table style="width:100%">
      <tr>
        <th>Ticker</th>
        <!-- <th id="right">Yesterday's Price ($)</th> -->
        <th id="right">Price ($)</th>
        <th id="right">Change ($)</th>
        <th id="center">Trend</th>
      </tr>
      <tr v-for="stock in mostLoser">
        <td>{{stock.ticker}}</td>
        <!-- <td id="right">{{parseFloat(stock.price - stock.changes).toFixed(2)}}</td> -->
        <td id="right">{{parseFloat(stock.price).toFixed(1)}}</td>
        <td id="right" style="color:#DC3546" v-if="parseFloat(stock.changes).toFixed(1) < 0">{{parseFloat(stock.changes).toFixed(1)}} ▼</td>
        <td><ejs-sparkline :id='(mostLoser.indexOf(stock))+1000' align="center" :dataSource='dataSource[mostLoser.indexOf(stock)]' fill='#DC3546'   :height='height' :width='width'></ejs-sparkline></td>
      </tr>
    </table>




  </div>
</template>

<script>
import { SparklinePlugin, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  name: "bottom-performing",
  data(){
    return {
      mostLoser: [],
      arrayOfSymbolsOfTopPerf: [],
      allTops: [],
      allHistorical: [],
      allCloseShort: [],
      allClose: [],
      b: [],
      id: [],
      series: "",
      allPrices: [],
      height: '20px',
      width: '80px',
      dataSource: []
    }
  },
  provide: {
    sparkline:[SparklineTooltip]
  },
  methods: {

    addToAllHistorical: function() {
      for (const topPerformer of this.allTops) {
        this.allHistorical.push(topPerformer.historical)
      };
      this.addToAllCloseShort();
    },

    addToAllCloseShort: function() {
      for (let array of this.allHistorical) {
        const shortArray=array.slice(-43)
        this.allCloseShort.push(shortArray)

      }

      this.addToAllClose();
    },
    addToAllClose: function() {
      for (let array of this.allCloseShort) {
        for (let object of array) {
          let a=Object.values(object)

          this.allClose.push(a[1])
        }
      }
      this.split(this.allClose, 43);
    },

    split: function (arr, n) {
      var res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return this.dataSource=res;
    },
    addToId: function () {
      for (const stock of this.mostLoser) {
        this.Id.push(`btm${this.mostLoser.indexOf(stock)}`)
      }
    },
    handleDataSource: function (){
      for (const stock of this.mostLoser) {
        return "dataSource["+`${this.mostLoser.indexOf(stock)}`+"]"
      }
    },

    // for (topPerformer of this.allTops.historical) {
    //   this.allPrices.push({yval: topPerformer.historical.close})
    //   }
    // this.dataSource.push(this.allPrices.slice(-10))


    //  for (const price of this.allHistory) {
    //    this.allPrices.push({yval: price.close})
    //  };
    // this.dataSource = this.allPrices.slice(-10)



    addToArrayOfSymbolsOfTopPerf: function () {
      for (const topPerformer of this.mostLoser) {
        this.arrayOfSymbolsOfTopPerf.push(topPerformer.ticker)
      };
      this.getTopPerf();
    },

    getTopPerf: function() {

      const promises = this.arrayOfSymbolsOfTopPerf.map(num => {
        return fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${num}?serietype=line`
        ).then(res => res.json());
      });

      Promise.all(promises)
      .then(data => {
        const topData = data.reduce(
          (flat, toFlatten) => flat.concat(toFlatten),
          []
        );
        topData.forEach(stock => (stock));
        this.allTops = topData;
        this.addToAllHistorical();
      })
    }

  },
  mounted(){
    fetch('https://financialmodelingprep.com/api/v3/stock/losers')
    .then(res => res.json())
    .then(data => {this.mostLoser = data["mostLoserStock"],
    this.addToArrayOfSymbolsOfTopPerf()
  });




  // fetch('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line')
  // .then(res => res.json())
  // .then(data => {this.allHistory = data.historical,
  // this.addToHistory2w()});



},
computed: {

}
}
</script>

<style lang="css" scoped>
#right {
  text-align:right;
}
#center {
  text-align: center;
}

h4 {
  display: flex;
  justify-content: center;
  background: #FFA500;
  color: #343A41;
  width: 100%
}

table tr:nth-child(even){background-color: #696969;}
table tr:hover {background-color: #FFA500;}
table th {
  background-color: gray;
  color: white;
  text-align:center;
}

#bottom{
  background-color: #343A41;

}

</style>
