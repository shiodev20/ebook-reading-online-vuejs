<template>
  <Swiper
    class="slider"
    :modules="sliperModules"
    :navigation="sliderNavigation"
    :pagination="sliderPagination"
    :breakpoints="sliderBreakpoints"
  >
    <template v-if="hasNavigation">
      <div class="slider__navigation slider__navigation--prev bg-primary">
        <i class="bx bx-chevron-left color-white"></i>
      </div>
      <div class="slider__navigation slider__navigation--next bg-primary">
        <i class="bx bx-chevron-right color-white"></i>
      </div>
    </template>

    <template v-if="seeMore">
      <router-link to="/" class="slider__more">
        Xem thêm <i class="bx bx-chevron-right"></i>
      </router-link>
    </template>

    <slot></slot>
  </Swiper>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from 'vuex';

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import ProductCard from "./BookCard.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  name: "Slider",
  components: { Swiper, SwiperSlide, ProductCard },
  props: {
    navigation: {
      type: Object,
    },
    pagination: {
      type: [Boolean, Object],
      default: true,
    },
    breakpoints: {
      type: Object,
      default: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      }
    },
    seeMore: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, ctx) {
    const store = useStore();

    const sliderId = ref(ctx.attrs.id);
    const hasNavigation = ref(false);

    const windowWidth = computed(() => store.state.windowWidth);

    // Swiper setup
    const sliperModules = ref([Navigation, Pagination]);
    const sliderPagination = ref(props.pagination);
    const sliderBreakpoints = ref(props.breakpoints);
    const sliderNavigation = ref({
      prevEl: `#${sliderId.value} .slider__navigation--prev`,
      nextEl: `#${sliderId.value} .slider__navigation--next`,
    });

    const initialNavigation = () => {
      for(let breakpoint in props.navigation) {
        if(windowWidth.value >= breakpoint) hasNavigation.value = props.navigation[breakpoint]
      }
    }

    initialNavigation()

    watch(windowWidth, (n, o) => {
      for(let breakpoint in props.navigation) {
        if(n >= breakpoint) hasNavigation.value = props.navigation[breakpoint]
      }
    })


    return {
      hasNavigation,
      sliperModules,
      sliderNavigation,
      sliderPagination,
      sliderBreakpoints,
    };
  },
};
</script>

<style>
</style>