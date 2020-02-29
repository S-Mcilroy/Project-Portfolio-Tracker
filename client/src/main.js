import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import VueGoogleCharts from 'vue-google-charts'

stockInit(Highcharts)

Vue.use(HighchartsVue)
Vue.use(VueGoogleCharts)


Vue.config.productionTip = false


export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
