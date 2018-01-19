<template>
  <main>
    <ul v-if="cats.length" class="topcats-list">
      <li :key="cat.id" v-for="cat in cats">
        <img :src="cat.url" :alt="cat.id"/>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  computed: {
    cats () {
      return this.$store.state.cats.all
    }
  },
  created () {
    if (this.cats.length === 0) {
      this.$store.dispatch('fetchCats')
    }
  }
}
</script>

<style scoped>
main {
  padding-top: 50px;
}

.topcats-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

.topcats-list li img {
  height: 200px;
}
</style>
