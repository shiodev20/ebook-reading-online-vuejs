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
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidenav from "@/components/Sidenav.vue";
import Breadcrump from "@/components/Breadcrumb.vue";

export default {
  name: "DefaultLayout",
  components: { Header, Footer, Sidenav, Breadcrump },
  setup() {},
};
</script>
