<template lang="html">
	<div id="stocksList">
		<list-item id="list-item" v-for="(stock, index) in stocks" :keys="index" :stock="stock" :clientStocks="clientStocks" />
	</div>
</template>

<script>
import SelectedStocksListItem from './ListItem';
// import SightingService from '../services/SightingService.js';
import { eventBus } from '../../main.js';

export default {
	name: "stocks-list",
	props: ['stocks', 'clientStocks'],
	data () {
		return {
		}
	},
	components: {
		'list-item': SelectedStocksListItem
	},
	mounted(){
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

#list-item {

}

</style>
