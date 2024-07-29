export interface PaginationResult<T> {
  page: number
  total_pages: number
  count: number
  data: T[]
}

export type HttpErrorResponseAttr = {
  statusCode: number
  msg: string
  error_details?: { [key: string]: any }
}

export interface ErrorResponseData {
  detail: string
}

export interface HttpRequestHeaders {
  [key: string]: string
}

export type SuccessResult<T> = [null, T]
export type ErrorResult = [HttpErrorResponseAttr, null]
export type Result<T> = SuccessResult<T> | ErrorResult

export interface FetchClient {
  get<T>(url: string, config?: RequestInit): Promise<Result<T>>
  post<T>(url: string, data?: any, config?: RequestInit): Promise<Result<T>>
  put<T>(url: string, data?: any, config?: RequestInit): Promise<Result<T>>
  patch<T>(url: string, data?: any, config?: RequestInit): Promise<Result<T>>
  delete<T>(url: string, config?: RequestInit): Promise<Result<T>>
}

export type HttpClientConfig = {
  baseUrl: string
  requestHeaders?: HttpRequestHeaders
  auth?: {
    valueKey: string
    headerKey: string
    isBearer: boolean
  }
}
