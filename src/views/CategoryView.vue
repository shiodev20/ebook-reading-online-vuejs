<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>
  <template v-else>
    <SectionContainer>
      <SectionTitle>" {{ category.name }} "</SectionTitle>
      <SectionBody>
        <Grid :smCol="2" :mdCol="3" :lgCol="4" :col="6" :gap="40">
          <BookCard
            v-for="book in booksByCategory"
            :key="book.id"
            :book="book"
          ></BookCard>
        </Grid>
      </SectionBody>
    </SectionContainer>

    <SectionContainer>
      <SectionBody>
        <!-- <div class="pagination">
          <div
            class="pagination__item pagination__item--navigation"
            @click="currPage = currPage - 1"
          >
            <i class="bx bx-chevron-left"></i>
          </div>
          
            <div
              class="pagination__item"
              v-for="(page, idx) in currPagination"
              :key="idx"
              :class="[currPage == idx + 1 ? 'pagination__item--active' : '']"
              @click="currPage = page"
            >
              {{ page }}
            </div>

          <div
            class="pagination__item pagination__item--navigation"
            @click="currPage = currPage + 1"
          >
            <i class="bx bx-chevron-right"></i>
          </div>
        </div> -->
        <Pagination
          :pagination="currPagination"
        >
        </Pagination>
      </SectionBody>
    </SectionContainer>
  </template>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import useBook from '@/composables/useBook';
import useCategory from '@/composables/useCategory';

import Grid from "@/components/Grid.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionBody from "@/components/SectionBody.vue";
import BookCard from "@/components/BookCard.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from '@/components/Loading.vue';

import { getPagination, getBooksPerPage } from "@/utils/pagination";

export default {
  name: "CategoryView",
  components: {
    Grid,
    SectionContainer,
    SectionTitle,
    SectionBody,
    BookCard,
    Pagination,
    Loading,
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const { getBooksByCategory } = useBook()
    const { getCategoryById } = useCategory()

    const category = ref({})
    const booksByCategory = ref([]);

    const totalPages = ref(0);
    const pageSize = ref(24);
    const currPage = ref(1);
    const currPagination = ref([]);
    
    const isLoading = computed(() => store.state.isLoading)

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            const category = getCategoryById(route.query.id)
            const booksByCategory = getBooksByCategory(category.id)

            resolve({
              category,
              booksByCategory
            })
        }, 1000)
      })
      // category.value = getCategoryById(route.query.id)
      // booksByCategory.value = getBooksByCategory(category.value.id)

      // totalPages.value = Math.ceil(booksByCategory.value.length / pageSize.value);
      // currPagination.value = getPagination(currPage.value, totalPages.value);
    };

    const initialPage = () => {
      store.commit('toggleLoading', true)

      fetchData().then((data) => {
        category.value = data.category
        booksByCategory.value = data.booksByCategory

        store.commit('toggleLoading', false)
      })
    }

    watch(route, (to, from) => {
      if(to.name == 'category') initialPage()
    })

    initialPage()

    return {
      route,
      isLoading,
      booksByCategory,
      currPagination,
      currPage,
      category,
    };
  },
};
</script>

<style>
</style>