<template>
  <div 
    class="breadcrumb"
    v-if="!isLoading && breadcrumb.length > 1"
  >
    
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

import slugify from "slugify"

export default {
  name: "Breadcrumb",
  setup() {
    const store = useStore()
    const route = useRoute()

    const { getCategoryById } = useCategory()
    const { getBookById } = useBook()

    watch(route, (to, from) => {

      if(to.name == 'home') {
        store.commit('resetBreadcrumb')
      }

      if(to.name == 'category') {
        store.commit('resetBreadcrumb')
        const category = getCategoryById(to.query.id)
        store.commit('pushBreadcrumb', {
          path: to.fullPath,
          display: category.name,
        })
      }
      
      if(to.name == 'book-detail') {
        store.commit('resetBreadcrumb')

        const book = getBookById(to.query.id)
        const category = getCategoryById(book.categoryId)

        store.commit('pushBreadcrumb', {
          path: {
            name: 'category',
            params: { category: slugify(category.name, {lower: true, locale: 'vi'}) },
            query: { id: category.id }
          },
          display: category.name,
        })

        store.commit('pushBreadcrumb', {
          path: to.fullPath,
          display: book.title,
        })
       
      }

      if(to.name == 'about') {
        store.commit('resetBreadcrumb')
        store.commit('pushBreadcrumb', {
          path: to.fullPath,
          display: 'Về ShioBook',
        })
      }

      if(to.name == 'collection') {
        store.commit('resetBreadcrumb')
        let title = ''

        if(to.params.collection == 'sach-yeu-thich') title = 'Sách Yêu Thích'
        if(to.params.collection == 'sach-da-doc') title = 'Sách Đã Đọc'
        if(to.params.collection == 'sach-hay-nen-doc') title = 'Sách Hay Nên Đọc'
        if(to.params.collection == 'nguyen-nhat-anh') title = 'Nguyễn Nhật Ánh'
        if(to.params.collection == 'minato-kanae') title = 'Minato Kanae'
        if(to.params.collection == 'higashino-keigo') title = 'Higashino Keigo'
        if(to.params.collection == 'agatha-christie') title = 'Agatha Christie'
        if(to.params.collection == 'brian-tracy') title = 'Brian Tracy'

        store.commit('pushBreadcrumb', {
          path: to.fullPath,
          display: title
        })
      }

    })


    const breadcrumb = computed(() => store.getters.getBreadcrumb)
    const isLoading = computed(() => store.state.isLoading)

    return {
      breadcrumb,
      isLoading,
    }
  },
};
</script>

<style>
</style>