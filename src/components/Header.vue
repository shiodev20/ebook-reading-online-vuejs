<template>
  <header v-if="!isLoading" class="header" ref="headerRef">
    <nav class="container nav">

      <div class="nav__brand">
        <router-link to="/">
          <!-- <img src="../assets/logo.png" alt="" /> -->
          <div class="nav__brand__logo">Shio<span>Book</span></div>
        </router-link>
      </div>

      <div class="nav__menu">
        
        <div class="nav__menu__item">

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

        <div class="nav__menu__item"
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
import { computed, onMounted, ref } from "vue";
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
    const headerRef = ref(null)

    const isLoading = computed(() => store.state.isLoading)

    const toggleSidenav = () => store.commit("toggleSidenav");

    onMounted(() => {
      window.addEventListener('scroll', () => {
        if(headerRef.value) {
          if(window.scrollY > 80) headerRef.value.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 15px 0px'
          else headerRef.value.style.boxShadow = ''
        }
      })
    })
    return {
      isLoading,
      isShowModal,
      headerRef,
      toggleSidenav,
    };
  },
};
</script>

<style>
</style>
