<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>

  <template v-else>
    <SectionContainer>
      <SectionBody>
        <div class="book-detail" v-if="book">
          <Grid class="book-detail-layout" :gap="40">
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
                      <span><router-link to="/">Văn học</router-link></span>
                    </div>
                  </div>

                  <div>
                    <div class="book-detail__info__meta__item">
                      <i class="bx bx-show"></i> 
                      <span>{{ book.views }}</span>
                    </div>
                    <div class="book-detail__info__meta__item">
                      <i class="bx bx-download"></i>
                      <span>{{ book.downloads }}</span>
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
                  repellendus, velit labore cupiditate dolorum, sint consequuntur
                  error nihil dicta vero asperiores libero hic nemo quia omnis
                  tempore distinctio, itaque neque! Distinctio, accusantium? Vel,
                  id.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur quia enim placeat sapiente debitis vel hic temporibus
                  sint cum nostrum, a error sed illo quaerat cupiditate totam,
                  ullam similique dicta laborum ad assumenda suscipit molestiae
                  optio! Vel eligendi perspiciatis placeat.
                </p>

                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia explicabo cum porro alias nam veniam, aliquid
                  accusantium, exercitationem amet minima quam ullam repudiandae
                  optio deserunt.
                </p>
              </div>

              <div class="book-detail__info__download">
                <div class="book-detail__info__download__item">
                  <span><i class="bx bx-download"></i>PDF</span>
                </div>
                <div
                  class="
                    book-detail__info__download__item
                    book-detail__info__download__item--disabled
                  "
                >
                  <span><i class="bx bx-download"></i>EPUB</span>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </SectionBody>
    </SectionContainer>

    <!-- <SectionContainer>
      <SectionTitle>Có thể bạn sẽ thích</SectionTitle>
      <SectionBody>
        <Slider
          id="recommended-books"
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
          <router-link to="/a" class="slider__more"
            >Xem thêm <i class="bx bx-chevron-right"></i
          ></router-link>
        </Slider>
      </SectionBody>
    </SectionContainer> -->

    <!-- <SectionContainer>
      <SectionTitle>Sách cùng thể loại</SectionTitle>
      <SectionBody>
        <Slider
          id="same-category"
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
          <SwiperSlide v-for="book in booksByCategory" :key="book.id">
            <BookCard :book="book"></BookCard>
          </SwiperSlide>
          <router-link to="/a" class="slider__more"
            >Xem thêm <i class="bx bx-chevron-right"></i
          ></router-link>
        </Slider>
      </SectionBody>
    </SectionContainer> -->
  </template>

</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import useBook from "@/composables/useBook";

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
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { getBookById, getBookCover, getBooksByCategory } = useBook();

    const book = ref({});
    const bookCover = ref("");
    const booksByCategory = ref([]);
    const recommendedBooks = ref([]);

    const isLoading = computed(() => store.state.isLoading)

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = getBookById(route.query.id);
          const bookCover = getBookCover(book.cover);
          const booksByCategory = getBooksByCategory(book.categoryId).slice(0, 12);

          resolve({ book, bookCover, booksByCategory });
        }, 1000);
      });
    };

    const initialPage = () => {
      store.commit("toggleLoading", true);

      fetchData().then((data) => {
        book.value = data.book;
        bookCover.value = data.bookCover;
        booksByCategory.value = data.booksByCategory;

        store.commit("toggleLoading", false);
      });
    };

    watch(route, (to, from) => {
      if (to.name == "book-detail") fetchData();
    });

    initialPage();

    return {
      isLoading,
      book,
      bookCover,
      booksByCategory,
      recommendedBooks,
    };
  },
};
</script>