import {
  type HttpErrorResponseAttr,
  type HttpClientConfig,
  type Result,
  type FetchClient
} from './types'

const authKey =
  import.meta.env.VITE_AUTH_KEY &&
  import.meta.env.VITE_AUTH_KEY !== '' &&
  import.meta.env.VITE_STORAGE_PREFIX &&
  import.meta.env.VITE_STORAGE_PREFIX !== ''
    ? `${import.meta.env.VITE_STORAGE_PREFIX}_${import.meta.env.VITE_AUTH_KEY}`
    : '_oss_AUT'

function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/login'

      document.cookie = `${authKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure;`
    }
    throw response
  }
  return response.json()
}

function handleError<T>(error: Response | any): Promise<Result<T>> {
  handleUnauthorizedError(error)

  if (error instanceof Response) {
    return error.json().then((data) => {
      const errorData: HttpErrorResponseAttr = {
        statusCode: error.status || 500,
        msg: data.msg || 'An error occurred.',
        error_details: data
      }
      return [errorData, null]
    })
  } else {
    return Promise.resolve([
      {
        statusCode: 500,
        msg: 'Unexpected error occurred.',
        error_details: {}
      },
      null
    ])
  }
}

function handleUnauthorizedError(error: any) {
  if (error && error.status === 401) {
    document.cookie = `${authKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure;`

    window.location.href = '/login'
  }
}

function checkLocalStorageSupport(): boolean {
  try {
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
    return true
  } catch (e) {
    return false
  }
}

function checkCookiesSupport(): boolean {
  try {
    document.cookie = 'cookietest=1'
    const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT'
    return cookiesEnabled
  } catch (e) {
    return false
  }
}

const localStorageAvailable = checkLocalStorageSupport()
const cookiesAvailable = checkCookiesSupport()

function getAuthToken(authKey: string): string | null {
  // check cookies first
  if (cookiesAvailable) {
    // If not in localStorage, check cookies (this is a simple method and might not handle all cookie formats)
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(authKey + '='))
      ?.split('=')[1]

    if (cookieValue) {
      return cookieValue
    }
  }

  // check localStorage
  if (localStorageAvailable) {
    const token = localStorage.getItem(authKey)

    if (token) {
      return token
    }
  }

  return null
}

export function getHttpClient({ baseUrl, requestHeaders, auth }: HttpClientConfig): FetchClient {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...requestHeaders
  })

  const safelyExecute = async <T>(request: Promise<Response>): Promise<Result<T>> => {
    try {
      const response = await request
      const data = await handleResponse<T>(response)
      return [null, data]
    } catch (err) {
      return handleError<T>(err)
    }
  }

  function getDynamicHeaders(): HeadersInit {
    if (!auth || auth.valueKey === '') {
      return headers
    }

    const token = getAuthToken(auth.valueKey)

    if (token) {
      if (auth.isBearer) {
        return {
          ...{
            'Content-Type': 'application/json'
          },
          ...requestHeaders,
          authorization: `Bearer ${token}`
        }
      }

      return {
        ...{
          'Content-Type': 'application/json'
        },
        ...requestHeaders,
        [auth.headerKey]: token
      }
    }

    return { 'Content-Type': 'application/json', ...requestHeaders }
  }

  return {
    async get<T>(url: string, config?: RequestInit): Promise<Result<T>> {
      return safelyExecute<T>(
        fetch(baseUrl + url, {
          ...config,
          method: 'GET',
          headers: getDynamicHeaders(),
          cache: 'no-cache'
        })
      )
    },

    async post<T>(url: string, data?: any, config?: RequestInit): Promise<Result<T>> {
      try {
        return safelyExecute<T>(
          fetch(baseUrl + url, {
            ...config,
            method: 'POST',
            headers: getDynamicHeaders(),
            body: JSON.stringify(data),
            cache: 'no-cache'
          })
        )
      } catch (err) {
        return [
          {
            statusCode: 500,
            msg: 'error'
          },
          null
        ]
      }
    },

    async put<T>(url: string, data?: any, config?: RequestInit): Promise<Result<T>> {
      return safelyExecute<T>(
        fetch(baseUrl + url, {
          ...config,
          method: 'PUT',
          headers: getDynamicHeaders(),
          body: JSON.stringify(data),
          cache: 'no-cache'
        })
      )
    },

    async patch<T>(url: string, data?: any, config?: RequestInit): Promise<Result<T>> {
      return safelyExecute<T>(
        fetch(baseUrl + url, {
          ...config,
          method: 'PATCH',
          headers: getDynamicHeaders(),
          body: JSON.stringify(data),
          cache: 'no-cache'
        })
      )
    },

    async delete<T>(url: string, config?: RequestInit): Promise<Result<T>> {
      return safelyExecute<T>(
        fetch(baseUrl + url, {
          ...config,
          method: 'DELETE',
          headers: getDynamicHeaders(),
          cache: 'no-cache'
        })
      )
    }
  }
}
