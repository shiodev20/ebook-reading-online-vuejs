<template>
  <header class="header">
    <nav class="container nav">

      <div class="nav__brand">
        <router-link to="/">
          <!-- <img src="../assets/logo.png" alt="" /> -->
          <div class="nav__brand__logo">Shio<span>Book</span></div>
        </router-link>
      </div>

      <div class="nav__menu">

        <div class="nav__menu__item nav__menu__item--search">

          <Teleport to="body">
            <base-modal 
              :open="isShowModal"
              :backdrop="true"
              @close-modal="isShowModal = false"
            >
              <template v-slot:default>
                <search-form></search-form>
              </template>
            </base-modal>
          </Teleport>

          <div class="nav__search__btn" @click="isShowModal = !isShowModal">
            <i class="bx bx-search"></i>
          </div>
        </div>

        <div
          class="nav__menu__item nav__menu__item--toggle"
          @click="toggleSidenav"
        >
          <div class="nav__toggle__btn">
            <i class="bx bx-menu"></i>
          </div>
        </div>

      </div>
      
    </nav>

  </header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import BaseModal from "./Modal.vue";
import SearchForm from './SearchForm.vue';

export default {
  name: "Header",
  components: {
    BaseModal,
    SearchForm,
  },
  setup() {
    const store = useStore();

    const isShowModal = ref(false);

    const toggleSidenav = () => store.commit("toggleSidenav");

    return {
      toggleSidenav,
      isShowModal,
    };
  },
};
</script>

<style>
</style>
