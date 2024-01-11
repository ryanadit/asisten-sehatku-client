import { service, handleErrorResponse } from '@/utils/config/service.config'
import authHeader from './auth.header'
import {successType} from '@/services/auth.services'

const getProfileService = async () => {
    let response = {}
    try {
        let result = await service.post('/profile/detail', {}, { headers: authHeader() })
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

const updateProfileService = async (data = {}) => {
    let response = {}
    try {
        let result = await service.put('/profile/update', data, { headers: authHeader() })
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

export {
    getProfileService,
    updateProfileService
}