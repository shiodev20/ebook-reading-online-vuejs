<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const route = useRoute();

    const layout = computed(() => route.meta.layout + "-layout");

    store.commit('onWindowWidthChange', window.innerWidth)

    const windowWidth = computed(() => store.state.windowWidth);

    onMounted(() => window.addEventListener("resize", () => {
      store.commit('onWindowWidthChange', window.innerWidth)
    }));

    watch(windowWidth, (n, o) => {
      if (n <= 992) store.state.isMobile = false;
    });

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