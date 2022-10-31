<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ height: height, width: width }"></div>
  </div>
</template>

<script lang="ts" setup>
import { EChartsOption } from 'echarts'
import { ref, defineProps, withDefaults, onMounted, watchEffect } from 'vue'
import useEchart from '@/hooks/use-echart'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartRef = ref<HTMLDivElement>()

onMounted(() => {
  const { setOption } = useEchart(echartRef.value!)

  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style lang="less" scoped></style>
