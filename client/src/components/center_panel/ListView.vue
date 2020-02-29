<template lang="html">
	<div id="stocksList">
		<list-item v-for="(stock, index) in stocks" :keys="index" :stock="stock" />
	</div>
</template>

<script>
import SelectedStocksListItem from './ListItem';
// import SightingService from '../services/SightingService.js';
import { eventBus } from '../../main.js';

export default {
	name: "stocks-list",
  props: ['stocks'],
	data () {
    return {

    }
  },
	components: {
		'list-item': SelectedStocksListItem
	},
	mounted(){
	// 	PortfiloService.getSightings()
	// .then(stocks => this.stocks = stocks);

	// eventBus.$on('selected-stock-added', (stock) => {
	// 	this.selectedStocksList.push(stock)
	// })

	// eventBus.$on('stock-deleted', (id) => {
	// 	let index = this.stocks.findIndex(stock => stock._id === id)
	// 	this.stocks.splice(index, 1)
	// })
  },
  methods: {

  }

}
</script>

<style lang="css" scoped>
#sightingsGrid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

h2 {
	padding: 0;
	margin: 0;
}


</style>
