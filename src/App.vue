<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const layout = computed(() => route.meta.layout + "-layout");
    const windowWidth = computed(() => store.state.windowWidth);

    store.commit("onWindowWidthChange", window.innerWidth);

    router.beforeEach((to, from) => {
      store.commit("resetToggle");
    });
    
    watch(windowWidth, (n, o) => {
      if (n <= 992) store.state.isMobile = false;
    });

    document.title = store.state.documentTitle + 'Tải ebook miễn phí'

    onMounted(() =>
      window.addEventListener("resize", () => {
        store.commit("onWindowWidthChange", window.innerWidth);
      })
    );

    return {
      layout,
    };
  },
};
</script>

<style lang="scss">
@import "../node_modules/boxicons/css/boxicons.min.css";
@import "./assets/scss/index.scss";
</style>