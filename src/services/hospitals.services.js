import { service, handleErrorResponse } from '@/utils/config/service.config'
import authHeader from './auth.header'
import {successType} from '@/services/auth.services'

const getAllHospitalBasedLocation = async (location = '') => {
    let response = {}
    try {
        let result = await service.get('/hospital/getBasedLocation/'+location, { headers: authHeader() })
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

const uploadHospitalCsv = async (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("import-csv", file);

    return await service.post("/hospital/upload/csv", formData, {
      headers: authHeader(true),
      onUploadProgress
    });
  }

export {
    getAllHospitalBasedLocation,
    uploadHospitalCsv
}
