import { ref } from 'vue'

const cookieData = ref<{ [key: string]: string }>({})

// initialize reactive cookie data
export function initCookies() {
  const cookies = document.cookie.split('; ')
  cookies.forEach((i) => {
    const split = i.split('=')
    cookieData.value[split[0]] = split[1]
  })
}

const defaultPrefix = import.meta.env.VITE_STORAGE_PREFIX || '_ghub'

export function useCookies(prefix = defaultPrefix) {
  const getCookieKey = (key: string) => {
    key = key.trim()

    if (!key.startsWith(prefix)) {
      return `${prefix}_${key}`.trim()
    }
    return key.trim()
  }

  const setCookie = (key: string, value: string) => {
    key = getCookieKey(key)

    document.cookie = `${key}=${value}; path=/; SameSite=Lax;Secure;`

    cookieData.value[key] = value
  }

  const getCookie = (key: string) => {
    key = getCookieKey(key)

    if (cookieData.value[key]) {
      return cookieData.value[key]
    }

    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split('=')[1]

    if (value) {
      setCookie(key, value)
    }

    return value
  }

  const deleteCookie = (key: string) => {
    key = getCookieKey(key)

    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure;`

    if (cookieData.value[key]) {
      delete cookieData.value[key]
    }
  }

  const deleteAllCookies = () => {
    const cookies = document.cookie.split('; ')

    if (cookies.length < 0) {
      return
    }

    for (let x = 0; x < cookies.length; x++) {
      const [key, _] = cookies[x].split('=')
      if (key.startsWith(prefix)) {
        deleteCookie(key)
      }
    }

    cookieData.value = {}
  }

  return {
    setCookie,
    getCookie,
    deleteCookie,
    deleteAllCookies
  }
}
