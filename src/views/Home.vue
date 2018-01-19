<template>
  <main>
    <div class="cat-wrapper">
      <img :src="randomCatUrl" alt=""/>
    </div>
    <div class="cat-wrapper">
      <img :src="randomCatUrl" alt=""/>
    </div>
    <div class="topcats-wrapper">
      <a href="/topcats">Top Cats</a>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    randomCatUrl () {
      return this.$store.state.cats.all[0]
    }
  },
  created () {
    this.$store.dispatch('fetchCats')
  }
}
</script>

<style scoped>
main {
  display: flex;
}

.cat-wrapper {
  flex: 0 1 100%;
}

.topcats-wrapper {
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
}

.topcats-wrapper a {
  color: inherit;
  font-weight: bold;
  text-decoration: none;
}

.topcats-wrapper a:hover {
  text-decoration: underline;
}
</style>
