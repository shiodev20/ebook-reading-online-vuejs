import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  
  {
    path: '/category/:category',
    name: 'category',
    meta: {
      layout: 'default',
    },
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/book/:slug',
    name: 'book-detail',
    meta: {
      layout: 'default',
    },
    component: () => import('../views/BookDetailView.vue')
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
