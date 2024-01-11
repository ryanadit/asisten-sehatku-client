<template>
  <div id="app">
    <link rel="script" href="https://unpkg.com/vuex-persistedstate/dist/vuex-persistedstate.umd.js">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <Nav v-if="isShowNavBar" />
    <router-view />
  </div>
</template>
<script>
  import Nav from './components/partials/Nav.vue';
  export default {
    name: 'app',
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names, vue/no-unused-components
      Nav,
    },
    data() {
      return {
        isShowNavBar: true,
      }
    },
    mounted() {
      this.emitter.on('isShowNavBar', (val) => {
        this.isShowNavBar = val;
      })
    },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Asisten Sehatku'
                const link = document.querySelector("[rel='icon']")
                link.setAttribute('href', './src/assets/images/logo-sehatku.png')
            }
        },
    }
  };
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #appBody {
    margin-top: 11vh;
  }
</style>