<template lang="html">
  <div id='chartFrame'>
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
      yesterDate:null,//reciever for yesterdays date value (1-31)
      yesterMonth:null,//reciever for month from 'yesterday' value
      yesterYear:null,//reciever for year from 'yesterday' value
      weekAgo:null,
      weekDate:null,
      weekMonth:null,
      weekYear:null,
      fromDate:null,
      toDate:null,
      obtainedData:[],
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
          data: [],//dummy data to be replaced
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
    this.fromDate=this.parseDates(this.weekYear,this.weekMonth,this.weekDate); //converts date to match requirements for interpolation
    this.toDate=this.parseDates(this.yesterYear,this.yesterMonth,this.yesterDate);
    console.log(this.fromDate)
    console.log(this.toDate)

    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/GOOGL?from=${this.fromDate}&to=${this.toDate}`) //obtains stocks with dtae range- ticker to be modified at later date to include interpolation
    .then(res => res.json())
    .then(data =>{this.obtainedData=data["historical"],this.obtainClosePrice()});

    this.obtainClosePrice();





  },
  methods:{
    getDates(){ //this is method to fetch current date information, yesterdatys date and last weeks date and extract values to parse into fetch request
      this.day=this.today.getDate(); //uses 'today' from 'data' to get date
      this.month=this.today.getMonth();//uses 'today' from 'data' to get month
      this.month=this.month+1;//javascript uses 0-11 month format so adding 1 to month value
      this.year=this.today.getFullYear();//uses 'today' from 'data' to get year
      this.yesterday = new Date();//sets yesterday as todays date
      this.yesterday.setDate(-1);//updates yesterday equal to today minus 1(?)
      this.yesterDate=this.yesterday.getDate();//gets date (1-31) value of new 'yesterday' date value
      this.yesterMonth=this.yesterday.getMonth();//gets month value from 'yesterday' month value
      this.yesterMonth=this.yesterMonth+1
      this.yesterYear=this.yesterday.getFullYear();//gets year value from 'yesterday' year value
      this.weekAgo=new Date();//sets last week as todays date for start point
      this.weekAgo.setDate(-8);//todays date -8 days (so we have 7 COMPLETE days)
      this.weekDate=this.weekAgo.getDate();//obtains date (1-31) from 'weekAgo' date value
      this.weekMonth=this.weekAgo.getMonth();//obtains month data from 'weekAgo' month value
      this.weekMonth=this.weekMonth+1;//updates month value as javascript uses 0-11 format for months
      this.weekYear=this.weekAgo.getFullYear();//obtains year data from 'weekAgo' year value
    },
     parseDates(year,month,day){ //this is method to convert dates into format to match URL requirements
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
    },
    obtainClosePrice(){
      for (let i of this.obtainedData){
        this.options.series[0].data.push(i.close)
      }
    }
  }
}
</script>

<style lang="css" scoped>
#chartFrame{
  border: 2px solid blue;
}
</style>
