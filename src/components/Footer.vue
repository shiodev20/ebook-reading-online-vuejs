<template>
  <footer v-if="!isLoading" class="footer bg-primary color-white">
    <div class="container">
      <grid :mdCol="1" :col="3" :gap="20">
        
        <div class="footer__item">
          <div class="footer__item__title"><i class='bx bxs-purchase-tag'></i>Lối Tắt</div>
          <div class="footer__item__content">
            <div 
              class="footer__item__content__link"
              v-for="(item, idx) in collectionsLink"
              :key="idx"
            >
              <i class='bx bx-chevrons-right'></i>
              <router-link :to="item.path">{{ item.display }}</router-link>
            </div>
          </div>
        </div>

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
        display: "Kỹ năng sống",
        path: {
          name: 'category',
          params: { category: 'ky-nang-song' },
          query: { id: 2, page: 1 }
        },
      },
      {
        display: "Kinh tế - quản lý",
        path: {
          name: 'category',
          params: { category: 'kinh-te-quan-ly' },
          query: { id: 3, page: 1 }
        },
      },
      {
        display: "Tiểu thuyết",
        path: {
          name: 'category',
          params: { category: 'tieu-thuyet' },
          query: { id: 1, page: 1 }
        },
      },
      {
        display: "Trinh thám - hình sự",
        path: {
          name: 'category',
          params: { category: 'trinh-tham-hinh-su' },
          query: { id: 7, page: 1 }
        },
      },
      {
        display: "Công nghệ thông tin",
        path: {
          name: 'category',
          params: { category: 'cong-nghe-thong-tin' },
          query: { id: 9, page: 1 }
        },
      },
    ]);

    const authorsLink = ref([
      {
        display: "Nguyễn Nhật Ánh",
        path: "/",
      },
      {
        display: "Agatha Christie",
        path: "/",
      },
      {
        display: "Higashino Keigo",
        path: "/",
      },
      {
        display: "Minato Kanae",
        path: "/",
      },
      {
        display: "Brian Tracy",
        path: "/",
      },
    ]);
  
    const collectionsLink = ref([
      {
        display: 'Trang Chủ',
        path: '/'
      },
      {
        display: 'Về ShioBook',
        path: '/about'
      },
      {
        display: 'Sách Hay Nên Đọc',
        path: {
          name: 'collection',
          params: { collection: 'sach-hay-nen-doc' },
          query: { page: 1 },
        }
      },
      {
        display: 'Sách Yêu thích',
        path: {
          name: 'collection',
          params: { collection: 'sach-yeu-thich' },
          query: { page: 1 },
        }
      },
      {
        display: 'Sách Đã Đọc',
        path: {
          name: 'collection',
          params: { collection: 'sach-da-doc' },
          query: { page: 1 },
        }
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
      collectionsLink,
      socialsLink,
      policiesLink,
      isLoading,
    }
  },
};
</script>

<style>
</style>