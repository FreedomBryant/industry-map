<template>
  <div class="app-container">
    <!-- 标题栏 -->
    <header class="app-header">
      <h1>🗺️ 中国产业地图</h1>
      <span class="subtitle">China Industry Map</span>
    </header>

    <div class="app-body">
      <!-- 左侧地图区 -->
      <div class="map-area">
        <ChinaMap
          :overviews="overviews"
          :selected-province="selectedProvince"
          @province-click="onProvinceClick"
          @province-hover="onProvinceHover"
        />
      </div>

      <!-- 右侧详情面板 -->
      <aside class="side-panel" :class="{ active: !!selectedProvince }">
        <ProvincePanel
          v-if="selectedProvinceData"
          :data="selectedProvinceData"
          @close="selectedProvince = null"
        />
        <div v-else class="empty-panel">
          <div class="empty-icon">👆</div>
          <p>点击地图上的省份</p>
          <p>查看详细产业数据</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ChinaMap from './components/ChinaMap.vue'
import ProvincePanel from './components/ProvincePanel.vue'
import { provinceData, getProvinceOverviews, getProvinceByName } from './data'
import type { ProvinceOverview, ProvinceIndustry } from './types'

const overviews = ref<ProvinceOverview[]>([])
const selectedProvince = ref<string | null>(null)
const hoveredProvince = ref<string | null>(null)

const selectedProvinceData = computed(() => {
  if (!selectedProvince.value) return null
  return getProvinceByName(selectedProvince.value) || null
})

function onProvinceClick(name: string) {
  selectedProvince.value = selectedProvince.value === name ? null : name
}

function onProvinceHover(name: string | null) {
  hoveredProvince.value = name
}

onMounted(() => {
  overviews.value = getProvinceOverviews()
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.app-header h1 {
  font-size: 22px;
  color: #1b5e20;
}

.subtitle {
  font-size: 13px;
  color: #999;
  letter-spacing: 1px;
}

.app-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.map-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  min-width: 0;
}

.side-panel {
  width: 0;
  overflow: hidden;
  transition: width 0.3s ease;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.06);
}

.side-panel.active {
  width: 420px;
  overflow-y: auto;
}

.empty-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #bbb;
  gap: 8px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-panel p {
  font-size: 14px;
}
</style>
