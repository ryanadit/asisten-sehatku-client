<template>
    <div class="card mt-5">
        <header class="card-header">
            <div class="card-header-title">
                {{ $props.title }}
            </div>
        </header>
        <div class="card-content">
            <div class="subtitle is-6 has-text-info-dark">
                <span class="icon is-small is-left">
                     <i class="fa fa-home"></i>
                </span>
               {{ $props.address }}
            </div>
            <div class="subtitle is-6 has-text-primary-dark">
                <span class="icon is-small is-left">
                     <i class="fa fa-phone"></i>
                </span>
                {{ $props.phone }}
            </div>
            <br>
            <l-map style="height: 300px" :zoom="zoom" :center="$props.coordinate" :use-global-leaflet="false">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="$props.coordinate">
                    <l-popup>
                        <div class="subtitle is-6">
                            {{ $props.title }}
                        </div>
                        <p>
                            {{ $props.address }}
                        </p>
                    </l-popup>
                </l-marker>
            </l-map>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
export default {
    name: 'HospitalItem',
    props: {
        title: String,
        coordinate: [],
        address: String,
        phone: String
    },
    data() {
        return {
            attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            zoom: 10,
        }
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        LMap, LTileLayer, LMarker, LPopup,
    }
}

</script>