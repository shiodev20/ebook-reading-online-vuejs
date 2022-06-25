<template>
  <router-link
    :to="{
      name: 'category',
      params: { category: categorySlug },
      query: { id: category.id },
    }"
    @click="$emit('active-sidenav', category.id)"
  >
    <div 
      class="sidenav__item"
      :class="[active ? 'active' : '']"
    >
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
import { useStore } from 'vuex';

export default {
  name: "SidenavItem",
  props: {
    category: Object,
    active: Boolean,
  },
  setup(props) {
    const store = useStore()

    const categorySlug = ref(slugify(props.category.name, { lower: true, locale: 'vi' }))
    
    return {
      categorySlug,
    }
  },
};
</script>

<style>
</style>