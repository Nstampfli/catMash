<template>
  <div id="app">
    <catmash-header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'

export default {
  name: 'App',
  components: {
    'catmash-header': Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
