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
    // ??????????????????
    modelValue: {
      type: Object,
      required: true
    },
    // ??????????????????
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // ??????FormItem???label-width
    labelWidth: {
      type: String,
      default: '80px'
    },
    // ?????????????????????????????????????????????
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >=1920px ??????4??? ??????6????????????
        lg: 8, // >=1200px ??????3??? ??????8????????????
        md: 12, // >=992px ??????2??? ??????12????????????
        sm: 24, // >=789px ??????1??? ??????24????????????
        xs: 24 // <768px ??????1??? ??????24????????????
      })
    },
    // ??????FormItem???????????????
    formItemStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleChangeValue = (value: any, field: string) => {
      console.log('?????????:', value, field, props.modelValue)
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
