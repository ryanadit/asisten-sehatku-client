import axios from "axios"
import storageState from '@/utils/storage.state'
import {wordingTokenExipred, failedType} from '@/services/auth.services'

const service = axios.create({
    timeout: 15000,
    baseURL: 'http://localhost:8808/api/v1'
})

const handleErrorResponse = (error) => {
    let response = {}
    if (error.response.data.message.toLocaleLowerCase === wordingTokenExipred.toLocaleLowerCase) {
        storageState.authStore.commit('saveToken')
        storageState.authStore.commit('saveRefreshToken')
        storageState.authStore.commit('saveIsLoged')
    }
    response = {
        type : failedType,
        data: error.response.data
    }
    console.log(error)
    return response
} 


export {
    service,
    handleErrorResponse
}