<template>
  <div>
    <div v-if="isFetching"
      class="loader"
    />
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <img v-else
      :src="cat.url"
      :alt="cat.url"
      @click="$emit('vote')"
    />
  </div>
</template>

<script>
export default {
  name: 'HomeCat',
  props: [
    'isFetching',
    'error',
    'cat'
  ]
}
</script>

<style scoped>
img {
  width: 300px;
}

img:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
