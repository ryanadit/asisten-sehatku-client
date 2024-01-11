import axios from "axios"

const getLocation = async (lat = '', lng = '') => {
    let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    return await axios.get(url).then((res) => {
        return res.data.address.county.toLowerCase().replace('regency', '')
    }).catch(() => {
        return
    })
}

export {
    getLocation
}