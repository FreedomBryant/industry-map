import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProvinceOverviews, getProvinceByName, provinceData } from '../data'
import type { ProvinceOverview, ProvinceIndustry, IndustryCategory } from '../types'

export const useMapStore = defineStore('map', () => {
  // === State ===
  const overviews = ref<ProvinceOverview[]>([])
  const selectedProvince = ref<string | null>(null)
  const hoveredProvince = ref<string | null>(null)
  const selectedCategory = ref<IndustryCategory | null>(null)
  /** 待对比省份列表（最多 4 个） */
  const compareProvinces = ref<string[]>([])
  /** 搜索框查询文本 */
  const searchQuery = ref('')
  /** 搜索高亮的省份名 */
  const searchHighlight = ref<string | null>(null)

  // === Getters ===
  const selectedProvinceData = computed<ProvinceIndustry | null>(() => {
    if (!selectedProvince.value) return null
    return getProvinceByName(selectedProvince.value) ?? null
  })

  /** 匹配当前筛选产业的省份简称列表 */
  const filteredProvinces = computed<string[]>(() => {
    if (!selectedCategory.value) return []
    return provinceData
      .filter(p => p.industries.some(i => i.category === selectedCategory.value))
      .map(p => p.province)
  })

  /** 待对比省份的完整数据 */
  const compareProvinceData = computed<ProvinceIndustry[]>(() => {
    return compareProvinces.value
      .map(name => getProvinceByName(name))
      .filter((p): p is ProvinceIndustry => p !== undefined)
  })

  /** 所有省份概览数据（供搜索用） */
  const searchResults = computed<ProvinceOverview[]>(() => {
    if (!searchQuery.value.trim()) return []
    const q = searchQuery.value.trim()
    return overviews.value.filter(
      o => o.province.includes(q) || o.mainIndustry.includes(q)
    )
  })

  // === Actions ===
  function selectProvince(name: string | null) {
    selectedProvince.value = name
    if (name === null) searchHighlight.value = null
  }

  function toggleProvince(name: string) {
    selectedProvince.value = selectedProvince.value === name ? null : name
  }

  function hoverProvince(name: string | null) {
    hoveredProvince.value = name
  }

  function setCategory(cat: IndustryCategory | null) {
    selectedCategory.value = cat
  }

  function toggleCompareProvince(name: string) {
    const idx = compareProvinces.value.indexOf(name)
    if (idx !== -1) {
      compareProvinces.value.splice(idx, 1)
    } else {
      if (compareProvinces.value.length >= 4) return
      compareProvinces.value.push(name)
    }
  }

  function removeCompareProvince(name: string) {
    const idx = compareProvinces.value.indexOf(name)
    if (idx !== -1) compareProvinces.value.splice(idx, 1)
  }

  function clearCompare() {
    compareProvinces.value = []
  }

  function loadData() {
    overviews.value = getProvinceOverviews()
  }

  function searchProvince(name: string) {
    searchQuery.value = ''
    searchHighlight.value = name
    selectedProvince.value = name
  }

  return {
    overviews,
    selectedProvince,
    hoveredProvince,
    selectedProvinceData,
    selectedCategory,
    filteredProvinces,
    compareProvinces,
    compareProvinceData,
    searchQuery,
    searchResults,
    searchHighlight,
    selectProvince,
    toggleProvince,
    hoverProvince,
    setCategory,
    toggleCompareProvince,
    removeCompareProvince,
    clearCompare,
    loadData,
    searchProvince,
  }
})
