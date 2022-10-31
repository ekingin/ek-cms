import type { AxiosInstance } from 'axios'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import type { EKInterceptors, EKRequestConfig } from './types'

import axios from 'axios'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

// 每一个EKRequest实例有自己的axios实例，且根据需要可以传入自定义拦截器函数
class EKRequest {
  instance: AxiosInstance // axios实例
  interceptors?: EKInterceptors // 拦截器
  loading?: ILoadingInstance // ElLoading的动画加载实例
  showLoading: boolean // 是否显示加载动画

  constructor(config: EKRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 单独实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close()

        return res.data
      },
      (err) => {
        // 移除loading
        this.loading?.close()

        return err
      }
    )
  }

  request<T = any>(config: EKRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独请求的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      // 判断本次请求是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单独请求的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }

          // 重置showLoading，若不重置，则在本次请求后，该实例的其他请求也没有loading
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          // 重置showLoading
          this.showLoading = DEFAULT_LOADING

          reject(err)
        })
    })
  }

  get<T = any>(config: EKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: EKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: EKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: EKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default EKRequest
