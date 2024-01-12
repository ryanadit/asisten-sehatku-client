<template>
    <div class="hero is-fullheight has-background-link-light">
        <div class="container" style="margin-top: 10%;">
            <div class="title ml-4 has-text-info-dark">
                Check-up
                <p class="subtitle is-6 mt-2 has-text-link-dark">
                    Konsultasikan dengan Asisten Sehatku
                </p>
            </div>
            <div class="columns">
                <div class="column is-12">
                    <div class="card">
                        <div class="card-content">
                            <div class="content has-text-info">
                                Sebelum <strong>&nbsp;Asisten Sehatku&nbsp;</strong> memberikan layanan online medical check-up,
                                kami memerlukan data sahabat<strong>&nbsp;Asisten Sehatku&nbsp;</strong> agar kami dapat
                                memberikan solusi untuk anda.
                                Silahkan pilih yang layanan terkait medical check-up kepada kami, sahabat
                                <strong>&nbsp;Asisten Sehatku&nbsp;</strong> dapat memilih salah satu yang terdiri dari
                                check-up gula darah, check-up asam urat dan check-up kolesterol.
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-body">
                                    <div class="field">
                                        <label class="label">Usia <strong class="has-text-danger-dark">*</strong></label>
                                        <p class="control has-icons-left">
                                            <input class="input" type="number" placeholder="Usia (dalam tahun)" v-model="age" @click="listenKolAge">
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <label class="label has-text-primary-dark">Jenis Kelamin <strong
                                                class="has-text-danger-dark">*</strong></label>
                                        <div class="field-body">
                                            <div class="field is-narrow">
                                                <div class="control has-icons-left">
                                                    <div class="select is-fullwidth">
                                                        <select v-model="gender" @click="listenKolAge">
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
                                </div>
                            </div>
                            <div class="content">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <label class="label has-text-link-dark">Tipe Check-up <strong
                                                        class="has-text-danger-dark">*</strong></label>
                                                <label class="radio has-text-primary-dark" @click="listenKolAge">
                                                    <input type="radio" value="kolesterol" v-model="typeCU">
                                                    Kolesterol
                                                </label>
                                                <label class="radio has-text-danger-dark">
                                                    <input type="radio" value="asam urat" v-model="typeCU">
                                                    Asam Urat
                                                </label>
                                                <label class="radio has-text-info-dark">
                                                    <input type="radio" value="gula darah" v-model="typeCU">
                                                    Gula Darah
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-4" v-if="typeCU === 'gula darah'">
                                    <div class="panel is-info">
                                        <p class="panel-heading">
                                            Untuk Gula darah:
                                        </p>
                                        <div class="content panel-block">
                                            <div class="field">
                                                <div class="control">
                                                    <label class="label has-text-link-dark">Apakah Sudah makan? <strong
                                                            class="has-text-danger-dark">*</strong></label>
                                                    <label class="radio">
                                                        <input type="radio" value="yes" v-model="isEaten">
                                                        Ya
                                                    </label>
                                                    <label class="radio">
                                                        <input type="radio" value="no" v-model="isEaten">
                                                        Tidak
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content panel-block">
                                            <div class="field">
                                                <div class="control">
                                                    <label class="label has-text-link-dark">Apakah anda berpuasa? <strong
                                                            class="has-text-danger-dark">*</strong></label>
                                                    <label class="radio">
                                                        <input type="radio" value="yes" v-model="isIfthar">
                                                        Ya
                                                    </label>
                                                    <label class="radio">
                                                        <input type="radio" value="no" v-model="isIfthar">
                                                        Tidak
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-6" v-if="typeCU === 'gula darah'">
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="field">
                                        <label class="label">Kadar Gula darah terakhir<strong class="has-text-danger-dark">*</strong></label>
                                        <p class="control has-icons-left">
                                            <input class="input" type="number" placeholder="Berapa mg/dL" v-model="gD">
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-child"></i>
                                            </span>
                                        </p>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-8" v-if="typeCU === 'kolesterol'">
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="field has-addons">
                                                <label class="label mr-4">Kadar kolesterol terakhir<strong class="has-text-danger-dark">*</strong></label>
                                                <p class="control has-icons-left">
                                                    <input class="input" type="number" placeholder="Berapa mg/dL" v-model="kol" @click="listenKolAge">
                                                    <span class="icon is-small is-left">
                                                        <i class="fa fa-child"></i>
                                                    </span>
                                                </p>

                                                <p class="control ml-4">
                                                    {{ infoKol }}
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-8" v-if="typeCU === 'asam urat'">
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="field has-addons">
                                                <label class="label mr-4">Kadar Asam urat terakhir<strong class="has-text-danger-dark">*</strong></label>
                                                <p class="control has-icons-left">
                                                    <input class="input" type="number" placeholder="Berapa (mg/desileter)" v-model="aM">
                                                    <span class="icon is-small is-left">
                                                        <i class="fa fa-child"></i>
                                                    </span>
                                                </p>
                                                <p class="control ml-4">
                                                    mg/desileter
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="button is-rounded is-link is-outlined is-medium mt-4 mb-2 mr-2" v-on:click="submit">Sumbit</button>
                            <button class="button is-rounded is-danger is-outlined is-medium mt-4 mb-2 ml-2" v-on:click="reset">Reset</button>
                            <div class="container mt-2" v-if="resultConsult.length > 0">
                                <label class="label has-text-danger-dark">Hasil Check-Up :</label>
                                <article class="message is-info">
                                    <div class="message-body">
                                       {{ resultConsult }}
                                    </div>
                                </article>
                            </div>
                            <div class="columns container mt-2 has-text-center">
                                <div class="column">
                                    <label class="label" v-if="listHospital.length > 0">Faskes MCU rekanan kami: </label>
                                    <loading v-if="isLoading"></loading>
                                    <HospitalItem 
                                        v-for="hospital in listHospital"
                                        :key="hospital.id"
                                        :title="hospital.name"
                                        :coordinate="[parseFloat(hospital.coordinate.split(',')[0]), parseFloat(hospital.coordinate.split(',')[1])]"
                                        :address="hospital.address" 
                                        :phone="hospital.phone" 
                                        >
                                    </HospitalItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from '@/utils/widgets/widget.helper'
