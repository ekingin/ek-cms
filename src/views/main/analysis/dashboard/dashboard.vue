<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <ek-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </ek-card>
      </el-col>
      <el-col :span="10">
        <ek-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </ek-card>
      </el-col>
      <el-col :span="7">
        <ek-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </ek-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="12">
        <ek-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </ek-card>
      </el-col>
      <el-col :span="12">
        <ek-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </ek-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import EkCard from '@/base-ui/card'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    EkCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求页面数据
    store.dispatch('dashboard/getDashBoardDataAction')

    // 从vuex中拿数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      store.state.dashboard.categoryGoodsSale.forEach((item: any) => {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      })
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      store.state.dashboard.categoryGoodsFavor.forEach((item: any) => {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      })
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>
