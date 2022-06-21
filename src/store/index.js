import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile: false,
    windowWidth: 0
  },
  getters: {
  },
  mutations: {
    toggleMobile: (state) => state.isMobile = !state.isMobile,
    onWindowWidthChange: (state, innerWidth) => state.windowWidth = innerWidth
  },
  actions: {
  },
  modules: {
  }
})
