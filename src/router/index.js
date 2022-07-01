import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/the-loai/:category',
    name: 'category',
    meta: {
      layout: 'default',
    },
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/sach/:slug',
    name: 'book-detail',
    meta: {
      layout: 'default',
    },
    component: () => import('../views/BookDetailView.vue')
  },
  {
    path: '/doc-sach/:slug',
    name: 'read-book',
    meta: { layout: 'default' },
    component: () => import('../views/PDFView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      layout: 'default',
    },
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/404View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
