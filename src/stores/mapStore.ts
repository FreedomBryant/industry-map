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
    selectProvince,
    toggleProvince,
    hoverProvince,
    setCategory,
    loadData,
  }
})
