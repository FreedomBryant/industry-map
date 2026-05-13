<template>
  <button
    class="park-toggle"
    :class="{ active: store.showParks }"
    @click="store.toggleParks()"
    :title="store.showParks ? '隐藏园区标记' : '显示园区标记'"
  >
    🏭 <span v-show="store.showParks" class="badge">{{ parkCount }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '../stores/mapStore'
import { INDUSTRIAL_PARKS } from '../data/industrialParks'

const store = useMapStore()
const parkCount = computed(() => INDUSTRIAL_PARKS.length)
</script>

<style scoped>
.park-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.park-toggle:hover {
  border-color: #43a047;
  background: #f1f8e9;
}
.park-toggle.active {
  background: #e8f5e9;
  border-color: #43a047;
  color: #2e7d32;
}
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: #43a047;
  border-radius: 10px;
}
</style>
