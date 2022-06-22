<template>
  <!-- Latest update books -->
  <SectionContainer>
    <SectionTitle class="color-secondary">Sách mới cập nhật</SectionTitle>

    <SectionBody>
      <Grid :smCol="2" :mdCol="3" :lgCol="4" :col="6" :gap="40">
        <BookCard v-for="book in latestBooks" :key="book.id" :book="book"></BookCard>
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

<script>
import { ref } from "vue";
import useBook from "@/composables/useBook";

import { SwiperSlide } from "swiper/vue";
import Grid from "@/components/Grid.vue";
import BookCard from "@/components/BookCard.vue";
import Slider from "@/components/Slider.vue";
import Quote from "@/components/Quote.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionBody from "@/components/SectionBody.vue";

export default {
  name: "HomeView",
  components: {
    SwiperSlide,
    Grid,
    BookCard,
    SectionContainer,
    SectionTitle,
    SectionBody,
    Slider,
    Quote,
  },
  setup() {
    const { getMostDownloadBooks, getMostViewBooks, getLatestBooks, getRandomBooks } = useBook();

    const latestBooks = ref([]);
    const mostDownloadBooks = ref([]);
    const mostViewBooks = ref([]);

    const fetchData = () => {
      latestBooks.value = getLatestBooks(18);
      mostDownloadBooks.value = getMostDownloadBooks(18);
      mostViewBooks.value = getMostViewBooks(18);

      console.log(getRandomBooks(12));
    }
    
    fetchData();

    return {
      latestBooks,
      mostDownloadBooks,
      mostViewBooks,
    };
  },
};
</script>

<style>
</style>