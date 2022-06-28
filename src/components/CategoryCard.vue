<template>
  <router-link
    :to="{
      name: 'category',
      params: { category: categorySlug },
      query: { id: category.id }
    }"
  >
    <div class="category-card">
      <div class="category-card__image">
        <!-- <img :src="" :alt="" /> -->
        <img src="../assets/img/categories/the-loai.png" alt="">
      </div>
      <div class="category-card__title">{{ category.name }}</div>
    </div>
  </router-link>
</template>

<script>
import slugify from 'slugify'
import { ref } from '@vue/reactivity'

export default {
  name: 'CategoryCard',
  props: {
    category: Object
  },
  setup(props) {
    const categorySlug = ref(slugify(props.category.name, { lower: true, locale: 'vi' }))

    return {
      categorySlug,
    }
  }
}
</script>

<style>

</style>