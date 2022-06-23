<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>
  <template v-else>
    <!-- Latest update books -->
    <SectionContainer>
      <SectionTitle class="color-secondary">Sách mới cập nhật</SectionTitle>

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

    <SectionContainer>
      <SectionTitle class="color-secondary">Sách được tải nhiều</SectionTitle>
      <SectionBody>
        <Slider
          id="most-download-slider"
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
          <SwiperSlide v-for="book in mostDownloadBooks" :key="book.id">
            <BookCard :book="book"></BookCard>
          </SwiperSlide>
          <router-link to="/" class="slider__more"
            >Xem thêm <i class="bx bx-chevron-right"></i
          ></router-link>
        </Slider>
      </SectionBody>
    </SectionContainer>

    <SectionContainer>
      <SectionBody>
        <Quote></Quote>
      </SectionBody>
    </SectionContainer>

    <SectionContainer>
      <SectionTitle class="color-secondary">Sách được xem nhiều</SectionTitle>
      <SectionBody>
        <Slider
          id="most-view-slider"
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
          <SwiperSlide v-for="book in mostViewBooks" :key="book.id">
            <BookCard :book="book"></BookCard>
          </SwiperSlide>
          <router-link to="/" class="slider__more"
            >Xem thêm <i class="bx bx-chevron-right"></i
          ></router-link>
        </Slider>
      </SectionBody>
    </SectionContainer>
  </template>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import useBook from "@/composables/useBook";

import { SwiperSlide } from "swiper/vue";
import Grid from "@/components/Grid.vue";
import BookCard from "@/components/BookCard.vue";
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
    SectionContainer,
    SectionTitle,
    SectionBody,
    Loading,
    Slider,
    Quote,
  },
  setup() {
    const store = useStore();
    const { getMostDownloadBooks, getMostViewBooks, getLatestBooks } =
      useBook();

    const latestBooks = ref([]);
    const mostDownloadBooks = ref([]);
    const mostViewBooks = ref([]);

    const isLoading = computed(() => store.state.isLoading);

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            latestBooks: getLatestBooks(18),
            mostDownloadBooks: getMostDownloadBooks(18),
            mostViewBooks: getMostViewBooks(18),
          });
        }, 1000);
      });
    };

    const initialPage = () => {
      store.commit("toggleLoading", true);

      fetchData().then((data) => {
        latestBooks.value = data.latestBooks;
        mostDownloadBooks.value = data.mostDownloadBooks;
        mostViewBooks.value = data.mostViewBooks;
        store.commit("toggleLoading", false);
      });
    };

    initialPage();

    return {
      isLoading,
      latestBooks,
      mostDownloadBooks,
      mostViewBooks,
    };
  },
};
</script>

<style>
</style>