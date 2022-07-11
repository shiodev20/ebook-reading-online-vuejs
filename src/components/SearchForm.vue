<template>
  <div class="search-form">
    <div class="search-form__header">
      <span class="search-form__icon search-form__icon--search"
        ><i class="bx bx-search"></i
      ></span>

      <span
        class="search-form__icon search-form__icon--close"
        v-if="searchInput"
        @click="searchInput = ''"
        ><i class="bx bx-x"></i
      ></span>

      <input
        type="text"
        class="search-form__input"
        placeholder="Nhập tên sách"
        v-model="searchInput"
      />
    </div>

    <div class="search-form__body">

      <div class="search-form__body__text" v-if="searchLoading">
        <h1 class="color-secondary">...Đang tìm kiếm</h1>
      </div>

      <template v-else>
        <template v-if="searchResult.length">
          <router-link
            :to="{
              name: 'book-detail',
              params: {
                slug: slugify(book.title, { lower: true, locale: 'vi' }),
              },
              query: { id: book.id },
            }"
            v-for="book in searchResult"
            :key="book.id"
          >
            <div class="book-card__horizontal">
              <div
                class="book-card__horizontal__info"
                :style="{ margin: '1.5rem 0' }"
              >
                <img
                  class="book-card__horizontal__info__image"
                  :src="getBookCover(book.title)"
                  :alt="book.title"
                />
                <div class="book-card__horizontal__info__meta">
                  <div class="book-card__horizontal__info__meta__item">
                    Tên sách: <span>{{ book.firstPart }}<span :style="{'color': '#333'}">{{book.hightlightPart}}</span>{{book.lastPart}}</span>
                  </div>
                  <div class="book-card__horizontal__info__meta__item">
                    Tác giả: <span>{{ book.author }}</span>
                  </div>
                  <div class="book-card__horizontal__info__meta__item">
                    Thể loại:
                    <span>{{ getCategoryById(book.categoryId).name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <hr />
          </router-link>
        </template>

        <div class="search-form__body__text" v-else>
          <h1 class="color-secondary">Không tìm thấy sách</h1>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import slugify from "slugify";

import useBook from "@/composables/useBook";
import useCategory from "@/composables/useCategory";

import BookCard from "@/components/BookCard.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "SearchForm",
  components: { BookCard, Loading },
  setup() {
    const store = useStore();
    const { getBookCover, getBooks } = useBook();
    const { getCategoryById } = useCategory();

    const data = ref(getBooks());
    const searchLoading = ref(false);
    const searchInput = ref("");
    const searchResult = ref([]);

    const searchBook = (input) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            data.value.filter((book) => {
              const normalizeTitle = slugify(book.title, {
                replacement: " ",
                lower: true,
                locale: "vi",
              });
              return normalizeTitle.includes(input);
            })
          );
        }, 1000);
      });
    };

    watch(searchInput, (n, o) => {
      console.log(typeof n);
      if (n == '' || n.length < 3) {
        searchResult.value = []
        return
      }
      searchLoading.value = true;

      const normalizeInput = slugify(n, {
        replacement: " ",
        lower: true,
        locale: "vi",
      });

      searchBook(normalizeInput).then((data) => {
        searchResult.value = data.map((book) => {
          const normalizeTitle = slugify(book.title, { replacement: " ", lower: true, locale: "vi" });
          const pos = normalizeTitle.indexOf(normalizeInput);

          const firstPart = book.title.slice(0, pos)
          const lastPart = book.title.slice(pos + normalizeInput.length)
          const hightlightPart = book.title.slice(pos, pos + normalizeInput.length)

          return {
            ...book,
            firstPart,
            lastPart,
            hightlightPart,
          };
        });
        searchLoading.value = false;
      });
    });

    return {
      slugify,
      searchLoading,
      searchInput,
      searchResult,
      getBookCover,
      getCategoryById,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable";
@import "../assets/scss/mixin";

.search-form__body {
  padding: 1rem;
  max-width: 600px;
  height: 500px;
  overflow: scroll;

  &__text {
    @include flex(center, center);
    height: 100%;
    font-style: italic;
    opacity: $opacity;
  }

  hr {
    border: 1px solid rgba(61, 161, 116, 0.3);
  }
}
</style>