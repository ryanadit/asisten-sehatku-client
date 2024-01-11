'use Strict'
import { createRouter, createWebHistory } from 'vue-router'
import {
  Home, 
  About, 
  Login, 
  Register,
  // HistoryCheckUp, 
  CheckUp, 
  CheckUpHospital, 
  Profile,
  ForgotPassword,
  ConfirmRegister
} from '@/views/index'
import storageState from '@/utils/storage.state'

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      meta: {
        // requiresAuth: true
        title: 'Home Page - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Asisten Sehatku solusi konsultasi kesehatanku'
          },
          {
            property: 'og:description',
            content: 'Asisten Sehatku solusi konsultasi kesehatanku'
          }
        ]
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
        title: 'Profile Page - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Profile anda di Asisten Sehatku'
          },
          {
            property: 'og:description',
            content: 'Profile anda di Asisten Sehatku'
          }
        ]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        // requiresAuth: true
        title: 'About us - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Tentang kami Asisten Sehatku'
          },
          {
            property: 'og:description',
            content: 'Tentang kami Asisten Sehatku'
          }
        ]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        // requiresAuth: true
        title: 'Login - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Tentang kami Asisten Sehatku'
          },
          {
            property: 'og:description',
            content: 'Tentang kami Asisten Sehatku'
          }
        ]
      }
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: {
        // requiresAuth: true
        title: 'Lupa Password - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Layanan Lupa password Asisten Sehatku'
          },
          {
            property: 'og:description',
            content: 'Layanan Lupa password Asisten Sehatku'
          }
        ]
      }
    },
    {
      path: '/confirmRegister',
      name: 'confirmRegister',
      component: ConfirmRegister,
      meta: {
        // requiresAuth: true
        title: 'Konfirmasi Registrasi - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Konfirmasi Registrasi Asisten Sehatku'
          },
          {
            property: 'og:description',
            content: 'Konfirmasi Registrasi Asisten Sehatku'
          }
        ]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        // requiresAuth: true
        title: 'Register - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Register di Asisten Sehatku'
          },
          {
            property: 'og:description',
            content: 'Register di Asisten Sehatku'
          }
        ]
      }
    },
    // {
    //   path: '/historyCheckUp',
    //   name: 'historyCheckUp',
    //   component: HistoryCheckUp,
    //   meta: {
    //     requiresAuth: true,
    //     title: 'Register - Asisten Sehatku',
    //     metaTags: [
    //       {
    //         name: 'description',
    //         content: 'Histori Check-up Anda'
    //       },
    //       {
    //         property: 'og:description',
    //         content: 'Histori Check-up Anda'
    //       }
    //     ]
    //   }
    // },
    {
      path: '/checkUp',
      name: 'checkUp',
      component: CheckUp,
      meta: {
        requiresAuth: true,
        title: 'Check-Up - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Konsultasi Check-up'
          },
          {
            property: 'og:description',
            content: 'Konsultasi Check-up'
          }
        ]
      }
    },
    {
      path: '/checkUpHospital',
      name: 'checkUpHospital',
      component: CheckUpHospital,
      meta: {
        requiresAuth: true,
        title: 'FasKes MCU - Asisten Sehatku',
        metaTags: [
          {
            name: 'description',
            content: 'Rumah sakit medical Check-up'
          },
          {
            property: 'og:description',
            content: 'Rumah sakit medical Check-up'
          }
        ]
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = storageState.authStore.state.token
    if (token.length > 0) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  
})

export { router }
