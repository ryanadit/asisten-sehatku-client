'use Strict'
const emailValidation = (val = '') => {
    if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(val)) {
        return 'Silahkan masukkan email anda dengan benar'
    } else {
        return ''
    }
}

const passwordValidation = (val = '') => {
    if (val.length < 8) {
        return 'Password minimal 8 karakter'
    } else {
        return ''
    }
}

const formNotEmptyValidation = (nameForm = '' , val = '') => {
    if (val.length < 1) {
        return nameForm+' tidak boleh kosong'
    } else {
        return ''
    }
}

const confirmPasswordValidation = (password = '', confirmPassword = '') => {
    if (password !== confirmPassword) {
        return 'Password tidak sama dan belum benar'
    } else {
        return ''
    }
}



export default {
    emailValidation,
    passwordValidation,
    formNotEmptyValidation,
    confirmPasswordValidation,
}