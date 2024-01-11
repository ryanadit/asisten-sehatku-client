import { service, handleErrorResponse } from '@/utils/config/service.config'
import storageState from '@/utils/storage.state'
import authHeader from './auth.header'

const successType = 'success'
const failedType = 'failed'
const wordingTokenExipred = 'Unauthorized! Access Token expired!'

const RegisterService = async (data = {}) => {
    let response = {}
    try {
        let result = await service.post('/register', data)
        if (result.status == 200) {
            response = {
                type : successType,
                data: result.data
            }
        }
        return response
    } catch (error) {
        return handleErrorResponse(error)
    }
}

const LoginService = async (data = {}) => {
    let response = {}
    try {
        let result = await service.post('/login', data)
        if (result.status == 200) {
            storageState.authStore.commit('saveToken', result.data.accessToken)
            storageState.authStore.commit('saveRefreshToken', result.data.refreshToken)
            storageState.authStore.commit('saveIsLoged', true)
            storageState.authStore.commit('saveEmail', data.email)
            response = {
                type : successType,
                data: result.data
            }
        }
        return response
    } catch (error) {
        return handleErrorResponse(error)
    }
}

const verifyEmailRegister = async (tokenVerify = '') => {
    let response = {}
    try {
        let result = await service.put('/verify/'+tokenVerify)
        if (result.status == 200) {
            response = {
                type : successType,
                data: result.data
            }
        }
        return response
    } catch (error) {
        return handleErrorResponse(error)
    }
}

const findEmaiService = async (data = {}) => {
    let response = {}
    try {
        let result = await service.post('/findEmail', data)
        if (result.status == 200) {
            response = {
                type : successType,
                data: result.data
            }
        }
        return response
    } catch (error) {
        return handleErrorResponse(error)
    }
}

const forgotAccountService = async (data = {}, token = '') => {
    let response = {}
    try {
        let result = await service.post('/forgotPassword/'+token, data)
        if (result.status == 200) {
            response = {
                type : successType,
                data: result.data
            }
        }
        return response
    } catch (error) {
        return handleErrorResponse(error)
    }
}

const logoutService = async () => {
    let response = {}
    try {
        let data = {
            refreshToken : storageState.authStore.state.refreshToken
        }
        let result =  await service.post('/logout', data, { headers: authHeader() })
        if (result.status == 200) {
            storageState.authStore.commit('saveToken')
            storageState.authStore.commit('saveRefreshToken')
            storageState.authStore.commit('saveIsLoged')
            response = {
                type : successType,
                data: result.data
            }
        }
        console.log(result.data);
        return response
    } catch (error) {
        return handleErrorResponse(error)
    }
}

export {
    RegisterService,
    LoginService,
    successType,
    failedType,
    wordingTokenExipred,
    verifyEmailRegister,
    findEmaiService,
    forgotAccountService,
    logoutService
}