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
        <img :src="categoryCover" :alt="category.name" />
      </div>
      <div class="category-card__title">{{ category.name }}</div>
    </div>
  </router-link>
</template>

<script>
import slugify from 'slugify'
import { ref } from '@vue/reactivity'
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