<template>
    <template v-if="isLoading">
      <Loading></Loading>
    </template>

    <template v-else>
      <SectionContainer>
        <SectionBody>
          <div class="book-detail" v-if="book">
            <Grid class="book-detail-layout" :gap="30">
              <div class="book-detail__book-cover">
                <img :src="bookCover" :alt="book.title" />
              </div>

              <div class="book-detail__info">
                <h1 class="book-detail__info__title">{{ book.title }}</h1>

                <div class="book-detail__info__meta">
                  <Grid :col="2" :smCol="1">
                    <div>
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
                    </div>
                  </Grid>
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

                <!-- <div class="book-detail__info__options">
                  <div 
                    class="book-detail__info__options__item bg-pink"
                    @click="addToLovedBooks"
                  >
                    <i class="bx bx-like"></i>
                    <span>Yêu thích</span>
                  </div>

                  <div class="book-detail__info__options__item bg-gray">
                    <i class="bx bx-dislike"></i>
                    <span>Bỏ thích</span>
                  </div>

                  <div class="book-detail__info__options__item bg-primary">
                    <i class="bx bx-download"></i>
                    <span> Tải sách</span>
                  </div>

                  <div class="book-detail__info__options__item bg-orange">
                    <i class="bx bx-show"></i>
                    <span>Đọc online</span>
                  </div>
                </div> -->
                
                <BookDetailOptions :book="book"></BookDetailOptions>
              </div>
            </Grid>
          </div>
        </SectionBody>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Có thể bạn sẽ thích</SectionTitle>
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
  </template>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import slugify from "slugify";

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
      getRandomBooks,
      getRandomBooksByCategory,
    } = useBook();
    const { getCategoryById } = useCategory();

    const category = ref({});
    const categorySlug = ref("");
    const book = ref({});
    const bookCover = ref("");
    const recommendedBooks = ref([]);
    const sameCategoryBooks = ref([]);

    const isLoading = computed(() => store.state.isLoading);

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = getBookById(route.query.id);
          const category = getCategoryById(book.categoryId);
          const bookCover = getBookCover(book.title);
          const recommendedBooks = getRandomBooks(12, book.id);
          const sameCategoryBooks = getRandomBooksByCategory(12, book.id, category.id);

          resolve({
            book,
            bookCover,
            recommendedBooks,
            category,
            sameCategoryBooks,
          });
        }, 1000);
      });
    };

    const initialPage = () => {
      store.commit("toggleLoading", true);

      fetchData().then((data) => {
        category.value = data.category;
        categorySlug.value = slugify(category.value.name, {
          lower: true,
          locale: "vi",
        });
        book.value = data.book;
        bookCover.value = data.bookCover;
        recommendedBooks.value = data.recommendedBooks;
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
      recommendedBooks,
      sameCategoryBooks,
    };
  },
};
</script>