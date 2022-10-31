import type { IRootType } from '@/store/types'
import type { Module } from 'vuex'
import type { ISystemType } from './types'

import {
  getPageList,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModel: Module<ISystemType, IRootType> = {
  namespaced: true,
  state() {
    return {
      usersList: [], // 用户列表
      usersCount: 0, // 用户数量
      roleList: [], // 角色列表
      roleCount: 0, // 角色数量
      goodsList: [], // 商品列表
      goodsCount: 0, // 商品数量
      menuList: [], // 菜单列表
      menuCount: 0 // 菜单数量
    }
  },
  getters: {
    getPageList(state: any) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    },
    getListCount(state: any) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    // 获取页面表格数据
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const { pageName, queryInfo } = payload
      const pageUrl = `/${pageName}/list`

      // 2.对页面发送网络请求
      const res = await getPageList(pageUrl, queryInfo)

      // 3.修改vuex中的state
      const { list, totalCount } = res.data
      const changePageName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    // 删除表格数据
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.调用删除的网络请求
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      await deletePageData(url)

      // 2.重新获取表格数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建表格数据
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.调用新建的网络请求
      const { pageName, newData } = payload
      const url = `/${pageName}`
      await createPageData(url, newData)

      // 2.重新获取表格数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑表格数据
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.调用编辑的网络请求
      const { pageName, editData, id } = payload
      const url = `/${pageName}/${id}`
      await editPageData(url, editData)

      // 2.重新获取表格数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModel
