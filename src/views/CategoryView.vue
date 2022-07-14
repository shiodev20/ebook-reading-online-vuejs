<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>

  <template v-else>
    <SectionContainer>
      <SectionTitle>{{ category.name }}</SectionTitle>
      <SectionBody>
        <Grid :smCol="2" :mdCol="3" :lgCol="4" :col="6" :gap="40">
          <BookCard
            v-for="book in booksPerPage"
            :key="book.id"
            :book="book"
          ></BookCard>
        </Grid>
      </SectionBody>
    </SectionContainer>

    <SectionContainer>
      <SectionBody>
        <Pagination 
          :pagination="currPagination"
          :page="currPage"
        ></Pagination>
      </SectionBody>
    </SectionContainer>
  </template>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import useBook from "@/composables/useBook";
import useCategory from "@/composables/useCategory";

import Grid from "@/components/Grid.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionBody from "@/components/SectionBody.vue";
import BookCard from "@/components/BookCard.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading.vue";

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
    const store = useStore();
    const route = useRoute();
    
    const { getBooksByCategory } = useBook();
    const { getCategoryById } = useCategory();

    const category = ref({});
    const booksByCategory = ref([]);
    const pageSize = ref(24);
    const currPage = ref(1);
    
    const isLoading = computed(() => store.state.isLoading);
    const totalPages = computed(() => Math.ceil(booksByCategory.value.length / pageSize.value))
    const currPagination = computed(() => getPagination(currPage.value, totalPages.value))
    const booksPerPage = computed(() => getBooksPerPage(booksByCategory.value, currPage.value, pageSize.value))

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const category = getCategoryById(route.query.id);
          const booksByCategory = getBooksByCategory(category.id);

          resolve({
            category,
            booksByCategory,
          });
        }, 1000);
      });
    };

    const initialPage = () => {
      store.commit("toggleLoading", true);

      fetchData().then((data) => {
        category.value = data.category;
        booksByCategory.value = data.booksByCategory;
        
        totalPages.value = Math.ceil(booksByCategory.value.length / pageSize.value)
        currPagination.value = getPagination(currPage.value, totalPages.value)
        booksPerPage.value = getBooksPerPage(booksByCategory.value, currPage.value, pageSize.value)

        document.title = store.state.documentTitle + category.value.name

        store.commit("toggleLoading", false);
      });
    };

    watch(route, (to, from) => {
      if (to.name === "category") {
        currPage.value = route.query.page ? Number(route.query.page) : 1
        initialPage()
      }
    });


    initialPage();

    return {
      route,
      isLoading,
      booksPerPage,
      category,
      currPagination,
      currPage,
    };
  },
};
</script>

<style>
</style>