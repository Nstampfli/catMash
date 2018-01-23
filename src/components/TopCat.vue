<template>
  <div>
    <img
      :src="cat.url"
      :alt="cat.url"
    />
    <div class="score">
      #{{ index + 1 }} ({{ getScore(cat.voteCount, cat.mashupCount) * 100 }}%)
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopCat',
  props: [
    'index',
    'cat'
  ],
  computed: {
    ...mapGetters('cats', [ 'getScore' ])
  }
}
</script>

<style scoped>
img {
  width: 300px;
}

.score {
  font-weight: bold;
  padding-bottom: 10px;
}
</style>
