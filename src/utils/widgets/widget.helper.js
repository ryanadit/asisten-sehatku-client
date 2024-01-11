const Toast = (swal) => swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = this.$swal.stopTimer;
        toast.onmouseleave = this.$swal.resumeTimer;
    }
})

const ToastTop = (swal) => swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = this.$swal.stopTimer;
        toast.onmouseleave = this.$swal.resumeTimer;
    }
})

export {
    Toast,
    ToastTop
}