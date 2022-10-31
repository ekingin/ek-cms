import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface EKInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface EKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: EKInterceptors<T>
  showLoading?: boolean
}
