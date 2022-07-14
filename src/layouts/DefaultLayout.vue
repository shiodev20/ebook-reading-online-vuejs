<template>
  <!-- <Toast></Toast> -->
  <Header></Header>
  <Sidenav></Sidenav>
  <div class="container">
    <div class="main">
      <Breadcrump></Breadcrump>
      <slot />
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Sidenav from "@/components/layout/Sidenav.vue";
import Breadcrump from "@/components/element/Breadcrumb.vue";

export default {
  name: "DefaultLayout",
  components: { Header, Footer, Sidenav, Breadcrump },
  setup() {},
};
</script>
