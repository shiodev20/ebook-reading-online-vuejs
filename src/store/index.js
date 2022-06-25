import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidenav: false,
    isLoading: false,
    activeCategoryItem: 0,
    windowWidth: 0,
    documentTitle: 'ShioBook | '
  },
  getters: {
  },
  mutations: {
    resetToggle: (state) => {
      state.isSidenav = false
    },
    toggleLoading: (state, status) => state.isLoading = status,
    toggleSidenav: (state) => state.isSidenav = !state.isSidenav,
    setActiveCategoryItem: (state, categoryId) => state.activeCategoryItem = categoryId,
    onWindowWidthChange: (state, innerWidth) => state.windowWidth = innerWidth
  },
  actions: {
  },
  modules: {
  }
})
