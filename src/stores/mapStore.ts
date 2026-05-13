import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProvinceOverviews, getProvinceByName, provinceData, DEFAULT_YEAR } from '../data'
import type { AvailableYear } from '../data'
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
  /** 当前选择年份（默认 2024） */
  const selectedYear = ref<AvailableYear>(DEFAULT_YEAR)
  /** 当前查看的产业链（null 表示关闭） */
  const selectedIndustry = ref<string | null>(null)
  /** 深色模式 */
  const isDark = ref(false)

  /** 数据源说明面板是否可见 */
  const showDataSource = ref(false)

  /** 当前年份的完整省份数据 */
  const currentYearData = computed<ProvinceIndustry[]>(() => {
    return getProvinceByName(provinceData[0]?.province ?? '', selectedYear.value)
      ? provinceData.map(p => getProvinceByName(p.province, selectedYear.value) ?? p)
      : provinceData
  })

  // === Getters ===
  const selectedProvinceData = computed<ProvinceIndustry | null>(() => {
    if (!selectedProvince.value) return null
    return getProvinceByName(selectedProvince.value, selectedYear.value) ?? null
  })

  /** 匹配当前筛选产业的省份简称列表 */
  const filteredProvinces = computed<string[]>(() => {
    if (!selectedCategory.value) return []
    const yearData = selectedYear.value
      ? (() => { const d = getProvinceByName(provinceData[0]?.province ?? '', selectedYear.value)
                 return d ? getProvinceOverviews(selectedYear.value)
                           : getProvinceOverviews() } )()
      : getProvinceOverviews()
    // Reuse provinceData for filtering since categories don't change by year
    return provinceData
      .filter(p => p.industries.some(i => i.category === selectedCategory.value))
      .map(p => p.province)
  })

  /** 待对比省份的完整数据 */
  const compareProvinceData = computed<ProvinceIndustry[]>(() => {
    return compareProvinces.value
      .map(name => getProvinceByName(name, selectedYear.value))
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

  function loadData(year?: AvailableYear) {
    overviews.value = getProvinceOverviews(year ?? selectedYear.value)
  }

  function searchProvince(name: string) {
    searchQuery.value = ''
    searchHighlight.value = name
    selectedProvince.value = name
  }

  function setYear(year: AvailableYear) {
    selectedYear.value = year
    overviews.value = getProvinceOverviews(year)
  }

  function selectIndustry(name: string | null) {
    selectedIndustry.value = name
  }

  function toggleDataSource() {
    showDataSource.value = !showDataSource.value
  }

  function toggleDark() {
    isDark.value = !isDark.value
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
    selectedYear,
    currentYearData,
    selectedIndustry,
    isDark,
    showDataSource,
    selectProvince,
    toggleProvince,
    hoverProvince,
    setCategory,
    toggleCompareProvince,
    removeCompareProvince,
    clearCompare,
    loadData,
    searchProvince,
    setYear,
    selectIndustry,
    toggleDataSource,
    toggleDark,
  }
})
