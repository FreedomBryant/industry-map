<template>
  <button
    class="flow-btn"
    :class="{ active: store.showTradeFlows }"
    @click="store.toggleTradeFlows"
    :title="store.showTradeFlows ? '隐藏贸易流向' : '显示贸易流向'"
  >
    🔀 贸易
    <span class="badge">{{ flowCount }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '../stores/mapStore'

const store = useMapStore()

const flowCount = computed(() => store.tradeFlowData.length)
</script>

<style scoped>
.flow-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}
.flow-btn:hover {
  background: #eee;
  border-color: #bbb;
}
.flow-btn.active {
  color: #fff;
  background: #e65100;
  border-color: #e65100;
}
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 11px;
  border-radius: 9px;
  background: rgba(0,0,0,0.12);
}
.flow-btn.active .badge {
  background: rgba(255,255,255,0.25);
  color: #fff;
}
</style>
