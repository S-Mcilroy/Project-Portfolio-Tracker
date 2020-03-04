<template lang="html">
  <marquee-text
  :duration="150"
  :repeat="3"
  class="py-2 bg-dark text-white"
  >

  <span v-for="article in articles">{{article.title}}🛑</a> </span>
  </marquee-text>
  </template>

<script>
export default {
  name:'news',
  data(){
    return{
    articles:[]
  }
  },
  mounted(){
    fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6ade14b636c045d3b4fa37fc76a73dad')
    .then(res => res.json())
    .then(data => this.articles = data['articles'])
  }
}
</script>

<style lang="css" scoped>
</style>
