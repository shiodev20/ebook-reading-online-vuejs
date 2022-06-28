<template>
  <div class="book-card">
    <router-link
      :to="{
        name: 'book-detail',
        params: {
          slug: bookSlug,
        },
        query: {
          id: book.id,
        },
      }"
    >
      <div class="book-card__image">
        <img :src="bookCover" :alt="book.title" />
      </div>
      <div class="book-card__info">
        <div class="book-card__info__title">{{ bookTitle }}</div>
        <div class="book-card__info__author">{{ book.author }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import slugify from "slugify";

import useBook from "../composables/useBook";

export default {
  name: "BookCard",
  props: {
    book: Object,
  },
  setup(props) {
    const { getBookCover, getCustomBookTitle } = useBook();

    const bookCover = ref(getBookCover(props.book.title))
    const bookSlug = ref(slugify(props.book.title, { lower: true, locale: 'vi' }))
    const bookTitle = ref(getCustomBookTitle(props.book.title))

    return {
      bookCover,
      bookSlug,
      bookTitle,
    };
  },
};
</script>

<style>
</style>