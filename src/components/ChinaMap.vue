<template>
  <div ref="chartRef" class="map-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { getMapOption } from '../utils/map'
import type { ProvinceOverview } from '../types'

const props = defineProps<{
  overviews: ProvinceOverview[]
  selectedProvince: string | null
}>()

const emit = defineEmits<{
  (e: 'province-click', name: string): void
  (e: 'province-hover', name: string | null): void
}>()

const chartRef = ref<HTMLDivElement>()
const chart = shallowRef<echarts.ECharts>()

// 注册中国地图
async function registerMap() {
  const resp = await fetch('/china.json')
  const geoJson = await resp.json()
  echarts.registerMap('china', geoJson as any)
}

function renderChart() {
  if (!chart.value || props.overviews.length === 0) return
  const option = getMapOption(props.overviews)
  chart.value.setOption(option)
}

onMounted(async () => {
  await registerMap()
  if (chartRef.value) {
    chart.value = echarts.init(chartRef.value)
    chart.value.on('click', (params: any) => {
      if (params.name) emit('province-click', params.name)
    })
    chart.value.on('mouseover', (params: any) => {
      if (params.name) emit('province-hover', params.name)
    })
    chart.value.on('mouseout', () => {
      emit('province-hover', null)
    })
    renderChart()
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart.value?.dispose()
})

function handleResize() {
  chart.value?.resize()
}

watch(() => props.overviews, renderChart, { deep: true })
watch(() => props.selectedProvince, (name) => {
  if (!chart.value) return
  chart.value.dispatchAction({
    type: 'mapToggleSelect',
    seriesIndex: 0,
    name: name || '',
    dataIndex: -1,
  })
})
</script>

<style scoped>
.map-chart {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
