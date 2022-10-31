import { Module } from 'vuex'
import { IRootType } from '@/store/types'
import { IDashBoardType } from './types'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashBoardModul: Module<IDashBoardType, IRootType> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [], // 分类商品数量
      categoryGoodsFavor: [], // 分类商品收藏
      categoryGoodsSale: [], // 分类商品销量
      addressGoodsSale: [] // 不同城市商品销量
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list: any[]) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list: any[]) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list: any[]) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list: any[]) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashBoardDataAction({ commit }) {
      const categoryGoodsCountRes = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCountRes.data)
      const categoryGoodsSaleRes = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSaleRes.data)
      const categoryGoodsFavorRes = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavorRes.data)
      const addressGoodsSaleRes = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSaleRes.data)
    }
  }
}

export default dashBoardModul
