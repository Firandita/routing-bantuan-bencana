import { reactive } from 'vue'

const toasts = reactive([])
let uid = 0

export function useToast() {
  function showToast(message, type = 'success') {
    const id = ++uid
    toasts.push({ id, message, type })
    setTimeout(() => {
      const idx = toasts.findIndex((t) => t.id === id)
      if (idx !== -1) toasts.splice(idx, 1)
    }, 3200)
  }
  return { toasts, showToast }
}
