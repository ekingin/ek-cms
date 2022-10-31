<template>
  <div class="role">
    <page-search
      :config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :config="contentTableConfig"
      pageName="role"
      @addBtnClick="handleAddClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-dialog
      ref="pageDialogRef"
      :dialogFormConfig="dialogFormConfig"
      :defaultInfo="defaultInfo"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="id"
        ref="treeRef"
        highlight-current
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      >
      </el-tree>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import { useStore } from '@/store'
import { mapMenuToKeys } from '@/utils/map-menus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { dialogFormConfig } from './config/dialog.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageDialog } from '@/hooks/use-page-dialog'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageDialog
  },
  setup() {
    // hooks
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (row: any) => {
      const menuKeys = mapMenuToKeys(row.menuList)
      nextTick(() => {
        treeRef.value?.setCheckedKeys(menuKeys, true)
      })
    }
    const { pageDialogRef, defaultInfo, handleAddClick, handleEditClick } = usePageDialog(
      undefined,
      editCallBack
    )

    // el-tree
    const store = useStore()
    const menuList = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const { checkedKeys, halfCheckedKeys } = data2
      // 所有选中项的id数组
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      dialogFormConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      pageDialogRef,
      defaultInfo,
      handleAddClick,
      handleEditClick,
      menuList,
      handleCheckChange,
      otherInfo,
      treeRef
    }
  }
})
</script>

<style scoped></style>
