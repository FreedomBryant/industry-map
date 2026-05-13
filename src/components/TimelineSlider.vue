<template>
  <div class="timeline">
    <div class="timeline-label">{{ label }}</div>
    <div class="timeline-slider-wrapper">
      <input
        type="range"
        class="timeline-slider"
        :min="0"
        :max="years.length - 1"
        :value="currentIndex"
        @input="onSlide"
      />
      <div class="timeline-ticks">
        <span
          v-for="(y, i) in years"
          :key="y"
          class="tick"
          :class="{ active: i === currentIndex }"
          @click="store.setYear(y)"
        >
          {{ y }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '../stores/mapStore'
import { AVAILABLE_YEARS } from '../data/yearlyData'
import type { AvailableYear } from '../data/yearlyData'

const store = useMapStore()

const years = AVAILABLE_YEARS
const currentIndex = computed(() => years.indexOf(store.selectedYear))

const label = computed(() => {
  const y = store.selectedYear
  return `${y} 年${y === 2024 ? '（最新）' : ''} · GDP 总量 ${totalGdp.value.toFixed(1)} 万亿元`
})

const totalGdp = computed(() => {
  return store.overviews.reduce((sum, o) => sum + o.gdp, 0) / 10000
})

function onSlide(e: Event) {
  const idx = parseInt((e.target as HTMLInputElement).value)
  const year = years[idx] as AvailableYear
  store.setYear(year)
}
</script>

<style scoped>
.timeline {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  min-width: 340px;
}

.timeline-label {
  font-size: 13px;
  color: #555;
  white-space: nowrap;
  font-weight: 500;
}

.timeline-slider-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.timeline-slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #e0e0e0;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1976d2;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.1s;
}

.timeline-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.timeline-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1976d2;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  cursor: pointer;
}

.timeline-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
}

.tick {
  font-size: 11px;
  color: #999;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.15s, font-weight 0.15s;
  user-select: none;
}

.tick:hover {
  color: #1976d2;
}

.tick.active {
  color: #1976d2;
  font-weight: 600;
  font-size: 12px;
}
</style>
