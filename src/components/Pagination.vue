<template>
  <div class="pagination">
    <div 
      class="pagination__item pagination__item--navigation"
      @click="currPage = currPage - 1"
    >
      <i class="bx bx-chevron-left"></i>
    </div>

    <div 
      class="pagination__item"
      :class="[currPage == item ? 'pagination__item--active' : '']"
      v-for="(item, idx) in pagination"
      :key="idx"
      @click="currPage = item"
    >{{ item }}</div>

    <div 
      class="pagination__item pagination__item--navigation"
      @click="currPage = currPage + 1"
    >
      <i class="bx bx-chevron-right"></i>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Pagination',
  props: {
    pagination: Array,
    page: Number,
},
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const currPage = ref(props.page)
    
    watch(currPage, (n, o) => {
      if(n === '...') currPage.value = o
      if(n < 1) currPage.value = 1
      if(n > props.pagination[props.pagination.length - 1])
        currPage.value = props.pagination[props.pagination.length - 1]
      
      console.log(currPage.value);

      if(currPage.value === props.pagination.length) {
        return router.push({
          path: route.path,
          query: {
            ...route.query,
          }
        })
      }

      router.push({
          path: route.path,
          query: {
            ...route.query,
            page: n,
          }
        })

    })
    return {
      currPage,
    }
  }
};
</script>

<style>
</style>