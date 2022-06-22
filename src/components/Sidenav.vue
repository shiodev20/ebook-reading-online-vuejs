<template>
  <aside class="sidenav">
    <div class="sidenav__bg" v-if="isMobile" @click="toggleMobile">
      <Backdrop></Backdrop>
    </div>
    <div class="sidenav__container" :class="{ active: isMobile }">
      <div class="sidenav__header">
        <div class="sidenav__header__title">
          <span><i class="bx bxs-grid-alt"></i> Danh mục</span>
        </div>

        <div class="sidenav__header__close">
          <span><i class="bx bx-x" @click="toggleMobile"></i></span>
        </div>
      </div>

      <div class="sidenav__body">
        <SidenavItem
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </aside>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import useCategory from "@/composables/useCategory"

import SidenavItem from "./SidenavItem.vue";
import Backdrop from './Backdrop.vue'

export default {
  name: "Sidenav",
  components: { 
    SidenavItem,
    Backdrop,
  },
  setup() {
    const store = useStore();
    const { getCategories } = useCategory()

    const categories = ref([])
    
    const isMobile = computed(() => store.state.isMobile);

    const toggleMobile = () => store.commit("toggleMobile");

    const initCategories = () => {
      categories.value = getCategories()
    }

    initCategories()

    return {
      categories,
      isMobile,
      toggleMobile,
    };
  },
};
</script>

<style>

</style>