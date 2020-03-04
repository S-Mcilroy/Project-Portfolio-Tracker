<template lang="html">
  <marquee-text
  :duration="150"
  :repeat="3"
  class="py-2 bg-dark text-white"
  >

  <span v-for="article in articles" > <a :href="article.url" target='blank' >{{article.title}} 🛑</a> </span>
</marquee-text>
</template>

<script>
export default {
  name:'news',
  data(){
    return{
      articles:[],
      apiKey: ""
    }
  },
  mounted(){
    fetch('http://localhost:3000/api/api')
    .then(res => res.json())
    .then(data => {this.apiKey = data[0].api_key;
      fetch(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.apiKey}`)
        .then(res => res.json())
        .then(data => this.articles = data['articles'])
      })

    }
  }
</script>

<style lang="css" scoped>

  a:visited{
    color:white;
  }
  a:active{
    color:white;
  }
  a:link{
    color:white;
  }

</style>
