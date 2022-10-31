import type { Store } from 'vuex'
import type { IRootType, IStoreType } from './types'

import { createStore, useStore as userVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageList } from '@/service/main/system/system'

const store = createStore<IRootType>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list: any[]) {
      state.entireRole = list
    },
    changeEntireMenu(state, list: any[]) {
      state.entireMenu = list
    }
  },
  actions: {
    // 获取初始化数据
    async getInitialDataAction({ commit }) {
      // 1.获取所有的部门信息
      const deptRes = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: deptList } = deptRes.data

      // 2.获取所有的角色信息
      const roleRes = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleRes.data

      // 3.获取所有的菜单信息
      const menuRes = await getPageList('/menu/list', {})
      const { list: menuList } = menuRes.data

      // 保存数据在vuex中
      commit('changeEntireDepartment', deptList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

// 注册Store
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// vuex中useStore<Store: any>对模块的类型推导不够严谨，现自定义useStore
export function useStore(): Store<IStoreType> {
  return userVuexStore()
}

export default store
