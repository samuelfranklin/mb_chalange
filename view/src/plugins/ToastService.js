import { ref } from 'vue'

export default {
  install(app) {
    const toasts = ref([])

    function add(toast) {
      const leToast = { ...toast, id: Date.now().toString(16) }
      toasts.value.push(leToast)

      setTimeout(
        () => {
          remove(leToast)
        },
        toast.life * 1000 || 5 * 1000,
      )
    }

    function remove(toast) {
      toasts.value = toasts.value.filter(({ id }) => id !== toast.id)
    }

    function clear() {
      toasts.value = []
    }

    app.config.globalProperties.$toast = {
      add,
      remove,
      clear,
      toasts,
    }
    app.provide('$toast', {
      add,
      remove,
      clear,
      toasts,
    })
  },
}
