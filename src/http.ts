import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
export interface HttpClientOptions extends AxiosRequestConfig {}
export enum  RequestMethod {
  GET = 'GET',
  POST = 'POST',
  HEAD = 'HEAD',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}
export class HttpClient {
  private instance: AxiosInstance
  constructor(options: HttpClientOptions) {
    this.instance = Axios.create(options)
  }

  async common(type: RequestMethod, url: string, data: any = {}, options: any = {}) {
    let config: any = {
      method: type,
      cache: options.cache == null ? true : options.cache,
      url: url,
      dataType: 'json',
    }

    if (type.toLowerCase() === 'GET') {
      config.params = data
    } else {
      config.data = data
    }
    try {
      return await this.instance({ ...config, ...options})
    } catch (err) {
      throw err
    }
  }
}