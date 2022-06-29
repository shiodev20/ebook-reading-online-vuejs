<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>

  <template v-else>
    <!-- Latest update books -->
    <SectionContainer>
      <SectionTitle>Sách mới cập nhật</SectionTitle>

      <SectionBody>
        <Grid :smCol="2" :mdCol="3" :lgCol="4" :col="6" :gap="40">
          <BookCard
            v-for="book in latestBooks"
            :key="book.id"
            :book="book"
          ></BookCard>
        </Grid>
      </SectionBody>
    </SectionContainer>

    <!-- Recommended Category -->
    <SectionContainer>
      <SectionTitle>Thể loại nổi bật</SectionTitle>
      <SectionBody>
        <div id="category-list">
          <CategoryCard
            v-for="category in sortedCategory"
            :key="category.id"
            :category="category"
          ></CategoryCard>
        </div>
      </SectionBody>
    </SectionContainer>
    
    <!-- Recommended books -->
    <SectionContainer>
      <SectionTitle>Sách hay nên đọc</SectionTitle>
      <SectionBody>
        <Slider
          id="recommended-books"
          :seeMore="false"
          :navigation="{
            0: false,
            768: true,
          }"
          :pagination="{
            clickable: true,
          }"
          :breakpoints="{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: 20,
            },
          }"
        >
          <SwiperSlide v-for="book in recommendedBooks" :key="book.id">
            <BookCard :book="book"></BookCard>
          </SwiperSlide>
        </Slider>
      </SectionBody>
    </SectionContainer>

    

    <!-- Quote -->
    <SectionContainer>
      <SectionBody>
        <Quote></Quote>
      </SectionBody>
    </SectionContainer>

    <!-- Loved books -->
    <SectionContainer>
      <SectionTitle class="color-secondary">Sách yêu thích</SectionTitle>
      <SectionBody>
        <Slider
          v-if="lovedBooks.length"
          id="loved-book-slider"
          :navigation="{
            0: false,
            768: true,
          }"
          :pagination="{
            clickable: true,
          }"
          :breakpoints="{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: 20,
            },
          }"
        >
          <SwiperSlide v-for="book in lovedBooks" :key="book.id">
            <BookCard :book="book"></BookCard>
          </SwiperSlide>
        </Slider>
        <div v-else class="empty-box">
          <p class="empty-box__title">Hãy đặt sách mà bạn yêu thích lên kệ nhé!</p>
          <img class="empty-box__image" src="../assets/empty.svg">
        </div>
      </SectionBody>
    </SectionContainer>
  </template>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import useBook from "@/composables/useBook";
import useCategory from '@/composables/useCategory';

import { SwiperSlide } from "swiper/vue";
import Grid from "@/components/Grid.vue";
import BookCard from "@/components/BookCard.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import Slider from "@/components/Slider.vue";
import Quote from "@/components/Quote.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionBody from "@/components/SectionBody.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "HomeView",
  components: {
    SwiperSlide,
    Grid,
    BookCard,
    CategoryCard,
    SectionContainer,
    SectionTitle,
    SectionBody,
    Loading,
    Slider,
    Quote,
  },
  setup() {
    const store = useStore();
    const { getLatestBooks, getRandomBooks, getBooksById } = useBook();
    const { getSortCategory, getCategories } = useCategory()

    const latestBooks = ref([]);
    const recommendedBooks = ref([]);
    const lovedBooks = ref([]);
    const sortedCategory = ref([]);

    const isLoading = computed(() => store.state.isLoading);
    const lovedBooksId = computed(() => store.getters.getLovedBooks(18));

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            latestBooks: getLatestBooks(12),
            recommendedBooks: getRandomBooks(18),
            lovedBooks: getBooksById(lovedBooksId.value),
            // sortedCategory: getSortCategory()
            sortedCategory: getCategories()
          });
        }, 1000);
      });
    };

    const initialPage = () => {
      store.commit("toggleLoading", true);

      fetchData().then((data) => {
        latestBooks.value = data.latestBooks;
        recommendedBooks.value = data.recommendedBooks;
        lovedBooks.value = data.lovedBooks;
        // sortedCategory.value = data.sortedCategory.slice(0, 6);
        sortedCategory.value = data.sortedCategory;

        document.title = store.state.documentTitle + "Tải ebook miễn phí";

        store.commit("toggleLoading", false);
      });
    };

    initialPage();

    return {
      isLoading,
      latestBooks,
      lovedBooks,
      recommendedBooks,
      sortedCategory,
    };
  },
};
</script>

<style>
</style>