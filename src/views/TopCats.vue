<template>
  <main>
    <div v-if="isFetching"
      class="loader"
    />
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <ul v-else-if="topIds.length"
      class="list list-topcats"
    >
      <li v-for="(id, index) in topIds" :key="id">
        <catmash-topcat
          :index="index"
          :cat="getCatById(id)"
        />
      </li>
    </ul>
    <div v-else>No votes yet.</div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TopCat from '@/components/TopCat'

export default {
  name: 'TopCats',
  computed: {
    ...mapState('cats', [
      'isFetching',
      'error',
      'ids'
    ]),
    ...mapGetters('cats', [
      'getCatById',
      'getScoreById'
    ]),
    topIds () {
      const mashupOnlyIds = this.ids.filter(id => this.getCatById(id).mashupCount > 0)
      return mashupOnlyIds.sort((a, b) => this.getScoreById(b) - this.getScoreById(a))
    }
  },
  methods: {
    ...mapActions('cats', [ 'fetchCats' ])
  },
  components: {
    'catmash-topcat': TopCat
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
  background-color: #f0f0f0;
}

@media (min-width: 768px) {
  main {
    padding-top: 50px;
  }
}
</style>
