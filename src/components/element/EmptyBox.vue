<template>
  <div class="empty-box">
    <p class="empty-box__title">{{ title }}</p>
    <img class="empty-box__image" :src="imgUrl" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgUrl: {
      type: String,
      default: '/empty.svg'
    },
  },
};
</script>

<style>
</style>