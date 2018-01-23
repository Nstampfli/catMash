<template>
  <main>
    <div v-if="isFetching" class="loader"/>
    <div v-else-if="error">{{ error.message }}</div>
    <ul v-else-if="topIds.length" class="list list-topcats">
      <li :key="id" v-for="(id, index) in topIds">
        <img :src="getCatById(id).url" :alt="getCatById(id).url"/>
        <div class="score">#{{ index + 1 }} ({{ getScore(id) }}%)</div>
      </li>
    </ul>
    <div v-else>No votes yet.</div>
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
      const mashupOnlyIds = this.ids.filter(id => this.getCatById(id).mashupCount > 0)
      return mashupOnlyIds.sort((a, b) => this.getScore(b) - this.getScore(a))
    }
  },
  methods: {
    ...mapActions('cats', [ 'fetchCats' ]),
    getScore (id) {
      const cat = this.getCatById(id)
      return Number((cat.voteCount / cat.mashupCount * 100).toFixed(2))
    }
  },
  created () {
    if (!this.ids.length) {
      this.fetchCats()
    }
  }
}
</script>

<style scoped>
.loader {
  margin: 50px auto;
}

.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.list-topcats {
  display: flex;
  flex-direction: column;
}

.list-topcats li {
  padding-top: 20px;
}

.list-topcats li:nth-child(2n+1) {
  background-color: #f3f3f3;
}

.list-topcats li img {
  width: 300px;
}

.list-topcats li .score {
  padding-bottom: 10px;
}

@media (min-width: 768px) {
  main {
    padding-top: 50px;
  }
}
</style>
