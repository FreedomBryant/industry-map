<template>
  <div class="enterprise-search" ref="containerRef">
    <input
      v-model="query"
      type="text"
      placeholder="🏢 搜索企业..."
      class="es-input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="showDropdown && query && results.length" class="es-dropdown">
      <div
        v-for="ent in results"
        :key="ent"
        class="es-item"
        @mousedown.prevent="onSelect(ent)"
      >
        <div class="es-item-name">{{ ent }}</div>
        <div class="es-item-locations">
          {{ formatLocations(ent) }}
        </div>
      </div>
    </div>
    <div v-if="store.selectedEnterprise" class="es-badge" @click="clearEnterprise">
      {{ store.selectedEnterprise }} <span class="es-close">✕</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMapStore } from '../stores/mapStore'

const store = useMapStore()

const containerRef = ref<HTMLDivElement>()
const query = ref('')
const showDropdown = ref(false)
let blurTimer: ReturnType<typeof setTimeout> | null = null

const results = computed(() => {
  if (!query.value.trim()) return []
  return store.enterpriseResults
})

function formatLocations(ent: string): string {
  const locs = store.enterpriseIndex.get(ent)
  if (!locs || locs.length === 0) return ''
  if (locs.length <= 3) {
    return locs.map(l => l.city ?? l.province).join(' · ')
  }
  return locs.length + ' 个城市分布'
}

function onInput() {
  showDropdown.value = true
}

function onFocus() {
  showDropdown.value = true
}

function onBlur() {
  blurTimer = setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

function onSelect(name: string) {
  query.value = ''
  showDropdown.value = false
  store.selectEnterprise(name)
}

function clearEnterprise() {
  store.selectEnterprise(null)
}
</script>

<style scoped>
.enterprise-search {
  position: relative;
  min-width: 200px;
}

.es-input {
  width: 100%;
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.es-input:focus {
  border-color: #1565c0;
}

.es-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: var(--bg-menu);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.es-item {
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--border-lighter);
}

.es-item:last-child {
  border-bottom: none;
}

.es-item:hover {
  background: var(--blue-bg);
}

.es-item-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.es-item-locations {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.es-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  padding: 4px 10px;
  font-size: 12px;
  background: var(--blue-bg);
  color: var(--blue-color);
  border: 1px solid var(--blue-border);
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.es-badge:hover {
  background: var(--blue-border);
}

.es-close {
  font-size: 11px;
  opacity: 0.7;
}
</style>
