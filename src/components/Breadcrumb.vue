<template>
  <div class="breadcrumb" v-if="!isLoading">
    
    <template
      v-for="(item, idx) in breadcrumb"
      :key="idx"
    >
      <router-link
        class="breadcrumb__item"
        :class="[idx == breadcrumb.length - 1 ? 'active': '']"
        :to="item.path"
      >{{ item.display }}</router-link>

      <i
        class="bx bx-chevron-right"
        :style="{'display': idx == breadcrumb.length - 1 ? 'none': ''}"
      ></i>
    </template>

  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import useCategory from '@/composables/useCategory';
import useBook from '@/composables/useBook';
export default {
  name: "Breadcrumb",
  setup() {
    const store = useStore()
    const route = useRoute()

    const { getCategoryById } = useCategory()
    const {} = useBook()

    watch(route, (to, from) => {

      if(to.name == 'home') {
        store.commit('resetBreadcrumb')
      }

      if(to.name == 'category') {
        const category = getCategoryById(to.query.id)
        store.commit('pushBreadcrumb', {
          path: to.fullPath,
          display: category.name,
        })
      }
      
      if(to.name == 'book-detail') {}

      if(to.name == 'about') {}

      if(to.name == 'collection') {}

    })


    const breadcrumb = computed(() => store.getters.getBreadcrumb)
    const isLoading = computed(() => store.state.isLoading)

    console.log(breadcrumb.value);

    return {
      breadcrumb,
      isLoading,
    }
  },
};
</script>

<style>
</style>