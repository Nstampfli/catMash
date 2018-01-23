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

@media (min-width: 768px) {
  header {
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
