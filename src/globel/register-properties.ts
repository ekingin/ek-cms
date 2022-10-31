import type { App } from 'vue'

import { formatUtcTime } from '@/utils/date-format'

// 注册一个全局对象filter, filter中定义一些工具函数
export default function (app: App) {
  app.config.globalProperties.$filter = {
    formatUtcTime
  }
}
