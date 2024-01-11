import storageState from '@/utils/storage.state'

const authHeader = (withFormData = false) => {
    let token = storageState.authStore.state.token
    if (token) {
        if (withFormData) {
            return {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        }
        return { Authorization: 'Bearer ' + token }
    } else {
        return {}
    }
}

export default authHeader