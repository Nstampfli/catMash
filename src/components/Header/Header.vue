<template>
  <header>
    <span class="logo">
      <router-link to="/">catmash</router-link>
    </span>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.logo {
  font-size: 2em;
  font-weight: bold;
  text-decoration: none;
}

.logo a {
  color: inherit;
  text-decoration: none;
}
</style>
