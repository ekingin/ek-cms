<template>
  <div class="ek-table">
    <div class="header">
      <slot name="header">
        <span class="table-title">{{ title }}</span>
        <div class="table-handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      v-bind="tableTreeOpt"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        label="序号"
        type="index"
        width="60"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dataList: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: '表格标题'
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    },
    tableTreeOpt: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    /**
     * 事件监听
     */
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.ek-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .table-title {
      font-size: 20px;
      color: #333;
    }
    .table-handler {
      text-align: right;
    }
  }
  .footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>
