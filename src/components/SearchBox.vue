<template>
  <div class="search-box" ref="containerRef">
    <input
      v-model="query"
      type="text"
      placeholder="🔍 搜索省份..."
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="showDropdown && query && results.length" class="search-dropdown">
      <div
        v-for="item in results"
        :key="item.province"
        class="result-item"
        @mousedown.prevent="onSelect(item.province)"
      >
        <div class="result-name">{{ item.province }}</div>
        <div class="result-info">
          GDP: {{ (item.gdp / 10000).toFixed(1) }}万亿 · {{ item.mainIndustry }}
        </div>
      </div>
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
  const q = query.value.trim()
  // 先按前缀匹配，再按包含匹配
  const all = store.searchResults
  const startsWith = all.filter(r => r.province.startsWith(q))
  const includes = all.filter(r => r.province.includes(q) && !r.province.startsWith(q))
  return [...startsWith, ...includes].slice(0, 15)
})

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
  store.searchProvince(name)
}
</script>

<style scoped>
.search-box {
  position: relative;
  width: 280px;
  flex-shrink: 0;
}

.search-box input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.search-box input:focus {
  border-color: #43a047;
  box-shadow: 0 0 0 2px rgba(67, 160, 71, 0.15);
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.result-item {
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item:hover {
  background: #f5faff;
}

.result-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.result-info {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}
</style>
