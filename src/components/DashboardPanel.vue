<template>
  <div v-if="summary.provinceCount > 0" class="dashboard-bar">
    <div class="metric">
      <span class="metric-label">全国 GDP</span>
      <span class="metric-value">{{ formatGDP(summary.totalGDP) }}</span>
      <span class="metric-unit">亿元</span>
    </div>
    <div class="divider"></div>
    <div class="metric">
      <span class="metric-label">重点企业</span>
      <span class="metric-value">{{ summary.totalEnterprises.toLocaleString() }}</span>
      <span class="metric-unit">家</span>
    </div>
    <div class="divider"></div>
    <div class="metric">
      <span class="metric-label">产业指数</span>
      <span class="metric-value">{{ summary.avgIndex }}</span>
      <span class="metric-unit">均值</span>
    </div>
    <div class="divider"></div>
    <div class="metric">
      <span class="metric-label">覆盖省份</span>
      <span class="metric-value">{{ summary.provinceCount }}</span>
      <span class="metric-unit">个</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '../stores/mapStore'
import type { DashboardSummary } from '../stores/mapStore'

const store = useMapStore()

const summary = computed<DashboardSummary>(() => store.dashboardSummary)

function formatGDP(val: number): string {
  if (val >= 1_0000) return (val / 1_0000).toFixed(1) + '万亿'
  return val.toLocaleString()
}
</script>

<style scoped>
.dashboard-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 8px 24px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-light);
  flex-shrink: 0;
}

.metric {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 4px 24px;
  white-space: nowrap;
}

.metric-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.metric-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--green-primary);
  font-variant-numeric: tabular-nums;
}

.metric-unit {
  font-size: 12px;
  color: var(--text-muted);
}

.divider {
  width: 1px;
  height: 28px;
  background: var(--border-lighter);
}
</style>
