import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidenav: false,
    isLoading: false,
    toast: false,
    activeCategoryItem: 0,
    windowWidth: 0,
    documentTitle: 'ShioBook | ',
    lovedBooks: [],
    viewedBooks: [],
  },
  getters: {
    isBookLoved: (state) => (id) => state.lovedBooks.some(item => item === id),
    getLovedBooks: (state) => (size = state.lovedBooks.length) => state.lovedBooks.slice(0, size)
  },
  mutations: {
    initializeStore: (state) => {
      if (localStorage.getItem('lovedBooks')) {
        state.lovedBooks = JSON.parse(localStorage.getItem('lovedBooks'))
      }
      else {
        localStorage.setItem('lovedBooks', JSON.stringify(state.lovedBooks))
      }

      if (localStorage.getItem('viewedBooks')) {
        state.viewedBooks = JSON.parse(localStorage.getItem('viewedBooks'))
      }
      else {
        localStorage.setItem('viewedBooks', JSON.stringify(state.viewedBooks))
      }
    },
    resetToggle: (state) => {
      state.isSidenav = false
      state.toast = false
    },
    toggleLoading: (state, status) => state.isLoading = status,
    toggleSidenav: (state) => state.isSidenav = !state.isSidenav,
    setActiveCategoryItem: (state, categoryId) => state.activeCategoryItem = categoryId,
    onWindowWidthChange: (state, innerWidth) => state.windowWidth = innerWidth,
    showToast: (state) => state.toast = true,
    closeToast: (state) => state.toast = false,
    addLovedBook: (state, { id }) => {
      const isContain = state.lovedBooks.some(item => item == id)

      if(!isContain) {
        state.lovedBooks.push(id)
        localStorage.setItem('lovedBooks', JSON.stringify(state.lovedBooks))
      }
    },
    removeLovedBook: (state, { id }) => {
      state.lovedBooks = state.lovedBooks.filter(item => item != id)
      localStorage.setItem('lovedBooks', JSON.stringify(state.lovedBooks))
    },
    addViewedBook: (state, { id }) => {
      const isContain = state.viewedBooks.some(item => item == id)

      if(!isContain) {
        if(state.viewedBooks.length == 48) state.viewedBooks.pop(state.viewedBooks[47])
        state.viewedBooks.unshift(id)
        localStorage.setItem('viewedBooks', JSON.stringify(state.viewedBooks))
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
