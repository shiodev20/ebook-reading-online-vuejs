<template>
  <div class="not-found-view">
    <p class="not-found-view__title">404</p>
    <p class="not-found-view__desc">Trang bạn tìm kiếm không tồn tại!</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable';
@import '../assets/scss/mixin';

  .not-found-view {
    @include flex(center, center);
    flex-direction: column;
    width: 100%;
    height: 75vh;

    &__title {
      margin: 2rem 0;
      color: $primary-color;
      font-size: 10rem;
      font-weight: bold;
    }

    &__desc {
      color: $secondary-color;
      font-size: 3rem;
      font-style: italic;
      opacity: .5;
    }
  }
</style>