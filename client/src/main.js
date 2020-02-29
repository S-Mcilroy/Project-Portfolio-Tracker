import Vue from 'vue'
import App from './App.vue'
import VueGoogleCharts from 'vue-google-charts'

Vue.config.productionTip = false

Vue.use(VueGoogleCharts)

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
