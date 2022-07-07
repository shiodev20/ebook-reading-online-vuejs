<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import Loading from "@/components/Loading.vue";

export default {
  name: "App",
  components: { Loading },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const layout = computed(() => route.meta.layout + "-layout");
    const isLoading = computed(() => store.state.isLoading);
    const windowWidth = computed(() => store.state.windowWidth);

    store.commit("initializeStore");
    store.commit("onWindowWidthChange", window.innerWidth);
    

    router.beforeEach((to, from) => {
      store.commit("resetToggle");
    });

    watch(route, (to, from) => {
      if (to.name == "category") store.commit("setActiveCategoryItem", to.query.id);
      else store.commit("setActiveCategoryItem", 0);
    });

    watch(windowWidth, (n, o) => {
      if (n <= 992) store.state.isMobile = false;
    });

    document.title = store.state.documentTitle + "Tải ebook miễn phí";

    onMounted(() =>
      window.addEventListener("resize", () => {
        store.commit("onWindowWidthChange", window.innerWidth);
      })
    );

    return {
      layout,
      isLoading,
    };
  },
};
</script>

<style lang="scss">
@import "../node_modules/boxicons/css/boxicons.min.css";
@import "./assets/scss/index.scss";
</style>