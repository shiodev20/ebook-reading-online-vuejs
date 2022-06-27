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
    

    <div class="book-detail__info__options__item bg-primary">
      <i class="bx bx-download"></i>
      <span> Tải sách</span>
    </div>

    <div class="book-detail__info__options__item bg-orange">
      <i class="bx bx-show"></i>
      <span>Đọc online</span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import useBook from '@/composables/useBook';

export default {
  props: {
    bookId: Number,
  },
  setup(props) {
    const store = useStore();
    const {getBookById} = useBook();

    const isBookLoved = computed(() => store.getters.isBookLoved(props.bookId))
    
    const addLovedBook = () => {
      const book = getBookById(props.bookId)
      store.commit('addLovedBook', { book })
    };

    const removeLovedBook = () => {
      store.commit('removeLovedBook', { id: props.bookId })
    }

    return {
      isBookLoved,
      addLovedBook,
      removeLovedBook,
    }
  },
};
</script>

<style>
</style>