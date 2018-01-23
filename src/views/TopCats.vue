<template>
  <main>
    <div v-if="isFetching" class="loader"/>
    <div v-else-if="error">{{ error.message }}</div>
    <ul v-else class="list list-topcats">
      <li :key="id" v-for="(id, index) in topIds">
        <img :src="getCatById(id).url" :alt="getCatById(id).url"/>
        <div>#{{ index + 1 }} ({{ getCatById(id).score }} vote(s))</div>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('cats', [
      'isFetching',
      'error',
      'ids'
    ]),
    ...mapGetters('cats', [ 'getCatById' ]),
    topIds () {
      return this.ids.slice().sort((a, b) => {
        return this.getCatById(b).score - this.getCatById(a).score
      })
    }
  },
  methods: {
    ...mapActions('cats', [ 'fetchCats' ])
  },
  created () {
    if (!this.ids.length) {
      this.fetchCats()
    }
  }
}
</script>

<style scoped>
main {
  padding-top: 50px;
}

.loader {
  margin: 50px auto;
}

.list {
  list-style-type: none;
  padding-left: 0;
}

.list-topcats {
  display: flex;
  flex-direction: column;
}

.list-topcats li {
  padding-bottom: 20px;
}

.list-topcats li img {
  height: 200px;
}
</style>
