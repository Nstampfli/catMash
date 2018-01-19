<template>
  <main>
    <p>404</p>
    <p>{{ this.$route.path }} doesn't exist</p>
  </main>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
main {
  padding-top: 50px;
}

</style>
