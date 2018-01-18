<template>
  <header>
    <span class="logo"><a href="/">catmash</a></span>
    <catmash-menu/>
  </header>
</template>

<script>
import Menu from './Menu/Menu'
export default {
  name: 'Header',
  components: {
    'catmash-menu': Menu
  }
}
</script>

<style scoped>
header {
  display: flex;
  border-bottom: 1px solid black;
}

a {
  color: inherit;
  text-decoration: none;
}

.logo {
  font-size: 2em;
  font-weight: bold;
  /* line-height: 1em; */
  text-decoration: none;
}
</style>
