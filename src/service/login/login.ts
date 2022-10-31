import type { IAccount, ILoginResult } from './types'
import type { IDataType } from '../types'

import ekRequest from '../index'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

/**
 * 用户登录请求
 * @param account 账号信息（name、password）
 * @returns Promise
 */
export function accountLoginRequest(account: IAccount) {
  return ekRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

/**
 * 获取用户信息
 * @param id 用户id
 * @returns Promise
 */
export function getUserInfoById(id: number) {
  return ekRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id,
    showLoading: false
  })
}

/**
 * 获取用户菜单
 * @param id 用户角色id
 * @returns Promise
 */
export function getUserMenusByRoleId(id: number) {
  return ekRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
