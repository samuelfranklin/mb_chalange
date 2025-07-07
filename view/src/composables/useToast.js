import { inject } from 'vue'

export const useToast = () => {
  const ToastService = inject('$toast')

  if (!ToastService) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return {
    add: ToastService.add.bind(ToastService),
    remove: ToastService.remove.bind(ToastService),
    clear: ToastService.clear.bind(ToastService),
    toasts: ToastService.toasts,
  }
}
