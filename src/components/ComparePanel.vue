<template>
  <transition name="slide-up">
    <div v-if="store.compareProvinces.length >= 2" class="compare-panel">
      <!-- 头部 -->
      <div class="compare-header">
        <h3>📊 省份对比（{{ store.compareProvinces.length }} / 4）</h3>
        <div class="compare-actions">
          <button class="btn-clear" @click="store.clearCompare()">清除全部</button>
          <button class="btn-fold" @click="collapsed = !collapsed">
            {{ collapsed ? '展开' : '收起' }}
          </button>
        </div>
      </div>

      <!-- 标签行 -->
      <div v-if="!collapsed" class="compare-tags">
        <span
          v-for="name in store.compareProvinces"
          :key="name"
          class="province-tag"
        >
          {{ name }}
          <button class="tag-remove" @click="store.removeCompareProvince(name)">✕</button>
        </span>
      </div>

      <!-- 对比图表 -->
      <div v-if="!collapsed" class="compare-charts">
        <div
          v-for="data in store.compareProvinceData"
          :key="data.province"
          class="province-card"
        >
          <h4>{{ data.province }}</h4>
          <div class="gdp-line">GDP：{{ (data.gdp / 10000).toFixed(2) }} 万亿元</div>
          <VChart
            :option="getPieOption(data.industries)"
            autoresize
            style="height: 200px; width: 100%"
          />
          <VChart
            :option="getBarOption(data.industries)"
            autoresize
            style="height: 160px; width: 100%"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import { getIndustryPieOption, getIndustryBarOption } from '../utils/map'
import { useMapStore } from '../stores/mapStore'
import type { IndustryItem } from '../types'

const store = useMapStore()
const collapsed = ref(false)

function getPieOption(industries: IndustryItem[]) {
  return getIndustryPieOption(industries.map(i => ({
    name: i.name,
    output: i.output,
    percentage: i.percentage,
  })))
}

function getBarOption(industries: IndustryItem[]) {
  return getIndustryBarOption(industries.map(i => ({
    name: i.name,
    output: i.output,
  })))
}
</script>

<style scoped>
.compare-panel {
  background: #fff;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  padding: 12px 20px;
  max-height: 70vh;
  overflow-y: auto;
  z-index: 5;
}

.compare-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.compare-header h3 {
  font-size: 15px;
  color: #333;
}

.compare-actions {
  display: flex;
  gap: 8px;
}

.btn-clear,
.btn-fold {
  padding: 4px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  background: #fff;
  color: #666;
  transition: all 0.2s;
}

.btn-clear:hover,
.btn-fold:hover {
  background: #f5f5f5;
  border-color: #999;
}

.btn-clear {
  color: #e53935;
  border-color: #ffcdd2;
}

.btn-clear:hover {
  background: #ffebee;
  border-color: #e53935;
}

.compare-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.province-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  background: #e8eaf6;
  color: #283593;
}

.tag-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 0 2px;
  color: #666;
  line-height: 1;
}

.tag-remove:hover {
  color: #e53935;
}

.compare-charts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.province-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  background: #fafafa;
}

.province-card h4 {
  font-size: 16px;
  color: #1b5e20;
  margin-bottom: 2px;
}

.gdp-line {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

/* 过渡动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
