<template>
  <div class="page-search">
    <ek-form v-bind="config" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="search-btns">
          <el-button icon="el-icon-refresh-right" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </ek-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EkForm from '@/base-ui/form'

export default defineComponent({
  components: {
    EkForm
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 1.formData中的属性应该由config中formItems对象中所有成员的field属性动态决定
    const formItems = props.config.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.搜索表单：重置、搜索
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.search-btns {
  text-align: right;
  padding: 20px;
}
</style>
