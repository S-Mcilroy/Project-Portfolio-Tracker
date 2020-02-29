<template lang="html">
  <div>
    <highcharts class="stock" :constructor-type="stockChart" :options="options"></highcharts>
  </div>
</template>

<script>
export default {
  data () {
    return {
      today:new Date(),
      day:null,
      month:null,
      year:null,
      yesterday:null,
      weekAgo:null,
      options: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: 'Name of company goes here'
        },
        yAxis:{
          title:{
            text:'Share Price'
          }
        },
        series: [{
          name: 'Ticker Name here',
          data: [181.72, 179.97, 180.52, 178.63, 600, 60, 44, 200, 400, 160.8, 45.3, 300.78, 25, 12, 53],
          // pointStart: Date.UTC(2018, 1, 1),
          // pointInterval: 1000 * 3600 * 24,
          tooltip: {
            valueDecimals: 2
          }
        }]
      }
    }
  },
  mounted(){
    this.getDates(),
    this.parseDates(),
    console.log(this.today),
    console.log(this.month),
    console.log(this.year)
    console.log(this.parseDates(this.day,this.month,this.year))
  },
  methods:{
    getDates(){ //this is method to fetch current date information
      this.day=this.today.getDate();
      this.month=this.today.getMonth();
      this.month=this.month+1;
      this.year=this.today.getFullYear();
      this.yesterday = new Date();
      this.yesterday=this.yesterday.setDate(this.yesterday.getDate()-1);
      console.log(this.yesterday)
    },
     parseDates(day,month,year){ //this is method to convert dates into format to match URL requirements
         // day=day;
         // month=month;
      if (day <10){
        let newDay=`0${day}`;
        day=newDay
      }else{
        day=`${day}`
      }
      if (month <10){
        let newMonth=`0${month}`
        month=newMonth
      }else{
        month=`${month}`
      }
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang="css" scoped>
</style>
