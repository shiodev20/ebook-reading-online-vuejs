import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidenav: false,
    isLoading: false,
    activeCategoryItem: 0,
    windowWidth: 0,
    documentTitle: 'ShioBook | ',
    lovedBooks: [],
    viewedBooks: [],
  },
  getters: {
    isBookLoved: (state) => (id) => state.lovedBooks.some(book => book.id === id),
  },
  mutations: {
    resetToggle: (state) => {
      state.isSidenav = false
    },
    toggleLoading: (state, status) => state.isLoading = status,
    toggleSidenav: (state) => state.isSidenav = !state.isSidenav,
    setActiveCategoryItem: (state, categoryId) => state.activeCategoryItem = categoryId,
    onWindowWidthChange: (state, innerWidth) => state.windowWidth = innerWidth,
    initializeStore: (state) => {
      if (localStorage.getItem('lovedBooks')) {
        state.lovedBooks = JSON.parse(localStorage.getItem('lovedBooks'))
      }
      else {
        localStorage.setItem('lovedBooks', JSON.stringify(state.lovedBooks))
      }

      if (localStorage.getItem('viewedBooks')) {
        state.lovedBooks = JSON.parse(localStorage.getItem('viewedBooks'))
      }
      else {
        localStorage.setItem('viewedBooks', JSON.stringify(state.viewedBooks))
      }
    },
    addLovedBook: (state, { book }) => {
      const isContain = state.lovedBooks.some(item => item.id == book.id)

      if(!isContain) {
        state.lovedBooks.push(book)
        localStorage.setItem('lovedBooks', JSON.stringify(state.lovedBooks))
      }
    },
    removeLovedBook: (state, { id }) => {
      state.lovedBooks = state.lovedBooks.filter(book => book.id != id)
      localStorage.setItem('lovedBooks', JSON.stringify(state.lovedBooks))
    }
  },
  actions: {
  },
  modules: {
  }
})
