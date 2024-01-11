<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="about">
      <div class="hero is-large has-background-info-light">
        <div class="columns is-multiline is-variable">
          <div class="hero-body column container has-text-centered">
            <img src="../assets/images/logo-sehatku.png" style="width: 70%; height: 70%;">
          </div>
          <div class="hero-body column is-7">
          <div class="container">
            <h1 class="title is-size-1 has-text-success-dark">Asisten Sehatku</h1>
            <p class="subtitle has-text-info-dark">
              Sebuah platform web untuk mempermudah konsultasi tentang kesehatan anda. Saat ini fitur yang kami punya adalah konsultasi check-up online dan pencarian rumah sakit untuk medical check-up. Fitur lainnya masih dalam tahap perkembangan.
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </template>
  <script>
  import {FooterComponent} from '@/components/index'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'about',
    components: {
      FooterComponent
    },
  };
</script>
  <style lang="scss" scoped>
    .org-description {
      margin-top: 50px;
    }
    .container-about {
      // background-color: #5cbdb9;
      margin-top: 30px;
      margin-bottom: 30px;
      margin-left: 5px;
      margin-right: 5px;
      width: 100%;
      height: 100%;
    }
  </style>