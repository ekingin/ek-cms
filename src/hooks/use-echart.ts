import * as echarts from 'echarts'

import geoJson from '@/base-ui/echart/data/china.json'
echarts.registerMap('china', geoJson)

export default function (el: HTMLDivElement) {
  const echartInstance = echarts.init(el)

  const setOption = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }

  // 监听浏览器窗口尺寸变化，使echart图的尺寸动态变化
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    setOption,
    updateSize
  }
}
