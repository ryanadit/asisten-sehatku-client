<template>
  <nav class="navbar" v-bind:class="showMobileMenu ? ' is-transparent' : ' is-fixed-top is-transparent'" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" v-bind:class="showMobileMenu ? ' is-active' : ' left-burger'" aria-label="menu"
        aria-expanded="false" @click="showMenu()" data-target="navbarBasicExample">
        <span aria-hidden="true"> </span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <a class="navbar-item" href="/">
        <!-- <strong class="is-size-4">Asisten Sehatku</strong> -->
        <img src="../../assets/images/logo-sehatku.png" > Asisten Sehatku
      </a>
    </div>
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item" @click="resetMenu()">Home</router-link>
        <router-link to="/about" class="navbar-item" @click="resetMenu()">About</router-link>
        <router-link to="/checkUp" class="navbar-item" @click="resetMenu()" v-if="showCoreMenu">Check-up</router-link>
        <router-link to="/checkUpHospital" class="navbar-item" @click="resetMenu()" v-if="showCoreMenu">FasKes MCU</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/profile" class="navbar-item" @click="resetMenu()" v-if="showCoreMenu">Profile</router-link>
          <div class="buttons" v-if="showLoginBtn">
            <router-link class="button is-info" @click="goToLogin()" to="/login">
              <strong>Sign In</strong>
            </router-link>
          </div>
          <div class="button is-danger is-outlined" v-if="!showLoginBtn" @click="doLogout">
            <strong>Sign out</strong>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div id="navbarBasicExample" class="navbar-menu" v-bind:class="showMobileMenu ? 'is-active' : ''"
    v-if="this.showMobileMenu">
    <router-link to="/" class="navbar-item " @click="resetMenu()">Home</router-link>
    <router-link to="/about" class="navbar-item" @click="resetMenu()">About</router-link>
    <router-link to="/checkUp" class="navbar-item" @click="resetMenu()" v-if="showCoreMenu">Check-up</router-link>
    <router-link to="/checkUpHospital" class="navbar-item" @click="resetMenu()" v-if="showCoreMenu">FasKes MCU</router-link>
    <div class="navbar-item">
      <router-link to="/profile" class="navbar-item" @click="resetMenu()" v-if="showCoreMenu">Profile</router-link>
      <div class="buttons" v-if="showLoginBtn">
        <router-link class="button is-info" @click="goToLogin()" to="/login">
          <strong>Sign In</strong>
        </router-link>
      </div>
      <div class="button is-danger is-outlined" v-if="!showLoginBtn" @click="doLogout">
            <strong>Sign out</strong>
          </div>
    </div>
  </div>
</template>
<script>
import storageState from '@/utils/storage.state'
import {logoutService, successType} from '@/services/auth.services'
import { router } from '@/routes/routes'
import { Toast } from '@/utils/widgets/widget.helper'
export default {
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Nav',
  data() {
    return {
      showMobileMenu: false,
      showCoreMenu: false,
      showLoginBtn: true,
      isLoading: false,
    }
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    resetMenu() {
      this.showMobileMenu = false;
    },
    goToLogin() {
      this.showMobileMenu = false;
      this.emitter.emit('isShowNavBar', false)
    },
    doLogout() {
      this.$swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan logout ",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout()
        }
      })
    },
    async logout() {
      this.isLoading = true
      let res = await logoutService()
      const toast = Toast(this.$swal)
      if (res.type === successType) {
        this.isLoading = false
                toast.fire({
                    icon: "success",
                    title: `${res.data.message}, `
                })
        router.replace({path: '/login'})
      } else {
        this.isLoading = false
                    toast.fire({
                        icon: "error",
                        title: `${res.data.message}`
                    })
      }
    }
  },
  mounted() {
    this.emitter.on('showMenuMobile', (val) => {
     this.showMobileMenu = val;
    })
    this.emitter.on('showCoreMenu', (val) => {
     this.showCoreMenu = val;
    })
    this.emitter.on('showLoginBtn', (val) => {
     this.showLoginBtn = val;
    })
    
    if (storageState.authStore.state.isLoged) {
      this.showCoreMenu = true
      this.showLoginBtn = false
    }
  }
};
</script>
<style lang="scss" scoped>
nav {
  margin: auto;
  background-color: hsl(0 100% 100% / 0.4);

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #d88d00;
    }
  }
}
</style>
<style>
.navbar-burger.is-active {
    display: block;
}
</style>