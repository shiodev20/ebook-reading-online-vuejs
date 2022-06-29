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

    <a :href="PDFFile.default" :download="customPDFFilename()">
      <div class="book-detail__info__options__item bg-primary">
        <i class="bx bx-download"></i>
        <span> Tải sách</span>
      </div>
    </a>

    <div class="book-detail__info__options__item bg-orange">
      <i class="bx bx-show"></i>
      <span>Đọc online</span>
    </div>
  </div>
  <Toast
    :timeout="false"
  >
    <div class="toast__title">- Bạn đã thích sách "{{ book.title }}"</div>
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

    const isBookLoved = computed(() => store.getters.isBookLoved(props.book.id));

    const customPDFFilename = () => 'ShioBook-' + slugify(props.book.title, { locale: 'vi'})

    const addLovedBook = () => {
      store.commit("addLovedBook", { id: props.book.id });
      store.commit("showToast")
    }
    const removeLovedBook = () => store.commit("removeLovedBook", { id: props.book.id });

    return {
      PDFFile,
      isBookLoved,
      addLovedBook,
      removeLovedBook,
      customPDFFilename,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variable';

  .toast__title {
    font-size: $subtitle-size;
    color: $primary-color;
  }
</style>