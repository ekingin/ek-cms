type IPermission = 'create' | 'update' | 'delete' | 'query'

import { useStore } from '@/store'

/**
 * 在模块中是否有某个权限
 * @param pageName 二级菜单对应的模块名
 * @param permission 权限名
 * @returns
 */
export function usePermisson(pageName: string, permission: IPermission) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const targetPermission = `system:${pageName}:${permission}`
  return !!permissions.find((item) => item === targetPermission)
}
