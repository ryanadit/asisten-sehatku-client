<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="bg-Form">
        <div class="container" style="padding: 20px;">
            <div class="column">
                <div class="column is-6">
                    <div class="box">
                        <h3 class="title has-text-grey mb-3">Register</h3>
                        <p class="subtitle has-text-grey mt-1">
                            <img src="../../assets/images/logo-sehatku.png"
                                style="width: 3vw; height: 3vh; margin-right: 5px;">
                            <strong class="has-text-info-dark">Asisten Sehatku</strong>
                        </p>
                        <form @keyup.enter="submitForm">
                            <div class="field">
                                <div class="field-body">
                                    <div class="field">
                                        <label class="label">Nama <strong class="has-text-danger-dark">*</strong></label>
                                        <p class="control is-expanded has-icons-left">
                                            <input class="input" type="text" placeholder="Name" v-model="name"
                                                v-bind:class="msg['name'] ? ' is-danger' : ''" @input="validateName">
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-user"></i>
                                            </span>
                                        </p>
                                        <p class="help is-danger" v-if="(msg['name'] ? msg['name'] : '').length > 0">
                                            {{ msg['name'] }}
                                        </p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Email <strong class="has-text-danger-dark">*</strong></label>
                                        <p class="control is-expanded has-icons-left has-icons-right">
                                            <input class="input" type="email" required placeholder="Email" v-model="email"
                                                v-bind:class="msg['email'] ? ' is-danger' : ''" @input="validateEmail">
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-envelope"></i>
                                            </span>
                                            <span class="icon is-small is-right"
                                                v-if="(msg['email'] ? msg['email'] : '').length == 0 && email.length > 0">
                                                <i class="fa fa-check"></i>
                                            </span>
                                        </p>
                                        <p class="help is-danger" v-if="(msg['email'] ? msg['email'] : '').length > 0">
                                            {{ msg['email'] }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password <strong class="has-text-danger-dark">*</strong></label>
                                <p class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" required placeholder="Password" v-model="password"
                                        v-bind:class="msg['password'] ? ' is-danger' : ''" @input="validatePassword">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </p>
                                <p class="help is-danger" v-if="(msg['password'] ? msg['password'] : '').length > 0">
                                    {{ msg['password'] }}
                                </p>
                            </div>
                            <div class="field">
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
                            <div class="field">
                                <label class="label">Umur <strong class="has-text-danger-dark">*</strong></label>
                                <p class="control has-icons-left">
                                    <input class="input" type="number" required placeholder="Umur" v-model="age"
                                        v-bind:class="msg['age'] ? ' is-danger' : ''" @input="validateAge">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-user-circle"></i>
                                    </span>
                                </p>
                                <p class="help is-danger" v-if="(msg['age'] ? msg['age'] : '').length > 0">
                                    {{ msg['age'] }}
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Kota/Kabupaten</label>
                                <p class="control has-icons-left">
                                    <input class="input" type="text" required placeholder="Kota/Kabupaten tempat tinggal"
                                        v-model="city">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-home"></i>
                                    </span>
                                </p>
                            </div>
                        </form>
                        <div class="container has-text-left">
                            <label class="checkbox has-text-grey" style="margin-top: 20px; margin-bottom: 20px;">
                                <input type="checkbox" v-on:click="clickCheckBox">
                                I agree to the&nbsp;<a href="">Terms of user</a>
                            </label>
                        </div>
                        <button class="button is-vcentered is-info is-outlined is-large is-fullwidth" v-on:click="submitForm"
                            style="margin-top: 10px;" v-bind:class="isLoading ? 'is-loading' : ''">Submit</button>
                        <p class="has-text-grey" style="margin: 20px;">
                            Sudah Punya akun?&nbsp;
                            <router-link to="/login">Login &nbsp;&nbsp;</router-link>
                        </p>
                    </div>
                </div>
                <div class="column is-2"></div>
            </div>
        </div>
    </div>
</template>
<script>
'use Strict'
import formValidationUtils from '@/utils/form.validation.utils'
import {RegisterService, successType} from '@/services/auth.services'
import { Toast } from '@/utils/widgets/widget.helper'
// eslint-disable-next-line no-unused-vars
import { router } from '@/routes/routes'
import storageState from '@/utils/storage.state'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
        return {
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
            city: '',
            age: null,
            msg: {},
            isTerms: false,
            isLoading: false,
        }
    },
    methods: {
        validateEmail() {
            this.msg['email'] = formValidationUtils.emailValidation(this.email)
        },
        validatePassword() {
            this.msg['password'] = formValidationUtils.passwordValidation(this.password)
        },
        isTermsSubmit() {
            this.isTerms = !this.isTerms
        },
        validateName() {
            this.msg['name'] = formValidationUtils.formNotEmptyValidation('Nama', this.name)
        },
        validateAge() {
            this.msg['age'] = formValidationUtils.formNotEmptyValidation('Umur', this.age ? `${this.age}` : '')
        },
        validateConfirmPassword() {
            this.msg['confirmPassword'] = formValidationUtils.confirmPasswordValidation(this.password, this.confirmPassword)
        },
        async submitForm() {
            var formIsValid = true
            if (this.email.length < 1) {
                console.log(this.email);
                formIsValid = false
            } 
            if (this.name.length < 1) {
                console.log(this.name);
                formIsValid = false
            } 
            if (this.confirmPassword.length < 1) {
                console.log(this.confirmPassword);
                formIsValid = false
            } 
            if (this.password.length < 1) {
                console.log(this.password);
                formIsValid = false
            } 
            if (!this.age) {
                console.log(this.age);
                formIsValid = false
            } 
            if (formValidationUtils.confirmPasswordValidation(this.password, this.confirmPassword).length > 0) {
                console.log(this.confirmPassword);
                formIsValid = false
            }

            if (!formIsValid) {
                this.validateAge()
                this.validateEmail()
                this.validatePassword()
                this.validateName()
                this.validateConfirmPassword()
            } else {
                this.isLoading = true
                const toast = Toast(this.$swal)
                let data = {
                    email: this.email,
                    password: this.password,
                    age: this.age,
                    city: this.city,
                    name: this.name
                }
                let res = await RegisterService(data)
                if (res.type === successType) {
                    this.isLoading = false
                    toast.fire({
                        icon: "success",
                        title: `${res.data.message} , please check your email`
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
        checkIsLoged() {
            if (storageState.authStore.state.isLoged) {
                router.push('/')
            }
        }
    },
    created() {
      this.emitter.emit('isShowNavBar', false)
      this.checkIsLoged()
    },
    mounted() {
        this.emitter.on('isConfirmRegister', (val) => {
            if (val === true) {
                this.checkIsLoged()
            }
        })
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
}</style>