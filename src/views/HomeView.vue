<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>

  <template v-else>
    <!-- Banner slider  -->
    <SectionContainer>
      <SectionBody>
        <Slider
          id="banner-slider"
          :seeMore="false"
          :pagination="{ clickable: true }"
          :navigation="{
            0: false,
            768: true,
          }"
        >
          <SwiperSlide
            v-for="banner in banners"
            :key="banner.id"
          >
            <img :src="banner.image" alt="">
          </SwiperSlide>
        </Slider>
      </SectionBody>
    </SectionContainer>

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
            v-for="category in categories"
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
          :auto="false"
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
          :auto="false"
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

    <Toast
      :timeout="false"
    >
      <router-link :to="{
        name: 'book-detail',
        params: { slug: todayBookSlug },
        query: { id: todayBook.id },
      }">
        
        <div class="book-card__horizontal">
          <h1 class="book-card__horizontal__title">Sách cho ngày mới</h1>
          <div class="book-card__horizontal__info">
              <img 
                class="book-card__horizontal__info__image"
                :src="getBookCover(todayBook.title)"
                :alt="todayBook.title"
              >
              <div class="book-card__horizontal__info__meta">
                <div class="book-card__horizontal__info__meta__item">Tên sách: <span>{{  todayBook.title }}</span></div>
                <div class="book-card__horizontal__info__meta__item">Tác giả: <span>{{  todayBook.author }}</span></div>
                <div class="book-card__horizontal__info__meta__item">Thể loại: <span>{{  todayBookCategory.name }}</span></div>

              </div>
          </div>
        </div>
      </router-link>
    </Toast>
  </template>

</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import slugify from "slugify";

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
import Toast from "@/components/Toast.vue";

import banners from "@/assets/data/banner"
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
    Toast,
  },
  setup() {
    const store = useStore();
    const {
      getBookCover,
      getLatestBooks, 
      getRandomBook, 
      getRandomBooks, 
      getBooksById,
    } = useBook();
    const { getCategories, getCategoryById } = useCategory()

    const latestBooks = ref([]);
    const recommendedBooks = ref([]);
    const lovedBooks = ref([]);
    const categories = ref([]);
    const todayBook = ref(null);
    const todayBookSlug = ref('');
    const todayBookCategory = ref('');

    const isLoading = computed(() => store.state.isLoading);
    const lovedBooksId = computed(() => store.getters.getLovedBooks(18));

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            latestBooks: getLatestBooks(12),
            recommendedBooks: getRandomBooks(18),
            lovedBooks: getBooksById(lovedBooksId.value),
            categories: getCategories(),
            todayBook: getRandomBook()
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
        categories.value = data.categories;
        todayBook.value = data.todayBook;
        todayBookSlug.value = slugify(data.todayBook.title, { lower: true, locale: 'vi' })
        todayBookCategory.value = getCategoryById(data.todayBook.categoryId)

        document.title = store.state.documentTitle + "Tải ebook miễn phí";

        store.commit("toggleLoading", false);
      });
    };

    initialPage();

    onMounted(() => {
      setTimeout(() => {
        store.commit('showToast')
      }, 2000)
    })

    return {
      isLoading,
      latestBooks,
      lovedBooks,
      recommendedBooks,
      categories,
      todayBook,
      getBookCover,
      todayBookSlug,
      todayBookCategory,
      banners,
    };
  },
};
</script>

<style lang="scss" scoped>
// @import '../assets/scss/variable';
// @import '../assets/scss/mixin';

//   .today-book {
//     &__title {
//       margin-bottom: 1.5rem;
//       font-size: $title-size;
//       font-style: italic;
//       color: $secondary-color;
//       text-decoration: underline;

//       @include mobile {
//         font-size: $subtitle-size;
//       }
//     }

//     &__info {
//       display: flex;

//       &__image {
//         flex-basis: 30%;
//         max-width: 120px;
//         max-height: 140px;
//         width: 100%;
//         height: 100%;
//         border-radius: $radius;
//         box-shadow: $box-shadow;

//         @include mobile {
//           max-width: 80px;
//           max-height: 100px;
//         }
//       }

//       &__meta {
//         flex-basis: 70%;
//         margin-left: 2rem;

//         &__item {
//           margin: 1rem 0;
//           font-size: $subtitle-size;
//           font-weight: bold;
//           color: $gray-color;

//           @include mobile {
//             font-size: $text-size;

//           }
//           span {
//             color: $primary-color;
//             font-weight: bold;
//           }
//         }
//       }
//     }
//   }
</style>