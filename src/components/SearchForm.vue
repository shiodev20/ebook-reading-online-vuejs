<template>
  <div class="search-form">
    <span class="search-form__icon search-form__icon--search"
      ><i class="bx bx-search"></i
    ></span>

    <span 
      class="search-form__icon search-form__icon--close"
      v-if="searchInput"
      @click="searchInput = ''"
    ><i class="bx bx-x"></i></span>

    <input
      type="text"
      class="search-form__input"
      placeholder="Nhập tên sách hoặc tác giả"
      v-model="searchInput"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchForm',
  setup() {

    const searchInput = ref('')

    return {
      searchInput,
    }
  }
};
</script>

<style>
</style>