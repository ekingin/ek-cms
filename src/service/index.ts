import EKRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCatch from '@/utils/catch'

const ekRequest = new EKRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 单个实例的拦截器
  interceptors: {
    requestInterceptor(config) {
      // 每次请求前，添加token
      const token = localCatch.getCatch('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})

export default ekRequest
