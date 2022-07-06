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
      v-for="(page, idx) in pagination"
      :key="idx"
      @click="currPage = page"
    >{{ page }}</div>

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

export default {
  name: 'Pagination',
  props: {
    pagination: Array,
  },
  setup(props) {
    const currPage = ref(1)
    
    watch(currPage, (n, o) => {
      // if(n < 1) currPage.value = 1
      // if(n > props.pagination[props.pagination.length - 1]) 
      //   currPage.value = props.pagination[props.pagination.length - 1]

      // if(n < 1) currPage.value = 1
      // if(n > testPage.value[testPage.value.length - 1]) 
      //   currPage.value = testPage.value[testPage.value.length - 1]
        
    })
    return {
      currPage,
    }
  }
};
</script>

<style>
</style>