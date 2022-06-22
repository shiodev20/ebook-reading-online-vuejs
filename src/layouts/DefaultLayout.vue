<template>
  <Header></Header>
  <Sidenav></Sidenav>
  <div class="container">
    <div class="main">
      <slot />
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "DefaultLayout",
  components: { Header, Footer, Sidenav },
  setup() {},
};
</script>
