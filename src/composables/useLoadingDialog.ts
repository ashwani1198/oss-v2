import { readonly, ref } from 'vue'

const isLoading = ref(false)
let hideTimeoutId: ReturnType<typeof setTimeout> | null = null // Store the timeout ID

export function useLoadingDialog() {
  const showLoading = () => {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId) // Cancel the pending hideLoading
      hideTimeoutId = null
    }
    isLoading.value = true
  }

  const hideLoading = (delay?: number) => {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId) // Ensure to cancel any existing timeout
    }

    if (delay) {
      hideTimeoutId = setTimeout(() => {
        isLoading.value = false
        hideTimeoutId = null // Reset the timeout ID after execution
      }, delay * 1000)
    } else {
      isLoading.value = false
    }
  }

  const hideLoadingAsync = async (delay?: number) => {
    return new Promise((resolve) => {
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId) // Ensure to cancel any existing timeout
      }

      if (delay) {
        hideTimeoutId = setTimeout(() => {
          isLoading.value = false
          hideTimeoutId = null // Reset the timeout ID after execution
          resolve(true)
        }, delay * 1000)
      } else {
        isLoading.value = false
        resolve(true)
      }
    })
  }

  return {
    isLoading: readonly(isLoading),
    showLoading,
    hideLoading,
    hideLoadingAsync
  }
}
