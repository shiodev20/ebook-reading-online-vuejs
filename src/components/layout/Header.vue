<template>
  <header v-if="!isLoading" class="header" ref="headerRef">
    <nav class="container nav">
      <div class="nav__brand">
        <router-link to="/">
          <div class="nav__brand__logo">Shio<span>Book</span></div>
        </router-link>
      </div>

      <div class="nav__menu">
        <div class="nav__menu__item">
          <Teleport to="body">
            <Modal
              :open="isShowModal"
              :backdrop="true"
              @close-modal="closeModal"
            >
              <template v-slot:default>
                <SearchForm></SearchForm>
              </template>
            </Modal>
          </Teleport>

          <div class="nav__search__btn" @click="showModal">
            <i class="bx bx-search"></i>
          </div>
        </div>

        <div class="nav__menu__item" @click="toggleSidenav">
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

import Modal from "../element/Modal.vue";
import SearchForm from "../SearchForm.vue";

export default {
  name: "Header",
  components: {
    Modal,
    SearchForm,
  },
  setup() {
    const store = useStore();

    // const isShowModal = ref(false);
    const isShowModal = computed(() => store.state.modal);
    const headerRef = ref(null);

    const isLoading = computed(() => store.state.isLoading);

    const toggleSidenav = () => store.commit("toggleSidenav");
    const showModal = () => store.commit("showModal");
    const closeModal = () => store.commit("closeModal");

    onMounted(() => {
      window.addEventListener("scroll", () => {
        if (headerRef.value) {
          if (window.scrollY > 80)
            headerRef.value.style.boxShadow =
              "rgba(99, 99, 99, 0.2) 0px 2px 15px 0px";
          else headerRef.value.style.boxShadow = "";
        }
      });
    });
    return {
      isLoading,
      isShowModal,
      headerRef,
      toggleSidenav,
      showModal,
      closeModal,
    };
  },
};
</script>

<style>
</style>
