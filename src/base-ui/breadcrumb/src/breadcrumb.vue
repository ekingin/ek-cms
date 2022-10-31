<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'

export default defineComponent({
  props: {
    breadcrumbs: Array as PropType<IBreadcrumb[]>
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
