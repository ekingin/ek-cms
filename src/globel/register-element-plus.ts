// 引入类型
import { App } from 'vue'
// 全局引入element-plus所有组件的基础样式，
// 每个组件的单独样式通过babel-plugin-import插件在babel.config.js中引入
import 'element-plus/lib/theme-chalk/base.css'
// 局部引入element-plus组件
import {
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElButton,
  ElRadio,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElOption,
  ElRow,
  ElCol,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus'

const components = [
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElButton,
  ElRadio,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElOption,
  ElRow,
  ElCol,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
]

export default function (app: App): void {
  // 全局注册element-plus组件
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
