<template>
  <main>
    <div class="half left">
      <catmash-homecat
        :isFetching="isFetching"
        :error="error"
        :cat="getCatById(leftId)"
        @vote="addVote(leftId, rightId)"
      />
    </div>
    <div class="half">
      <catmash-homecat
        :isFetching="isFetching"
        :error="error"
        :cat="getCatById(rightId)"
        @vote="addVote(rightId, leftId)"
      />
    </div>
    <div class="link-wrapper">
      <router-link to="/topcats" class="link">Top Cats</router-link>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { ADD_VOTE } from '@/store/modules/cats'
import HomeCat from '@/components/HomeCat'

export default {
  name: 'Home',
  data () {
    return {
      leftFloat: Math.random(),
      rightFloat: Math.random()
    }
  },
  computed: {
    ...mapState('cats', [
      'isFetching',
      'error',
      'ids'
    ]),
    ...mapGetters('cats', [ 'getCatById' ]),
    leftId () {
      const index = Math.floor(this.leftFloat * this.ids.length)
      return this.ids[index]
    },
    rightId () {
      const index = Math.floor(this.rightFloat * this.ids.length)
      return this.ids[index]
    }
  },
  methods: {
    ...mapActions('cats', [ 'fetchCats' ]),
    ...mapMutations('cats', [ ADD_VOTE ]),
    addVote (winnerId, loserId) {
      this.ADD_VOTE({
        winnerId,
        loserId
      })
      this.leftFloat = Math.random()
      this.rightFloat = Math.random()
    }
  },
  components: {
    'catmash-homecat': HomeCat
  },
  async created () {
    if (!this.ids.length) {
      await this.fetchCats()
    }
    if (this.leftId === this.rightId) {
      this.leftFloat = Math.random()
      this.rightFloat = Math.random()
    }
  },
  beforeUpdate () {
    while (this.leftId === this.rightId) {
      this.leftFloat = Math.random()
      this.rightFloat = Math.random()
    }
  }
}
</script>

<style scoped>
main {
  display: block;
  margin: 0 auto;
}

.half {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
}

.left {
  background-color: #f0f0f0;
}

.link-wrapper {
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
}

.link-wrapper .link {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
}

.link-wrapper .link:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  main {
    display: flex;
    height: 100vh;
  }

  .half {
    width: 50%;
  }
}
</style>
