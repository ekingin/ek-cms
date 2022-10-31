import type { Module } from 'vuex'
import type { ILoginType } from './types'
import type { IRootType } from '../types'

import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import localCatch from '@/utils/catch'
import { mapMenusToRoutes, mapMenuToPermission } from '@/utils/map-menus'
import router from '@/router'

const loginModule: Module<ILoginType, IRootType> = {
  namespaced: true,
  state() {
    return {
      token: '', // Token
      userInfo: {}, // 用户信息
      userMenus: [], // 用户菜单
      permissions: [] // 权限列表
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 动态注册路由：userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      // routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 根据用户菜单获取按钮权限
      const permissions = mapMenuToPermission(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 1. 用户登录校验，获取用户id、token
      const loginRes = await accountLoginRequest(payload)
      const { id, token } = loginRes.data
      commit('changeToken', token)
      localCatch.setCatch('token', token)

      // 1.1获取初始化数据（完整的部门、角色）
      dispatch('getInitialDataAction', null, { root: true })

      // 2. 获取用户信息
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCatch.setCatch('userInfo', userInfo)

      // 3. 获取用户菜单
      const userMenusRes = await getUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusRes.data
      commit('changeUserMenus', userMenus)
      localCatch.setCatch('userMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')
    },

    // 当页面刷新时，因为vuex中的信息会丢失，所以调用该方法从缓存中恢复vuex中的信息
    loadLocalLogin({ commit, dispatch }) {
      const token = localCatch.getCatch('token')
      if (token) {
        commit('changeToken', token)
        // 获取初始化数据（完整的部门、角色）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCatch.getCatch('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCatch.getCatch('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
