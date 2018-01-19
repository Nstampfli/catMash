<template>
  <main>
    <div class="left-half">
      <img v-if="cats.length" :src="cats[leftCatIndex].url" :alt="cats[leftCatIndex].id"/>
    </div>
    <div class="right-half">
      <img v-if="cats.length" :src="cats[rightCatIndex].url" :alt="cats[rightCatIndex].id"/>
    </div>
    <div class="topcats">
      <a href="/topcats">Top Cats</a>
    </div>
  </main>
</template>

<script>
import { getRandomInt } from '@/utils/random'

export default {
  computed: {
    cats () {
      return this.$store.state.cats.all
    },
    leftCatIndex () {
      return getRandomInt(this.cats.length)
    },
    rightCatIndex () {
      let index = getRandomInt(this.cats.length)
      while (index === this.leftCatIndex) {
        index = getRandomInt(this.cats.length)
      }
      return index
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
  height: 100vh;
}

.left-half, .right-half {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  width: 50%;
}

.left-half img, .right-half img {
  width: 400px;
}

.left-half {
  background-color: #ededed;
}

.topcats {
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
}

.topcats a {
  color: inherit;
  font-weight: bold;
  text-decoration: none;
}

.topcats a:hover {
  text-decoration: underline;
}
</style>
