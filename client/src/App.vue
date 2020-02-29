<template lang="html">

</template>

<script>
import TotalValue from './components/left_panel/TotalValue.vue'
import TopPerforming from './components/right_panel/TopPerforming.vue'
import BottomPerforming from './components/right_panel/BottomPerforming.vue'
import Header from './components/Header.vue'
export default {
  name: "app",
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
  mounted(){

  },
  components: {
    "total-value": TotalValue,
    "marquee-header": Header,
    "top-performing": TopPerforming,
    "bottom-performing": BottomPerforming
  }
}
</script>

<style lang="css" scoped>
</style>
