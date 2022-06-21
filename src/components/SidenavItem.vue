<template>
  <router-link
    :to="{
      name: 'category',
      params: {
        category: slugPath,
      },
      query: {
        id: category.id
      }
    }"
  >
    <div class="sidenav__item">
      <div class="sidenav__item__title">{{ category.name }}</div>
      <div class="sidenav__item__badge">
        <span class="sidenav__item__badge__quantity">{{ category.quantity }}</span>
        <span class="sidenav__item__badge__icon"
          ><i class="bx bx-chevron-right"></i
        ></span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { ref } from 'vue'
import slugify from 'slugify'

export default {
  name: "SidenavItem",
  props: {
    category: Object,
  },
  setup(props) {
    const slugPath = ref(slugify(props.category.name, { lower: true }))

    return {
      slugPath,
    }
  },
};
</script>

<style>
</style>