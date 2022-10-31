<template>
  <div class="page-content">
    <ek-table :dataList="dataList" :listCount="listCount" v-bind="config" v-model:page="pageInfo">
      <!-- 0. ek-table header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium" @click="handlerAddClick">
          {{ config.addBtnTxt }}
        </el-button>
      </template>

      <!-- 1. page-countent通用插槽 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row ? 'success' : 'danger'">{{
          scope.row ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filter.formatUtcTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filter.formatUtcTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <el-button
          type="text"
          icon="el-icon-edit"
          v-if="isUpdate"
          @click="handlerEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          type="text"
          icon="el-icon-delete"
          style="color: red"
          v-if="isDelete"
          @click="handlerDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 2. page-content动态插槽，插槽内容由父组件决定 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ek-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import EkTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermisson } from '@/hooks/use-permisson'

export default defineComponent({
  components: {
    EkTable
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['addBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 1.获取按钮权限
    const isCreate = usePermisson(props.pageName, 'create')
    const isUpdate = usePermisson(props.pageName, 'update')
    const isDelete = usePermisson(props.pageName, 'delete')
    const isQuery = usePermisson(props.pageName, 'query')

    // 2.监听pageInfo的变化，更新表格数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 3.请求页面表格数据
    const getPageData = (queryInfo: any = {}) => {
      // 如果没有查询权限，则不获取表格数据
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    // 组件初始状态，发送一次网络请求
    getPageData()

    // 4.从vuex中取数据
    const dataList = computed(() => store.getters['system/getPageList'](props.pageName))
    const listCount = computed(() => store.getters['system/getListCount'](props.pageName))

    // 5.获取动态插槽列的数组
    const otherPropSlots = props.config.propList.filter((item: any) => {
      // 把page-content中固定的插槽排除
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    // 6.按钮操作：删除、新建、编辑
    const handlerDeleteClick = (row: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: row.id
      })
    }
    const handlerAddClick = () => {
      emit('addBtnClick')
    }
    const handlerEditClick = (row: any) => {
      emit('editBtnClick', row)
    }

    return {
      dataList,
      listCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handlerDeleteClick,
      handlerAddClick,
      handlerEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f0f0;
}
</style>
