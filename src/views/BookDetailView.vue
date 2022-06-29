<template>
    <template v-if="isLoading">
      <Loading></Loading>
    </template>

    <template v-else>
      <SectionContainer>
        <SectionBody>
          <div class="book-detail">
            <Grid class="book-detail-layout" :gap="30">
                <img
                  class="book-detail__cover"
                  :src="bookCover" 
                  :alt="book.title" 
                />


              <div class="book-detail__info">
                <h1 class="book-detail__info__title">{{ book.title }}</h1>

                <div class="book-detail__info__meta">
                  <div class="book-detail__info__meta__item">
                    Tác giả: <span>{{ book.author }}</span>
                  </div>
                  <div class="book-detail__info__meta__item">
                    Thể loại:
                      <span>
                        <router-link
                          :to="{
                            name: 'category',
                            params: { category: categorySlug },
                            query: { id: category.id },
                          }"
                          >{{ category.name }}</router-link
                        >
                      </span>
                  </div>
                   <div class="book-detail__info__meta__item">
                    Ngày tải lên: <span>{{ bookUploadTime }}</span>
                  </div>
                </div>

                <hr />

                <div class="book-detail__info__desc">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    placeat blanditiis voluptas qui, harum error quas facere?
                    Recusandae cumque cum harum natus officiis quisquam provident
                    repellendus, velit labore cupiditate dolorum, sint
                    consequuntur error nihil dicta vero asperiores libero hic nemo
                    quia omnis tempore distinctio, itaque neque! Distinctio,
                    accusantium? Vel, id.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur quia enim placeat sapiente debitis vel hic
                    temporibus sint cum nostrum, a error sed illo quaerat
                    cupiditate totam, ullam similique dicta laborum ad assumenda
                    suscipit molestiae optio! Vel eligendi perspiciatis placeat.
                  </p>

                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia explicabo cum porro alias nam veniam, aliquid
                    accusantium, exercitationem amet minima quam ullam repudiandae
                    optio deserunt.
                  </p>
                </div>
                <BookDetailOptions :book="book"></BookDetailOptions>
              </div>
            </Grid>
          </div>
        </SectionBody>
      </SectionContainer>

      <!-- Same category -->
      <SectionContainer>
        <SectionTitle>Sách cùng thể loại</SectionTitle>
        <SectionBody>
          <Slider
            id="same-category"
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
            <SwiperSlide v-for="book in sameCategoryBooks" :key="book.id">
              <BookCard :book="book"></BookCard>
            </SwiperSlide>
          </Slider>
        </SectionBody>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Sách đã xem</SectionTitle>
        <SectionBody>
          <Slider
            id="viewed-book"
            :seeMore="false"
            :navigation="{
              0: false,
              768: true,
            }"
            :pagination="{ clickable: true }"
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
            <SwiperSlide
              v-for="book in viewedBooks"
              :key="book.id"
            >
              <BookCard :book="book"></BookCard>
            </SwiperSlide>
          </Slider>
        </SectionBody>
      </SectionContainer>
  </template>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import slugify from "slugify";
import moment from "moment";

import useBook from "@/composables/useBook";
import useCategory from "@/composables/useCategory";

import BookDetailOptions from "@/components/BookDetailOptions.vue";
import Grid from "@/components/Grid.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import SectionBody from "@/components/SectionBody.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import BookCard from "@/components/BookCard.vue";
import Loading from "@/components/Loading.vue";
import Slider from "@/components/Slider.vue";
import { SwiperSlide } from "swiper/vue";

export default {
  name: "BookDetailView",
  components: {
    Grid,
    SectionContainer,
    SectionTitle,
    SectionBody,
    BookCard,
    Slider,
    SwiperSlide,
    Loading,
    BookDetailOptions,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const {
      getBookById,
      getBookCover,
      getBooksById,
      getRandomBooksByCategory,
    } = useBook();
    const { getCategoryById } = useCategory();

    const category = ref({});
    const categorySlug = ref("");
    const book = ref({});
    const bookCover = ref("");
    const bookUploadTime = ref("");
    const sameCategoryBooks = ref([]);
    const viewedBooks = ref([]);

    const isLoading = computed(() => store.state.isLoading);
    const viewedBooksId = computed(() => store.state.viewedBooks)


    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          moment.locale('vi')
          const book = getBookById(route.query.id);
          const category = getCategoryById(book.categoryId);
          const bookCover = getBookCover(book.title);
          const bookUploadTime = moment(book.uploadedAt).fromNow();
          const sameCategoryBooks = getRandomBooksByCategory(12, book.id, category.id);
          const viewedBooks = getBooksById(viewedBooksId.value)

          resolve({
            book,
            bookCover,
            bookUploadTime,
            category,
            sameCategoryBooks,
            viewedBooks,
          });
        }, 1000);
      });
    };

    const initialPage = () => {
      store.commit("toggleLoading", true);

      fetchData().then((data) => {
        category.value = data.category;
        categorySlug.value = slugify(category.value.name, { lower: true, locale: "vi", });
        book.value = data.book;
        bookCover.value = data.bookCover;
        bookUploadTime.value = data.bookUploadTime;
        viewedBooks.value = data.viewedBooks;
        sameCategoryBooks.value = data.sameCategoryBooks;
        document.title = store.state.documentTitle + book.value.title;

        store.commit("toggleLoading", false);
      });
    };

  
    watch(route, (to, from) => {
      if (to.name == "book-detail") {
        initialPage();
        store.commit('addViewedBook', { id: to.query.id })
      }
    });

    initialPage();

    return {
      isLoading,
      category,
      categorySlug,
      book,
      bookCover,
      bookUploadTime,
      sameCategoryBooks,
      viewedBooks,
    };
  },
};
</script>
