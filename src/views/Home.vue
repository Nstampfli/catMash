<template>
  <main>
    <div class="half left">
      <div v-if="isFetching && !ids.length" class="loader"/>
      <div v-if="error">{{ error.message }}</div>
      <img v-if="ids.length" :src="getCatById(leftId).url" :alt="getCatById(leftId).url" @click="addVote(leftId)"/>
    </div>
    <div class="half">
      <div v-if="isFetching && !ids.length" class="loader"/>
      <div v-if="error">{{ error.message }}</div>
      <img v-if="ids.length" :src="getCatById(rightId).url" :alt="getCatById(rightId).url" @click="addVote(rightId)"/>
    </div>
    <div class="link-wrapper">
      <router-link to="/topcats" class="link">Top Cats</router-link>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { ADD_VOTE } from '@/store/modules/cats'

export default {
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
    addVote (id) {
      this.ADD_VOTE({ id })
      this.leftFloat = Math.random()
      do {
        this.rightFloat = Math.random()
      } while (this.rightFloat === this.leftFloat)
    }
  },
  created () {
    while (this.rightFloat === this.leftFloat) {
      this.rightFloat = Math.random()
    }
    if (!this.ids.length) {
      this.fetchCats()
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  height: 100vh;
}

.half {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  width: 50%;
}

.half img {
  width: 400px;
}

.half img:hover {
  cursor: pointer;
  opacity: 0.8;
}

.left {
  background-color: #f3f3f3;
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
</style>
