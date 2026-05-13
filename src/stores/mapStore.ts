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

  // === Actions ===
  function selectProvince(name: string | null) {
    selectedProvince.value = name
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

  return {
    overviews,
    selectedProvince,
    hoveredProvince,
    selectedProvinceData,
    selectedCategory,
    filteredProvinces,
    compareProvinces,
    compareProvinceData,
    selectProvince,
    toggleProvince,
    hoverProvince,
    setCategory,
    toggleCompareProvince,
    removeCompareProvince,
    clearCompare,
    loadData,
  }
})
