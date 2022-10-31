import type { RouteRecordRaw } from 'vue-router'
import type { IBreadcrumb } from '@/base-ui/breadcrumb'

// 第一个菜单
let firstMenu: any = null

// 菜单数组 -> 每一项的id数组
export function mapMenuToKeys(menuList: any[]) {
  const menuKeys: number[] = []

  function _recurseGetKeys(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetKeys(menu.children ?? [])
      } else {
        menuKeys.push(menu.id)
      }
    }
  }
  _recurseGetKeys(menuList)

  return menuKeys
}

// 用户菜单 -> 权限
export function mapMenuToPermission(userMenus: any[]) {
  const userPermissions: string[] = []

  function _recurseGetPermission(userMenus: any[]) {
    for (const menu of userMenus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        userPermissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return userPermissions
}

// 用户菜单、当前页面path -> 面包屑
export function mapPathToBreadcrumbs(userMenus: any[], path: string) {
  const breadcrumbs: IBreadcrumb[] = []
  mapPathToMenu(userMenus, path, breadcrumbs)
  return breadcrumbs
}

export function mapPathToMenu(userMenus: any[], path: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], path)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}

// 用户菜单 -> 动态注册的routes数组
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 加载所有的route对象，放到allRoutes数组中
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts$/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.slice(1))
    allRoutes.push(route.default)
  })

  // 2. 根据用户菜单权限（userMenus），从allRoutes中找出对应的路由对象放到routes中
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }
