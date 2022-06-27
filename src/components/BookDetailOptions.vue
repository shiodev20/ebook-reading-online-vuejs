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
    bookId: Number,
    pdf: String,
  },
  setup(props) {
    const store = useStore();
    const { getBookById, getPDFFile } = useBook();

    const book = ref(getBookById(props.bookId));
    const PDFFile = ref(getPDFFile(props.pdf));

    const isBookLoved = computed(() => store.getters.isBookLoved(props.bookId));
 
    const customPDFFilename = () => 'ShioBook-' + slugify(book.value.title, { locale: 'vi'})
    const addLovedBook = () => store.commit("addLovedBook", { book: book.value });
    const removeLovedBook = () => store.commit("removeLovedBook", { id: props.bookId });


    return {
      book,
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