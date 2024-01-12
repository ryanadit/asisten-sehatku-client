<template>
    <link rel="stylesheet" href="../../assets/css/login-form.css">
    <div class="bg-Form">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey-dark">Lupa Password</h3>
                    <div class="box">
                        <img src="../../assets/images/logo-sehatku.png" style="margin-bottom: 20px; width: 40%; height: 40%;">
                        <p class="subtitle has-text-grey mt-1 mb-3">Layanan lupa pasword</p>
                        <form>
                            <div class="field" v-if="!isEnterPass">
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
                            <div class="field has-text-left" v-if="isEnterPass">
                                <label class="label">Password <strong
                                        class="has-text-danger-dark">*</strong></label>
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
                            <div class="field has-text-left" v-if="isEnterPass">
                                <label class="label">Konfirmasi Password <strong
                                        class="has-text-danger-dark">*</strong></label>
                                <p class="control has-icons-left">
                                    <input class="input" type="password" required placeholder="Konfirmasi Password"
                                        v-model="confirmPassword" v-bind:class="msg['confirmPassword'] ? ' is-danger' : ''"
                                        @input="validateConfirmPassword">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </p>
                                <p class="help is-danger"
                                    v-if="(msg['confirmPassword'] ? msg['confirmPassword'] : '').length > 0">
                                    {{ msg['confirmPassword'] }}
                                </p>
                            </div>
                        </form>
                        <button class="button is-rounded is-link is-large is-fullwidth mt-4"
                         @click="submit" v-bind:class="isLoading ? 'is-loading' : ''">Sumbit</button>
                        <p class="has-text-grey" style="margin: 20px;">
                            Pastikan masukkan email anda dengan benar&nbsp;
                        </p>
                        <p class="has-text-grey" style="margin: 20px;">
                            Belum Punya akun?&nbsp;
                            <router-link to="/register">Sign Up &nbsp;&nbsp;</router-link> 
                        </p>
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
    </div>
</template>
<script>
'use Strict'
// import storageState from '@/utils/storage.state'
import formValidationUtils from '@/utils/form.validation.utils'
import {findEmaiService, successType, forgotAccountService} from '@/services/auth.services'
import { Toast } from '@/utils/widgets/widget.helper'
import { router } from '@/routes/routes'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
    metaInfo: { title: 'Dashboard' },
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            msg: {},
            isLoading: '',
            isEnterPass: false,
        }
    },
    methods: {
        validateEmail() {
            this.msg['email'] = formValidationUtils.emailValidation(this.email)
        },
        validatePassword() {
            this.msg['password'] = formValidationUtils.passwordValidation(this.password)
        },
        validateConfirmPassword() {
            this.msg['confirmPassword'] = formValidationUtils.confirmPasswordValidation(this.password, this.confirmPassword)
        },
        submit() {
            if (this.$route.query.token) {
                this.submitPassword()
            } else {
                this.submitEmail()
            }
        },
        async submitEmail() {
            var formIsValid = true
            
            if (this.email.length < 1) {
                console.log(this.email);
                formIsValid = false
            } 

            if (!formIsValid) {
                this.validateEmail()
            } else {
                this.isLoading = true
                const toast = Toast(this.$swal)
                const data = {
                    email: this.email
                }
                let res = await findEmaiService(data)
                if (res.type === successType) {
                    this.isLoading = false
                    toast.fire({
                        icon: "success",
                        title: `${res.data.message}`
                    })
                } else {
                    this.isLoading = false
                    toast.fire({
                        icon: "error",
                        title: `${res.data.message}`
                    })
                }
            }
        },
        async submitPassword() {
            var formIsValid = true
            if (formValidationUtils.confirmPasswordValidation(this.password, this.confirmPassword).length > 0) {
                console.log(this.confirmPassword);
                formIsValid = false
            }
            if (this.password.length < 1) {
                console.log(this.password);
                formIsValid = false
            } 
            if (!formIsValid) {
                this.validateConfirmPassword()
                this.validatePassword()
            } else {
                this.isLoading = true
                let token = this.$route.query.token
                let data = {
                    password : this.password
                }
                const toast = Toast(this.$swal)
                let res = await forgotAccountService(data, token)
                if (res.type === successType) {
                    this.isLoading = false
                    toast.fire({
                        icon: "success",
                        title: `${res.data.message}`
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
        }

    },
    created() {
        this.emitter.emit('isShowNavBar', false)
        if (this.$route.query.token) {
            this.isEnterPass = true
        }
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