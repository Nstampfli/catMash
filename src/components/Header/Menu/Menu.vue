<template>
  <ul class="menu">
    <li><a href="/">Home</a></li>
    <li><a href="/ranking">Ranking</a></li>
    <li><a href="/vote">Vote</a></li>
  </ul>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style scoped>
.menu {
  align-items: center;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0 0 0 20px;
}

a {
  color: inherit;
  padding: 10px;
  text-decoration: none;
}

a:hover {
  background: #2c3e50;
  color: white;
}
</style>
