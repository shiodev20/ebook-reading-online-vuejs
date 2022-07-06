<template>

  <Grid :col="6" :smCol="2" :mdCol="3" :lgCol="4" :gap="20">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
    ></BookCard>
  </Grid>

  <Pagination 
    :pagination="currPagination"
    :page="currPage"
  ></Pagination>
</template>

<script>
import { ref, watch } from 'vue'

import useBook from '@/composables/useBook'
import { getPagination, getBooksPerPage } from '@/utils/pagination'

import Grid from '@/components/Grid.vue'
import BookCard from '@/components/BookCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useRoute } from 'vue-router'

export default {
  components: { Pagination, BookCard, Grid },
  setup() {
    const route = useRoute()
    const { getBooks } = useBook()
    

    const books = ref([])
    const pageSize = ref(3)
    const totalPages = ref(0)
    const currPage = ref(1)
    const currPagination = ref([])

    const initialPage = () => {
      
      totalPages.value = Math.ceil(getBooks().length / pageSize.value)
      currPagination.value = getPagination(currPage.value, totalPages.value)
      books.value = getBooksPerPage(getBooks(), currPage.value, pageSize.value)
    }

    initialPage()

    watch(route, (to, from) => {
      currPage.value = Number(to.query.page)

      initialPage()
      
    })
    return {
      books,
      currPagination,
      currPage,
    }
  }
}
</script>

<style>

</style>