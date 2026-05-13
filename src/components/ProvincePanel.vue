<template>
  <div class="panel-wrapper">
    <!-- 头部 -->
    <div class="panel-header">
      <h2>{{ store.selectedProvinceData!.province }}</h2>
      <div class="header-actions">
        <button
          class="compare-btn"
          :class="{ active: store.compareProvinces.includes(store.selectedProvinceData!.province) }"
          @click="store.toggleCompareProvince(store.selectedProvinceData!.province)"
        >
          {{ store.compareProvinces.includes(store.selectedProvinceData!.province) ? '✓ 已对比' : '➕ 对比' }}
        </button>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
    </div>

    <!-- GDP 概览 -->
    <div class="gdp-banner">
      <span class="gdp-label">GDP</span>
      <span class="gdp-value">{{ (store.selectedProvinceData!.gdp / 10000).toFixed(2) }} 万亿元</span>
    </div>

    <!-- 主导产业 -->
    <section class="panel-section">
      <h3>🏭 产业分布</h3>
      <div class="industry-tag-list">
        <span
          v-for="ind in store.selectedProvinceData!.industries"
          :key="ind.name"
          class="tag industry-tag clickable"
          :class="{ chainActive: store.selectedIndustry === ind.category }"
          @click="store.selectIndustry(ind.category)"
        >{{ ind.name }} {{ ind.percentage }}%</span>
      </div>
      <VChart
        :option="pieOption"
        autoresize
        style="height: 220px; width: 100%"
      />
    </section>

    <!-- 产值排名 -->
    <section class="panel-section">
      <h3>📊 产值排名</h3>
      <VChart
        :option="barOption"
        autoresize
        style="height: 200px; width: 100%"
      />
    </section>

    <!-- 重点企业 -->
    <section class="panel-section">
      <h3>🏢 重点企业</h3>
      <div class="enterprise-list">
        <span v-for="e in store.selectedProvinceData!.keyEnterprises" :key="e" class="tag">{{ e }}</span>
      </div>
    </section>

    <!-- 城市列表 -->
    <section class="panel-section">
      <h3>📍 主要城市</h3>
      <div class="city-list">
        <div
          v-for="city in store.selectedProvinceData!.cities"
          :key="city.name"
          class="city-card"
          @click="selectedCity = selectedCity === city.name ? null : city.name"
        >
          <div class="city-header">
            <span class="city-name">{{ city.name }}</span>
            <span class="city-gdp">{{ (city.gdp / 10000).toFixed(2) }}万亿</span>
          </div>
          <div v-if="selectedCity === city.name" class="city-detail">
            <div class="city-industries">
              <span
                v-for="ind in city.industries"
                :key="ind.name"
                class="tag industry-tag clickable"
                :class="{ chainActive: store.selectedIndustry === ind.category }"
                @click="store.selectIndustry(ind.category)"
              >{{ ind.name }} {{ ind.percentage }}%</span>
            </div>
            <div class="city-enterprises">
              <span v-for="e in city.keyEnterprises" :key="e" class="tag enterprise-tag">{{ e }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import { getIndustryPieOption, getIndustryBarOption } from '../utils/map'
import { useMapStore } from '../stores/mapStore'

defineEmits<{ (e: 'close'): void }>()

const store = useMapStore()
const selectedCity = ref<string | null>(null)

const pieOption = computed(() => getIndustryPieOption(store.selectedProvinceData!.industries))
const barOption = computed(() => getIndustryBarOption(store.selectedProvinceData!.industries))
</script>

<style scoped>
.panel-wrapper {
  padding: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.panel-header h2 {
  font-size: 22px;
  color: #1b5e20;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.compare-btn {
  padding: 4px 10px;
  border: 1px solid #81c784;
  border-radius: 14px;
  font-size: 12px;
  cursor: pointer;
  background: #fff;
  color: #2e7d32;
  transition: all 0.2s;
  white-space: nowrap;
}

.compare-btn:hover {
  background: #e8f5e9;
}

.compare-btn.active {
  background: #e8f5e9;
  border-color: #43a047;
  color: #1b5e20;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  padding: 4px 8px;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.gdp-banner {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 10px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.gdp-label {
  font-size: 13px;
  color: #999;
}

.gdp-value {
  font-size: 20px;
  font-weight: bold;
  color: #2e7d32;
}

.panel-section {
  margin-bottom: 16px;
}

.panel-section h3 {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.enterprise-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  background: #e8f5e9;
  color: #2e7d32;
}

.city-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.city-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.city-card:hover {
  border-color: #81c784;
  background: #f1f8e9;
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.city-gdp {
  font-size: 13px;
  color: #2e7d32;
}

.city-detail {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
}

.city-industries {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}

.industry-tag {
  background: #fff3e0;
  color: #e65100;
}

.industry-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
}

.clickable {
  cursor: pointer;
  transition: all 0.15s;
}

.clickable:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.chainActive {
  background: #1b5e20 !important;
  color: #fff !important;
  border-color: #1b5e20;
}

.enterprise-tag {
  background: #e3f2fd;
  color: #1565c0;
}
</style>
