<template>
  <div ref="chartRef" class="map-chart"></div>
  <button v-if="store.drillProvince" class="drill-back" @click="store.resetDrill(); store.selectProvince(null)">
    ← 返回全国
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { getMapOption } from '../utils/map'
import { useMapStore } from '../stores/mapStore'
import { getChainById } from '../data/industryChains'

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
  const chain = store.selectedIndustry ? getChainById(store.selectedIndustry) : undefined

  // 下钻模式：获取该省份的城市数据
  let drillCities: any[] | undefined
  if (store.drillProvince) {
    const provData = store.currentYearData.find(p => p.province === store.drillProvince)
    if (provData) drillCities = provData.cities
  }

  // 企业标记数据
  const entMarkers = store.enterpriseMarkers.length > 0 ? store.enterpriseMarkers : undefined

  const option = getMapOption(
    store.overviews,
    store.filteredProvinces,
    store.compareProvinces,
    store.searchHighlight ?? undefined,
    chain,
    store.drillProvince ?? undefined,
    drillCities,
    entMarkers,
  )
  chart.value.setOption(option)
}

onMounted(async () => {
  await registerMap()
  if (chartRef.value) {
    chart.value = echarts.init(chartRef.value)
    chart.value.on('click', (params: any) => {
      if (!params.name) {
        // 点击空白区域
        if (store.drillProvince) store.resetDrill()
        return
      }
      // 城市散点点击 → 选中对应省份
      if (params.seriesName === '城市') {
        store.selectProvince(store.drillProvince)
        return
      }
      // 省份地图点击
      if (store.drillProvince) {
        // 已下钻状态：再次点击省份复位
        store.resetDrill()
      } else {
        // 未下钻：进入该省份下钻
        store.drillToProvince(params.name)
      }
      store.toggleProvince(params.name)
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
watch(() => store.searchHighlight, renderChart)
watch(() => store.selectedYear, renderChart)
watch(() => store.selectedIndustry, renderChart)
watch(() => store.drillProvince, renderChart)
watch(() => store.selectedEnterprise, renderChart)
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

.drill-back {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.drill-back:hover {
  background: rgba(0, 0, 0, 0.75);
}
</style>
