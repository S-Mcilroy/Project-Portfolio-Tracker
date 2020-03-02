import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
require('highcharts/highcharts-more')(Highcharts)
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import VueGoogleCharts from 'vue-google-charts'
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import MarqueeText from 'vue-marquee-text-component'

Vue.component('marquee-text', MarqueeText)

Vue.use(AutoCompletePlugin);

stockInit(Highcharts)

Vue.use(HighchartsVue)
Vue.use(VueGoogleCharts)


Vue.config.productionTip = false


export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
