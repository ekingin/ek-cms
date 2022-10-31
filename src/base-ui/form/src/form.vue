<template>
  <div class="ek-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="formItemStyle" v-if="!item.isHidden">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleChangeValue($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleChangeValue($event, item.field)"
                >
                  <el-option
                    v-for="dicDataItem in item.dicData"
                    :key="dicDataItem.value"
                    :label="dicDataItem.label"
                    :value="dicDataItem.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOption"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleChangeValue($event, item.field)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { IFormItem } from '../types/index'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    // 表单输入数据
    modelValue: {
      type: Object,
      required: true
    },
    // 所有的表单项
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // 所有FormItem的label-width
    labelWidth: {
      type: String,
      default: '80px'
    },
    // 栅格布局，默认根据屏幕像素变化
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >=1920px 每行4列 每列6个栅格数
        lg: 8, // >=1200px 每行3列 每列8个栅格数
        md: 12, // >=992px 每行2列 每列12个栅格数
        sm: 24, // >=789px 每行1列 每列24个栅格数
        xs: 24 // <768px 每行1列 每列24个栅格数
      })
    },
    // 所有FormItem的共同样式
    formItemStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleChangeValue = (value: any, field: string) => {
      console.log('表单项:', value, field, props.modelValue)
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleChangeValue
    }
  }
})
</script>

<style scoped>
.ek-form {
  padding-top: 22px;
}
</style>
