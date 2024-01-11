<template>
    <link rel="stylesheet" href="../../assets/css/login-form.css">
    <div class="bg-Form">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey-dark">Login</h3>
                    <p class="subtitle has-text-grey mt-1">Selamat datang di asisten sehatku</p>
                    <div class="box">
                        <img src="../../assets/images/logo-sehatku.png" style="margin-bottom: 20px; width: 40%; height: 40%;">
                        <form @keyup.enter="submit">
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input class="input" v-bind:class="msg['email'] ? ' is-danger' : ''"
                                        type="email" required placeholder="Email" v-model="email" @input="validateEmail" @blur="validateEmail">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right" v-if="(msg['email'] ? msg['email'] : '' ).length == 0 && email.length > 0">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </p>
                                <p class="help is-danger" v-if="(msg['email'] ? msg['email'] : '' ).length > 0">
                                    {{ msg['email'] }}
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" v-bind:class="msg['password'] ? ' is-danger' : ''"
                                        type="password" placeholder="Password" v-model="password"
                                        @input="validatePassword" @blur="validatePassword">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </p>
                                <p class="help is-danger" v-if="(msg['password'] ? msg['password'] : '' ).length > 0">
                                    {{ msg['password'] }}
                                </p>
                            </div>
                        </form>
                        <div class="container has-text-left">
                            <label class="checkbox has-text-grey" style="margin-top: 20px; margin-bottom: 20px;">
                                <input type="checkbox" v-on:click="clickCheckBox">
                                Remember me
                            </label>
                        </div>
                        <button class="button is-vcentered is-link is-large is-fullwidth" v-on:click="submit" v-bind:class="isLoading ? 'is-loading' : ''">Login</button>
                        <p class="has-text-grey" style="margin: 20px;">
                            Belum Punya akun?&nbsp;
                            <router-link to="/register">Sign Up &nbsp;&nbsp;</router-link> 
                        </p>
                        <p class="has-text-grey" style="margin: 20px;">
                            <router-link to="/forgotPassword">Lupa Password</router-link> 
                        </p>
                    </div>
                </div>
                <div class="column is-4"></div>
                <div class="column is-4"></div>
                <div class="column is-4"></div>
            </div>
        </div>
    </div>
</template>
<script>
'use Strict'
import storageState from '@/utils/storage.state'
import formValidationUtils from '@/utils/form.validation.utils'
// eslint-disable-next-line no-unused-vars
import { Toast } from '@/utils/widgets/widget.helper'
import {LoginService, successType} from '@/services/auth.services'
import { router } from '@/routes/routes'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            isRememberMe: false,
            isLoading: false,
            msg: {},
        }
    },
    methods: {
        clickCheckBox() {
            this.isRememberMe = !this.isRememberMe
        },
        async submit() {
            if (this.isRememberMe) {
                storageState.authStore.commit('saveRememberMe', this.isRememberMe)
                storageState.authStore.commit('saveEmail', this.email)
                storageState.authStore.commit('savePassword', this.password)
            } else {
                storageState.authStore.commit('saveRememberMe')
                storageState.authStore.commit('saveEmail')
                storageState.authStore.commit('savePassword')
            }

            if (this.email.length > 0 && this.password.length > 0) {
                this.isLoading = true
                const data = {
                    email: this.email,
                    password: this.password
                }
                const toast = Toast(this.$swal)
                let res = await LoginService(data)
                if (res.type === successType) {
                    this.isLoading = false
                    toast.fire({
                        icon: "success",
                        title: `${res.data.message}`
                    })
                    router.replace('/')
                } else {
                    this.isLoading = false
                    toast.fire({
                        icon: "error",
                        title: `${res.data.message}`
                    })
                }
               
            } else {
                this.validateEmail()
                this.validatePassword()
            }
        },
        validateEmail() {
            this.msg['email'] = formValidationUtils.emailValidation(this.email)
        },
        validatePassword() {
            this.msg['password'] = formValidationUtils.passwordValidation(this.password)
        }

    },
    created() {
        this.email = storageState.authStore.state.email
        this.password = storageState.authStore.state.password
        this.emitter.emit('isShowNavBar', false)
    },
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