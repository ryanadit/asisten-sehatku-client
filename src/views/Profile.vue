<template>
    <div class="about" v-if="!isLoading">
        <div class="hero is-medium has-background-link-light">
            <div class="columns is-multiline">
                <div class="hero-body column container has-text-centered">
                    <img src="../assets/images/logo-sehatku.png" style="width: 60%; height: 60%;">
                </div>
                <div class="hero-body column is-7">
                    <div class="container">
                        <div class="box">
                            <h3 class="title has-text-grey mb-3">Profile</h3>
                            <p class="subtitle has-text-grey mt-1">
                                Sahabat&nbsp;<strong class="has-text-info-dark">Asisten Sehatku</strong>
                            </p>
                            <form>
                                <div class="field">
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
                                <div class="field">
                                    <label class="label">Umur <strong class="has-text-danger-dark">*</strong></label>
                                    <p class="control has-icons-left">
                                        <input class="input " type="number" required placeholder="Umur" v-model="age"
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
                                    <div class="label">
                                        <label class="label">Jenis Kelamin</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field is-narrow">
                                        <div class="control has-icons-left">
                                            <div class="select is-fullwidth">
                                            <select v-model="gender">
                                                <option value="l">Laki-laki</option>
                                                <option value="p">Perempuan</option>
                                            </select>
                                            </div>
                                            <span class="icon is-small is-left">
                                            <i class="fa fa-user-o"></i>
                                        </span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Kota/Kabupaten</label>
                                    <p class="control has-icons-left">
                                        <input class="input" type="text" required
                                            placeholder="Kota/Kabupaten tempat tinggal" v-model="city">
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-home"></i>
                                        </span>
                                    </p>
                                </div>
                            </form>
                            <button class="button is-vcentered is-info is-rounded is-outlined is-medium mr-3" v-on:click="submitForm"
                                style="margin-top: 30px;">Update Profile</button>
                            <router-link class="button is-vcentered is-danger is-rounded is-outlined is-medium ml-3"
                                style="margin-top: 30px;" to="/"> Kembali
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="hero is-fullheight" v-if="isLoading">
        <div class="hero-body">
            <div class="container has-text-centered">
            <Loading></Loading>
            </div>
        </div>
    </section>
    <FooterComponent />
</template>
<script>
import { FooterComponent, Loading } from '@/components/index'
import formValidationUtils from '@/utils/form.validation.utils'
import { getProfileService, updateProfileService } from '@/services/profile.services'
import { successType } from '@/services/auth.services'
import { Toast } from '@/utils/widgets/widget.helper'
import { router } from '@/routes/routes'
export default {
    name: 'ProfilePage',
    components: {
        FooterComponent, 
        Loading
    },
    data() {
        return {
            name: '',
            email: '',
            city: '',
            gender: '',
            age: null,
            msg: {},
            isLoading: false,
            isLoadingSubmit: false,
        }
    },
    methods: {
        validateEmail() {
            this.msg['email'] = formValidationUtils.emailValidation(this.email)
        },
        validatePassword() {
            this.msg['password'] = formValidationUtils.passwordValidation(this.password)
        },
        validateName() {
            this.msg['name'] = formValidationUtils.formNotEmptyValidation('Nama', this.name)
        },
        validateAge() {
            this.msg['age'] = formValidationUtils.formNotEmptyValidation('Umur', this.age ? `${this.age}` : '')
        },
        async submitForm() {
            var formIsValid = true
            if (this.email.length < 1) {
                formIsValid = false
            } 
            if (this.name.length < 1) {
                formIsValid = false
            } 
            if (!this.age) {
                formIsValid = false
            } 
            if (!formIsValid) {
                this.validateAge()
                this.validateEmail()
                this.validateName()
            } else {
                this.isLoadingSubmit = true
                const toast = Toast(this.$swal)
                const data = {
                    name: this.name,
                    age: this.age,
                    city: this.city,
                    email: this.email,
                    gender: this.gender,
                }
                let res = await updateProfileService(data)
                if (res.type === successType) {
                    this.isLoadingSubmit = false
                    toast.fire({
                        icon: "success",
                        title: `${res.data.message}`
                    })
                    router.push({path: '/'})
                } else {
                    this.isLoadingSubmit = false
                    toast.fire({
                        icon: "error",
                        title: `${res.data.message}`
                    })
                }
            }
        },
        async loadDataProfile() {
            this.isLoading = true
            const toast = Toast(this.$swal)
            let res = await getProfileService()
            if (res.type === successType) {
                this.isLoading = false
                this.name = res.data.data.name
                this.email = res.data.data.email
                this.age = res.data.data.age
                this.gender = res.data.data.gender
                this.city = res.data.data.city
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
        this.loadDataProfile()
    }
}
</script>
<style scoped>
/* .container-loading {
  font-family: arial;
  font-size: 24px;
  margin: 10%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>