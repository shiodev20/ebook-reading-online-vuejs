<template>
  <div class="book-detail__info__options">
    <div
      v-if="isBookLoved"
      class="book-detail__info__options__item bg-gray"
      @click="removeLovedBook"
    >
      <i class="bx bx-dislike"></i>
      <span>Bỏ thích</span>
    </div>

    <div
      v-else
      class="book-detail__info__options__item bg-pink"
      @click="addLovedBook"
    >
      <i class="bx bx-like"></i>
      <span>Yêu thích</span>
    </div>

    <a 
      :href="PDFFile" 
      :download="PDFFilename"
      @click="downloadBook"
    >
      <div class="book-detail__info__options__item bg-primary">
        <i class="bx bx-download"></i>
        <span> Tải sách</span>
      </div>
    </a>

    <router-link
      :to="{
        name: 'read-book',
        params: { slug: bookSlug },
        query: { id: book.id }
      }"
    >
      <div class="book-detail__info__options__item bg-orange">
        <i class="bx bx-show"></i>
        <span>Đọc online</span>
      </div>
    </router-link>
  </div>

  <Toast
    :timeout="false"
  >
    <div class="toast__title">- Bạn đã tải sách <span>" {{ book.title }} "</span></div>
    <div class="toast__desc">Nếu Bạn có điều kiện, Hãy mua sách giấy để ủng hộ Tác giả và Nhà xuất bản nhé!</div>
  </Toast>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import slugify from "slugify";

import useBook from "@/composables/useBook";

import Toast from "@/components/Toast.vue";

export default {
  props: {
    book: Object,
  },
  components: { Toast },
  setup(props) {
    const store = useStore();
    const { getPDFFile } = useBook();

    const PDFFile = ref(getPDFFile(props.book.title));
    const PDFFilename = ref('ShioBook-' + slugify(props.book.title, { locale: 'vi'}))
    const bookSlug = ref(slugify(props.book.title, { lower: true, locale: 'vi'}))
    const isBookLoved = computed(() => store.getters.isBookLoved(props.book.id));

    const addLovedBook = () => store.commit("addLovedBook", { id: props.book.id });
    const removeLovedBook = () => store.commit("removeLovedBook", { id: props.book.id });
    const downloadBook = () => store.commit("showToast")

    return {
      bookSlug,
      PDFFile,
      PDFFilename,
      isBookLoved,
      addLovedBook,
      removeLovedBook,
      downloadBook,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variable';
  @import '../assets/scss/mixin';

  .toast__title {
    margin: 1rem 0;
    font-size: $subtitle-size;
    color: $primary-color;

    span {
      color: $secondary-color;
      font-weight: bold;
    }
  }

  .toast__desc {
    line-height: 2.5rem;
    font-size: $subtitle-size;
    font-style: italic;
    color: $gray-color;

    @include mobile {
      font-size: $text-size;
    }
  }
</style>