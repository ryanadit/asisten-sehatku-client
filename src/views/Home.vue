<template>
  <div class="home">
    <section class="hero is-dark landing-hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-link-dark">Selamat datang di Asisten sehatku</h1>
          <h2 class="subtitle has-text-grey-dark">
            Mempermudah anda untuk medical check-up
          </h2>
          <div class="button-block">
            <router-link class="button is-vcentered is-xl is-link is-rounded" to="/register" v-if="showRegisterBtn">
              Daftar Segera
            </router-link>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <a href="http://www.freepik.com">Designed by Freepik</a>
      </div>
    </section>
    <EventsList />
    <div class="hero is-medium has-background-info-light" style="padding-top: 100px; padding-bottom: 50px;">
        <div class="columns is-multiline is-mobile is-variable">
          <div class="hero-body-bawah column container has-text-centered" data-aos="fade-left">
            <img src="../assets/images/patient-consult-new.png" style="width: 80%; height: 80%;">
          </div>
          <div class="hero-body-bawah column is-7">
          <div class="container">
            <h1 class="title-bawah is-size-1 has-text-success-dark">Asisten Sehatku</h1>
            <p class="subtitle-bawah has-text-info-dark">
              Sebuah platform web untuk mempermudah konsultasi tentang kesehatan anda. Saat ini fitur yang kami punya adalah konsultasi check-up online dan pencarian rumah sakit untuk medical check-up. Fitur lainnya masih dalam tahap perkembangan.
            </p>
          </div>
          </div>
        </div>
    </div>
    <FooterComponent />
  </div>
</template>
<script>
  import {EventsList, FooterComponent} from '@/components/index';
  import authStorage from '@/utils/storage.state'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'home',
    data() {
      return {
        showRegisterBtn:true
      }
    },
    components: {
      EventsList,
      FooterComponent
    },
    created() {
      this.emitter.emit('isShowNavBar', true)
      if (!authStorage.authStore.state.isLoged) { // is not login
        this.emitter.emit('showCoreMenu', false)
        this.emitter.emit('showLoginBtn', true)
      } else { // is Login
        this.showRegisterBtn = false
        this.emitter.emit('showCoreMenu', true)
        this.emitter.emit('showLoginBtn', false)
      }
    }
  };
</script>
<style lang="scss" scoped>
  .landing-hero {
    text-align: center;
    background-image: url('../assets/images/logo-main.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // height: 650px;
  }
  .hero-body .title {
    // text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
    color: #B1F6DEED;
  }
  .subtitle {
    // text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>