import consultAnswer from '@/utils/consult.cu.answer'
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
import {Loading, HospitalItem} from '@/components/index'
import { getLocation } from '@/services/openstreetmap.services'
import { getAllHospitalBasedLocation } from '@/services/hospitals.services'
import { successType } from '@/services/auth.services'
export default {
    name: 'CheckUp',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        LMap, LTileLayer, LMarker, LPopup, Loading, HospitalItem
    },
    data() {
        return {
            lat: '',
            lng: '',
            typeCU: '',
            gender: '',
            isEaten: null,
            isIfthar: null,
            gD: null,
            aM: null,
            kol: null,
            infoKol: '',
            resultConsult: '',
            age: null,
            city: '',
            listHospital: [],
            isLoading: false,
            isResultRight: false,
        }
    },
    methods: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    this.lat = pos.coords.latitude
                    this.lng = pos.coords.longitude
                    this.city = await getLocation(pos.coords.latitude, pos.coords.longitude)
                });
            } else {
                const toast = Toast(this.$swal)
                toast.fire({
                    icon: "error",
                    title: `Mohon izinkan akses gps pada browser anda`
                })
            }
        },
        listenKolAge() {
            if (this.age && this.age < 20) {
                this.infoKol = 'LDL <110 mg/dL & HDL > 45 mg/dL'
            } else {
                this.infoKol = 'LDL <100 mg/dL & HDL > 40 mg/dL'
            }
        },
        indicatorGd() {
            if (this.age < 6) {
                if (this.isIfthar === 'yes') {
                    if (this.gD > 80 && this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }

                if (this.isEaten === 'no') {
                    if (this.gD >= 100 && this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }

                if (this.isEaten === 'yes') {
                    if (this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }
            } else if (this.age >= 6 && this.age < 20) {
                if (this.isIfthar === 'yes') {
                    if (this.gD > 80 && this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }

                if (this.isEaten === 'no') {
                    if (this.gD >= 90 && this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }

                if (this.isEaten === 'yes') {
                    if (this.gD <= 140) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }
            } else if (this.age >= 20 && this.age < 50) {
                if (this.isIfthar === 'yes') {
                    if (this.gD > 70 && this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }

                if (this.isEaten === 'no') {
                    if (this.gD >= 70 && this.gD <= 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }

                if (this.isEaten === 'yes') {
                    if (this.gD < 180) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }
            } else if (this.age >= 50) {
                if (this.isEaten === 'no') {
                    if (this.gD < 100) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }
                if (this.isEaten === 'yes'){
                    if (this.gD < 140) {
                        this.resultConsult = consultAnswer.gDRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.gDNotRightAnswer
                        this.isResultRight = false
                    }
                }
            }
            if (!this.isResultRight) {
                this.getHospitals()
            } else {
                this.isLoading = false
            }
        },
        indicatorAm() {
            if (this.gender === 'l') {
                if (this.age <= 18) {
                    if (this.aM >= 3.6 && this.aM <= 5.5) {
                        this.resultConsult = consultAnswer.aMRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.aMManNotCorrctAnswer
                        this.isResultRight = false
                    }
                }
                if (this.age > 18 && this.age < 40) {
                    if (this.aM >= 2 && this.aM <= 7.5) {
                        this.resultConsult = consultAnswer.aMRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.aMManNotCorrctAnswer
                        this.isResultRight = false
                    }
                }
                if (this.age > 40) {
                    if (this.aM >= 2 && this.aM <= 8.5) {
                        this.resultConsult = consultAnswer.aMRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.aMManNotCorrctAnswer
                        this.isResultRight = false
                    }
                }
            }  else if (this.gender === 'p') {
                if (this.age <= 18) {
                    if (this.aM >= 3.6 && this.aM <= 4) {
                        this.resultConsult = consultAnswer.aMRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.aMManNotCorrctAnswer
                        this.isResultRight = false
                    }
                }
                if (this.age > 18 && this.age < 40) {
                    if (this.aM >= 2 && this.aM <= 6.5) {
                        this.resultConsult = consultAnswer.aMRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.aMManNotCorrctAnswer
                        this.isResultRight = false
                    }
                }
                if (this.age > 40) {
                    if (this.aM >= 2 && this.aM <= 8) {
                        this.resultConsult = consultAnswer.aMRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.aMManNotCorrctAnswer
                        this.isResultRight = false
                    }
                }
            } 
            if (!this.isResultRight) {
                this.getHospitals()
            } else {
                this.isLoading = false
            }
        },
        indicatorKol() {
            if (this.gender === 'l') {
                if (this.age <= 19) {
                    if (this.kol <= 170) {
                        this.resultConsult = consultAnswer.kolRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.kolNotCorrectAnswer
                        this.isResultRight = false
                    }
                }
                if (this.age >= 20) {
                    if (this.kol <= 200) {
                        this.resultConsult = consultAnswer.kolRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.kolNotCorrectAnswer
                        this.isResultRight = false
                    }
                }
            }  else if (this.gender === 'p') {
                if (this.age <= 19) {
                    if (this.kol <= 170) {
                        this.resultConsult = consultAnswer.kolRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.kolNotCorrectAnswer
                        this.isResultRight = false
                    }
                }
                if (this.age >= 20) {
                    if (this.kol <= 200) {
                        this.resultConsult = consultAnswer.kolRightAnswer
                        this.isResultRight = true
                    } else {
                        this.resultConsult = consultAnswer.kolNotCorrectAnswer
                        this.isResultRight = false
                    }
                }
            }  
            if (!this.isResultRight) {
                this.getHospitals()
            } else {
                this.isLoading = false
            }
        },
        async getHospitals() {
            const toast = Toast(this.$swal)
                let res = await getAllHospitalBasedLocation(this.city)
                if (res.type === successType) {
                    this.listHospital = res.data.data
                    this.isLoading = false
                    if (res.data.data.length < 1) {
                            this.$swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Faskes di daerah anda belum tersedia.",
                            })
                        }
                } else {
                    toast.fire({
                        icon: "error",
                        title: `${res.data.message}`
                    })
                    this.isLoading = false
                }
        },
        submit() {
            this.isLoading = true
            let isValid = true
            this.listHospital = []
            if (this.age == null) {
                isValid = false
            }

            if (this.gender.length < 1) {
                isValid = false
            }

            if (this.typeCU.length < 1) {
                isValid = false
            }

            if (this.typeCU == 'gula darah' ) {
                if (this.isEaten == null) {
                    isValid = false
                }
                if (this.isIfthar == null) {
                    isValid = false
                }
                if (this.gD == null) {
                    isValid = false
                }
            }

            if (!isValid) {
                this.$swal.fire({
                    icon: 'error',
                    text: 'Mohon semua form diisi lengkap',
                    title: 'Oops...'
                })
            } else {
                if (this.typeCU == 'gula darah') {
                    this.indicatorGd()
                } else if (this.typeCU == 'kolesterol') {
                    this.indicatorKol()
                } else {
                    this.indicatorAm()
                }
            }
        },
        reset() {
            this.typeCU = ''
            this.gender= ''
            this.isEaten= null
            this.isIfthar= null
            this.gD= null
            this.aM= null
            this.kol= null
            this.infoKol= ''
            this.resultConsult= ''
            this.age= null
            this.listHospital = []
            this.isLoading = false
        }

    },
    created() {
        this.getLocation()
    }
}
</script>