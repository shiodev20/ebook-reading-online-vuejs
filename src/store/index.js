import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidenav: false,
    isLoading: false,
    modal: false,
    toast: false,
    activeCategoryItem: 0,
    windowWidth: 0,
    documentTitle: 'ShioBook | ',
    lovedBooks: [],
    viewedBooks: [],
    breadcrumb: [
      {
        path: '/',
        display: 'Trang chủ',
      },
    ],
  },
  getters: {
    isBookLoved: (state) => (id) => state.lovedBooks.some(book => book === id),
    isBookViewed: (state) => (id) => state.viewedBooks.some(book => book.id == id),
    getLovedBooks: (state) => (size = state.lovedBooks.length) => state.lovedBooks.slice(0, size),
    getViewedBook: (state) => (id) => state.viewedBooks.find(book => book.id == id),
    getBreadcrumb: (state) => {
      if(state.breadcrumb.length == 1) return []
      return state.breadcrumb
    }
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
    resetApp: (state) => {
      state.isSidenav = false
      state.toast = false
      state.modal = false
    },
    
    toggleLoading: (state, status) => state.isLoading = status,
    toggleSidenav: (state) => state.isSidenav = !state.isSidenav,
    setActiveCategoryItem: (state, categoryId) => state.activeCategoryItem = categoryId,
    onWindowWidthChange: (state, innerWidth) => state.windowWidth = innerWidth,

    showToast: (state) => state.toast = true,
    closeToast: (state) => state.toast = false,

    showModal: (state) => state.modal = true,
    closeModal: (state) => state.modal = false,

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

    addViewedBook: (state, payload) => {
      const isContain = state.viewedBooks.some(item => item.id == payload.id)

      if(!isContain) {
        state.viewedBooks.unshift(payload)
        localStorage.setItem('viewedBooks', JSON.stringify(state.viewedBooks))
      }
    },
    updateViewedBook: (state, payload) => {
      state.viewedBooks = state.viewedBooks.map(book => {
        if(book.id === payload.id) {
          book.page = payload.page
          return book
        }
        return book
      })
      
      localStorage.setItem('viewedBooks', JSON.stringify(state.viewedBooks))
    },

    resetBreadcrumb: (state) => {
      state.breadcrumb = [{
        path: '/',
        display: 'Trang chủ',
      }]
    },
    pushBreadcrumb: (state, payload) => {
      state.breadcrumb.push({
        path: payload.path,
        display: payload.display,
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
