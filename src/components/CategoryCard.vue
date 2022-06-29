<template>
  <div class="category-card">
    <router-link
      :to="{
        name: 'category',
        params: { category: categorySlug },
        query: { id: category.id }
      }"
    >
        <img class="category-card__image" :src="categoryCover" :alt="category.name" />
      <div class="category-card__title">{{ category.name }}</div>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import slugify from 'slugify'

import useCategory from '@/composables/useCategory'

export default {
  name: 'CategoryCard',
  props: {
    category: Object
  },
  setup(props) {
    const { getCategoryCover } = useCategory()

    const categorySlug = ref(slugify(props.category.name, { lower: true, locale: 'vi' }))
    const categoryCover = ref(getCategoryCover(props.category.name))

    return {
      categorySlug,
      categoryCover
    }
  }
}
</script>

<style>

</style>