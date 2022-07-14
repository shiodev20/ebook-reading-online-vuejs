<template>
  <aside class="sidenav">
    <div class="sidenav__bg" v-if="isSidenav" @click="toggleSidenav">
      <Backdrop></Backdrop>
    </div>
    <div class="sidenav__container" :class="{ active: isSidenav }">
      <div class="sidenav__header">
        <div class="sidenav__header__title">
          <span><i class="bx bxs-grid-alt"></i> Danh mục</span>
        </div>

        <div class="sidenav__header__close">
          <span><i class="bx bx-x" @click="toggleSidenav"></i></span>
        </div>
      </div>

      <div class="sidenav__body">
        <SidenavItem
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :active="category.id == activeCategoryItem"
        />
      </div>
    </div>
  </aside>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router';

import useCategory from "@/composables/useCategory"

import SidenavItem from "@/components/layout/SidenavItem.vue";
import Backdrop from "@/components/element/Backdrop.vue";

export default {
  name: "Sidenav",
  components: { 
    SidenavItem,
    Backdrop,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { getCategories } = useCategory()

    const categories = ref([])

    const isSidenav = computed(() => store.state.isSidenav);
    const activeCategoryItem = computed(() => store.state.activeCategoryItem)

    const initCategories = () => categories.value = getCategories()
    const toggleSidenav = () => store.commit("toggleSidenav");

    initCategories()

    return {
      categories,
      isSidenav,
      toggleSidenav,
      activeCategoryItem,
    };
  },
};
</script>

<style>

</style>