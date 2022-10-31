<template>
  <div class="user">
    <page-search
      :config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :config="contentTableConfig"
      pageName="users"
      @addBtnClick="handleAddClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-dialog
      ref="pageDialogRef"
      :dialogFormConfig="dialogFormConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { dialogFormConfig } from './config/dialog.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageDialog } from '@/hooks/use-page-dialog'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageDialog
  },
  setup() {
    // 1. 高级检索的hook逻辑
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    // 2. 表格数据的hook逻辑：新建按钮、编辑按钮
    // 2.1 新建用户的弹窗中有密码项，而编辑用户弹窗中无密码项，通过改配置文件的方式控制是否显示
    const addCallBack = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = true
    }
    const { pageDialogRef, defaultInfo, handleAddClick, handleEditClick } = usePageDialog(
      addCallBack,
      editCallBack
    )

    // 3. 在新建用户和编辑用户弹窗中，动态添加部门和角色下拉框的options选项
    const store = useStore()
    // 3.1 entireDepartment和entireRole是在vuex中异步获取的，此处使用computed的响应式监听dialogFormConfig
    // 进而page-dialog组件会作出响应刷新
    const dialogFormConfigRef = computed(() => {
      const deptItem = dialogFormConfig.formItems.find((item) => item.field === 'departmentId')
      deptItem!.dicData = store.state.entireDepartment.map((item) => ({
        label: item.name,
        value: item.id
      }))
      const roleItem = dialogFormConfig.formItems.find((item) => item.field === 'roleId')
      roleItem!.dicData = store.state.entireRole.map((item) => ({
        label: item.name,
        value: item.id
      }))
      return dialogFormConfig
    })

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      dialogFormConfigRef,
      pageDialogRef,
      defaultInfo,
      handleAddClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
