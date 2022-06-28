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
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import slugify from "slugify";

import useBook from "@/composables/useBook";

export default {
  props: {
    book: Object,
  },
  setup(props) {
    const store = useStore();
    const { getPDFFile } = useBook();

    const PDFFile = ref(getPDFFile(props.book.title));

    const isBookLoved = computed(() => store.getters.isBookLoved(props.book.id));
 
    const customPDFFilename = () => 'ShioBook-' + slugify(props.book.title, { locale: 'vi'})
    const addLovedBook = () => store.commit("addLovedBook", { id: props.book.id });
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

<style>
</style>