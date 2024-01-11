<template>
    <link rel="stylesheet" href="../../assets/css/login-form.css">
    <div class="bg-Form">
        <div class="hero-body">
            <div class="container has-text-centered mt-4">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey-dark">Konfirmasi Registrasi</h3>
                    <div class="box">
                        <img src="../../assets/images/logo-sehatku.png" style="margin-bottom: 20px; width: 30%; height: 30%;">
                        <p class="subtitle has-text-grey mt-1 mb-3">Silahkan Klik button dibawah ini untuk konfirmasi</p>
                        <button class="button is-vcentered is-link is-large is-fullwidth is-rounded" v-on:click="submit" v-bind:class="isLoading ? 'is-loading' : ''">Confirm</button>
                    </div>
                </div>
                <div class="column is-4"></div>
                <div class="column is-4"></div>
                <div class="column is-4"></div>
            </div>
        </div>
        <div class="hero">
            <div class="hero-body"></div>
        </div>
        <div class="hero">
            <div class="hero-body"></div>
        </div>
        <div class="hero">
            <div class="hero-body"></div>
        </div>
    </div>
</template>
<script>
'use Strict'
// import storageState from '@/utils/storage.state'
import {verifyEmailRegister, successType} from '@/services/auth.services'
import { Toast } from '@/utils/widgets/widget.helper'
import { router } from '@/routes/routes'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
    data() {
        return {
            msg: {},
            isLoading: '',
        }
    },
    methods: {
        async submit() {
            let tokenVerify = this.$route.query.token
            let res = await verifyEmailRegister(tokenVerify)
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
    created() {
      this.emitter.emit('isShowNavBar', false)
      
    }
}
</script>
<style>
.bg-Form {
    background-image: url('../../assets/images/background-form.jpg');
    /* background-color: linear-gradient(90deg, rgba(59,51,190,1) 0%, rgba(86,169,215,1) 44%, rgba(0,212,255,1) 74%); */
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
  }
</style>