<template>
  <footer v-if="!isLoading" class="footer bg-primary color-white">
    <div class="container">
      <grid :mdCol="1" :col="3" :gap="20">

        <div class="footer__item">
          <div class="footer__item__title"><i class='bx bxs-purchase-tag'></i>Thể loại nổi bật</div>
          <div class="footer__item__content">
            <div 
              class="footer__item__content__link"
              v-for="(item, idx) in categoriesLink"
              :key="idx"
            >
              <i class='bx bx-chevrons-right'></i>
              <router-link :to="item.path">{{ item.display }}</router-link>
            </div>
          </div>
        </div>

        <div class="footer__item">
          <div class="footer__item__title"><i class='bx bxs-purchase-tag'></i>Tác giả nổi bật</div>
          <div class="footer__item__content">
            <div 
              class="footer__item__content__link"
              v-for="(item, idx) in authorsLink"
              :key="idx"
            >
              <i class='bx bx-chevrons-right'></i>
              <router-link :to="item.path">{{ item.display }}</router-link>
            </div>
          </div>
        </div>

        <div class="footer__item">
          <div class="footer__item__title"><i class='bx bxs-purchase-tag'></i>Series hay</div>
          <div class="footer__item__content">
            <div 
              class="footer__item__content__link"
              v-for="(item, idx) in bookSeriesLink"
              :key="idx"
            >
              <i class='bx bx-chevrons-right'></i>
              <router-link :to="item.path">{{ item.display }}</router-link>
            </div>
          </div>
        </div>

      </grid>

      <div class="footer__meta">

        <div class="footer__meta__social">
          <div 
            class="footer__meta__social__item"
            v-for="(social, idx) in socialsLink"
            :key="idx"
          >
            <router-link :to="social.path">
              <i :class="`bx ${social.icon}`"></i>
            </router-link>
          </div>
        </div>

        <div class="footer__meta__policy">
          <div 
            class="footer__meta__policy__item" 
            v-for="(policy, idx) in policiesLink" 
            :key="idx"
          >
            <router-link :to="policy.path">{{ policy.display }}</router-link>
          </div>
        </div>

        <div class="footer__meta__copyright">
          <p><i class='bx bx-copyright'></i> 2022 All right Reversed.</p>
        </div>
      </div>
      
    </div>
  </footer>
</template>

<script>
import { computed, ref } from "vue";
import Grid from "./Grid.vue";
import { useStore } from 'vuex';

export default {
  name: "Footer",
  components: { Grid },
  setup() {
    const store = useStore()

    const categoriesLink = ref([
      {
        display: "Tâm lý - Kỹ năng sống",
        path: "/",
      },
      {
        display: "Kinh tế - quản lý",
        path: "/",
      },
      {
        display: "Tiểu thuyết nước ngoài",
        path: "/",
      },
      {
        display: "Trinh thám - hình sự",
        path: "/",
      },
      {
        display: "Công nghệ thông tin",
        path: "/",
      },
    ]);

    const authorsLink = ref([
      {
        display: "Nguyễn Nhật Ánh",
        path: "/",
      },
      {
        display: "Nguyễn Nhật Ánh",
        path: "/",
      },
      {
        display: "Nguyễn Nhật Ánh",
        path: "/",
      },
      {
        display: "Nguyễn Nhật Ánh",
        path: "/",
      },
      {
        display: "Nguyễn Nhật Ánh",
        path: "/",
      },
    ]);
  
    const bookSeriesLink = ref([
      {
        display: 'Harry Poster',
        path: '/'
      },
      {
        display: 'Harry Poster',
        path: '/'
      },
      {
        display: 'Harry Poster',
        path: '/'
      },
      {
        display: 'Harry Poster',
        path: '/'
      },
      {
        display: 'Harry Poster',
        path: '/'
      },
    ])

    const socialsLink = ref([
      {
        name: 'facebook',
        icon: 'bxl-facebook-square',
        path: '/'
      },
       {
        name: 'twitter',
        icon: 'bxl-twitter',
        path: '/'
      },
       {
        name: 'instagram',
        icon: 'bxl-instagram',
        path: '/'
      },
       {
        name: 'mail',
        icon: 'bxs-envelope',
        path: '/'
      },
    ])

    const policiesLink = ref([
      {
        display: 'Về chúng tôi',
        path: '/',
      },
      {
        display: 'Trợ giúp',
        path: '/',
      },
      {
        display: 'Chính sách bảo mật',
        path: '/',
      },
      {
        display: 'Điều khoản sử dụng',
        path: '/',
      },
    ])
    
    const isLoading = computed(() => store.state.isLoading)

    return {
      categoriesLink,
      authorsLink,
      bookSeriesLink,
      socialsLink,
      policiesLink,
      isLoading,
    }
  },
};
</script>

<style>
</style>