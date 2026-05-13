import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProvinceOverviews, getProvinceByName } from '../data'
import type { ProvinceOverview, ProvinceIndustry } from '../types'

export const useMapStore = defineStore('map', () => {
  // === State ===
  const overviews = ref<ProvinceOverview[]>([])
  const selectedProvince = ref<string | null>(null)
  const hoveredProvince = ref<string | null>(null)

  // === Getters ===
  const selectedProvinceData = computed<ProvinceIndustry | null>(() => {
    if (!selectedProvince.value) return null
    return getProvinceByName(selectedProvince.value) ?? null
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

  function loadData() {
    overviews.value = getProvinceOverviews()
  }

  return {
    overviews,
    selectedProvince,
    hoveredProvince,
    selectedProvinceData,
    selectProvince,
    toggleProvince,
    hoverProvince,
    loadData,
  }
})
