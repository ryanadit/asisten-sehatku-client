'use Strict'
import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })

const authStore = new Vuex.Store({
  state: {
    email: '',
    password: '',
    rememberMe: false,
    isLoged: false,
    token: '',
    userId: '',
    refreshToken: '',
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],
  mutations: {
    saveEmail: (state, value) => (value ? (state.email = value) : (state.email = '')),
    savePassword: (state, value) => (value ? (state.password = value) : (state.password = '')),
    saveRememberMe: (state, value) => (value ? (state.rememberMe = value) : (state.rememberMe = false)),
    saveIsLoged: (state, value) => (value ? (state.isLoged = value) : (state.isLoged = false)),
    saveToken: (state, value) => (value ? (state.token = value) : (state.token = '')),
    saveRefreshToken: (state, value) => (value ? (state.refreshToken = value) : (state.refreshToken = '')),
    saveUserId: (state, value) => (value ? (state.userId = value) : (state.userId = '')),
  }
})

const resetAllStorage = () => {
  authStore.commit('saveEmail')
  authStore.commit('savePassword')
  authStore.commit('saveRememberMe')
  authStore.commit('saveIsLoged')
  authStore.commit('saveToken')
  authStore.commit('saveRefreshToken')
  authStore.commit('saveUserId')
}

const emailAdmin = 'opowae3030@gmail.com'

export default {
  authStore,
  resetAllStorage,
  emailAdmin
}
