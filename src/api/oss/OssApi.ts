import appEnv from '@/constants/appEnv'
import { type FetchClient, type HttpClientConfig, getHttpClient } from '@/api/httpClient'
import * as resources from './resources'

export class OssApi {
  private _httpClient: FetchClient
  private static _instance: OssApi

  private constructor(data: HttpClientConfig) {
    this._httpClient = getHttpClient(data)
  }

  static getInstance(data?: Pick<HttpClientConfig, 'auth'>): OssApi {
    if (!this._instance) {
      this._instance = new OssApi({
        baseUrl: appEnv.VITE_OSS_API_URL,
        requestHeaders: {
          Authorization: `Bearer ${appEnv.VITE_AUTH_TOKEN}`
        },
        auth: data?.auth ?? undefined
      })
    }

    return this._instance
  }

  get members() {
    return resources.members(this._httpClient)
  }
}
