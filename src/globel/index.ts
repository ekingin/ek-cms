import { App } from 'vue'
import registerElementPlus from './register-element-plus'
import registerProperties from './register-properties'

// 全局注册第三方库
export default function (app: App): void {
  app.use(registerElementPlus)
  app.use(registerProperties)
}
