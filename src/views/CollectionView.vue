<template>
  <Loading v-if="isLoading"></Loading>

  <template v-else>
    <SectionContainer>
      <SectionTitle>{{ title }}</SectionTitle>
      <SectionBody>
        <Grid :smCol="2" :mdCol="3" :lgCol="4" :col="6" :gap="40">
          <BookCard v-for="book in collection" :key="book.id" :book="book">
          </BookCard>
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

import SectionContainer from "@/components/SectionContainer.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionBody from "@/components/SectionBody.vue";
import Grid from "@/components/Grid.vue";
import BookCard from "@/components/BookCard.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading.vue";

import { getBooksPerPage, getPagination } from "@/utils/pagination";

export default {
  components: {
    SectionContainer,
    SectionTitle,
    SectionBody,
    Grid,
    BookCard,
    Pagination,
    Loading,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { getBooksById, getRandomBooks } = useBook();

    const flag = ref(route.params.collection);
    const title = ref("");
    const data = ref([]);

    const pageSize = ref(6);
    const currPage = ref(1);

    const isLoading = computed(() => store.state.isLoading);

    const totalPages = computed(() =>
      Math.ceil(data.value.length / pageSize.value)
    );
    const currPagination = computed(() =>
      getPagination(currPage.value, totalPages.value)
    );
    const collection = computed(() =>
      getBooksPerPage(data.value, currPage.value, pageSize.value)
    );

    const initialPage = () => {
      switch (flag.value) {
        case "sach-yeu-thich":
          title.value = "Sách Yêu Thích";
          data.value = getBooksById(store.state.lovedBooks);
          break;

        case "sach-da-doc":
          title.value = "Sách Đã Đọc";
          data.value = getBooksById(store.state.viewedBooks.map(book => book.id));
          break;

        case "sach-hay-nen-doc":
          title.value = "Sách Hay Nên Đọc";
          data.value = getRandomBooks();
          break;

        default:
          break;
      }
    };

    store.commit('toggleLoading', true)
    
    setTimeout(() => {
      initialPage();
      store.commit("toggleLoading", false);
    }, 1000)

    watch(route, (to, from) => {
      if (to.name === "collection") {
        currPage.value = to.query.page ? to.query.page : 1;
        store.commit("toggleLoading", true);

        setTimeout(() => {
          initialPage();
          store.commit("toggleLoading", false);
        }, 1000);
      }
    });

    return {
      collection,
      title,
      currPagination,
      currPage,
      isLoading,
    };
  },
};
</script>

<style>
</style>