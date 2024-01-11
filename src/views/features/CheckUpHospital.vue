<template>
    <div class="container is-widescreen" id="cu-container">
            <div class="title ml-4 has-text-info-dark">
                Fasilitas Kesehatan Medical Check-up
                <p class="subtitle is-6 mt-2 has-text-link-dark">
                    Untuk saat ini faskes hanya tersedia untuk daerah Yogyakarta dan sekitarnya
                </p>
            </div>
            <div class="columns">
                <div class="column is-4 container has-text-centered">
                    <div class="form" @keyup.enter="search">
                        <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Cari Faskes" v-model="searchText">
                        </div>
                        <div class="control">
                            <a class="button is-info" v-on:click="search">
                                Search
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="column is-7"></div>
            </div>
            <div class="columns" v-if="isAdmin">
                <div class="column is 6">
                    <div class="container ml-4 mr-4">
                        <div class="field">
                            <progress class="progress is-link" max="100" v-bind:value="progress" v-if="progress > 0">{{ progress }}%</progress>
                        <div class="file has-name is-left is-success-dark">
                        <label class="file-label">
                            <input class="file-input" type="file" name="file" id="file" ref="file" v-on:change="selectFile" accept="application/csv, .csv">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fa fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                    Pilih file csv
                                    </span>
                                </span>
                            <span class="file-name">
                                {{ filename }}
                            </span>
                        </label>
                        </div>
                        <div class="button is-link is-rounded is-outlined is-little mt-4 mb-4" v-on:click="upload"> Upload</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="subtitle ml-4 has-text-info-dark">
                Hasil Pencarian : 
            </div>
            <div class="container" v-if="listHospital.length <= 0">
                Belum ada pencarian
            </div>
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
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
import {  uploadHospitalCsv, getAllHospitalBasedLocation } from '@/services/hospitals.services'
import { successType } from '@/services/auth.services'
import { Loading, HospitalItem } from '@/components/index'
import { Toast, ToastTop } from '@/utils/widgets/widget.helper'
import storageState from '@/utils/storage.state'
export default {
    name: 'CheckUpHospital',
    data() {
        return {
            markerLatLng: [-7.7137364, 110.4489611],
            center: [-7.7137364, 110.4489611],
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],
            filename: 'Upload file csv data faskes',
            isAdmin: false,
            listHospital: [],
            searchText: '',
            isLoading: false,
        }
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        LMap, LTileLayer, LMarker, LPopup, HospitalItem, Loading
    },
    methods: {
        selectFile(e) {
            var files = e.target.files || e.dataTransfer.files
            this.filename = files.item(0).name
            this.selectedFiles = files
        },
        async upload() {
            if (this.selectFile !== undefined) {
                const toast = Toast(this.$swal)
                this.progress = 0;

                this.currentFile = this.selectedFiles.item(0);
                await uploadHospitalCsv(this.currentFile, event => {
                    this.progress = Math.round((100 * event.loaded) / event.total);
                }).then(res => {
                    if (res.status === 200) {
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
                }).catch(error => {
                    toast.fire({
                            icon: "error",
                            title: `${error.response.data.message}`
                        })
                })
            } else {
                this.$swal.fire({
                    title: "Failed",
                    text: "File masih kosong",
                    icon: "error"
                })
            }
        },
        async search() {
            this.isLoading = true
            if (this.searchText.length > 0) {
                const toast = ToastTop(this.$swal)
                let res = await getAllHospitalBasedLocation(this.searchText)
                if (res.type === successType ) {
                    this.listHospital = res.data.data
                    this.isLoading = false
                    if (res.data.data.length < 1) {
                        this.$swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Faskes tidak ada atau belum tersedia.",
                        })
                    }
                } else {
                    this.isLoading = false
                        toast.fire({
                            icon: "error",
                            title: `${res.data.message}`
                        })
                    this.listHospital = []
                }
            } else {
                this.isLoading = false
                this.listHospital = []
            }
        }
    },
    created() {
        if (storageState.authStore.state.email === storageState.emailAdmin) {
            this.isAdmin = true
        }
    }
}
</script>
<style scoped>
#cu-container {
    margin-top: 8%;
    margin-left: 20px;
    margin-right: 20px;
    border-width: 2px;
    border-style: solid; 
    padding-top: 10px;
    padding-bottom: 20px;
    border-color: aliceblue;
}
</style>