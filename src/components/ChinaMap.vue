<template>
  <div ref="chartRef" class="map-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { getMapOption } from '../utils/map'
import { useMapStore } from '../stores/mapStore'

const store = useMapStore()

const chartRef = ref<HTMLDivElement>()
const chart = shallowRef<echarts.ECharts>()

// 注册中国地图
async function registerMap() {
  const resp = await fetch('/china.json')
  const geoJson = await resp.json()
  echarts.registerMap('china', geoJson as any)
}

function renderChart() {
  if (!chart.value || store.overviews.length === 0) return
  const option = getMapOption(store.overviews, store.filteredProvinces, store.compareProvinces)
  chart.value.setOption(option)
}

onMounted(async () => {
  await registerMap()
  if (chartRef.value) {
    chart.value = echarts.init(chartRef.value)
    chart.value.on('click', (params: any) => {
      if (params.name) store.toggleProvince(params.name)
    })
    chart.value.on('mouseover', (params: any) => {
      if (params.name) store.hoverProvince(params.name)
    })
    chart.value.on('mouseout', () => {
      store.hoverProvince(null)
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

watch(() => store.overviews, renderChart, { deep: true })
watch(() => store.filteredProvinces, renderChart, { deep: true })
watch(() => store.compareProvinces, renderChart, { deep: true })
watch(() => store.selectedProvince, (name) => {
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
