<template>
  <div id="app">
    <div id='loading' class="loading" v-if="loading">
      <img src="/static/img/loading51.gif">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  data(){
    return{
      loading: false
    }
  },

  created(){
    this.$eventBus.$on("loadingStatus",payload=>{
      this.loading = payload;
      
    });
  }
}
</script>

