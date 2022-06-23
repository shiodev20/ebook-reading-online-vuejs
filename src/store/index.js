import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile: false,
    isLoading: false,
    windowWidth: 0
  },
  getters: {
  },
  mutations: {
    toggleLoading: (state, status) => state.isLoading = status,
    resetToggle: (state) => state.isMobile = false,
    toggleMobile: (state) => state.isMobile = !state.isMobile,
    onWindowWidthChange: (state, innerWidth) => state.windowWidth = innerWidth
  },
  actions: {
  },
  modules: {
  }
})
