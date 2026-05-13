import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProvinceOverviews, getProvinceByName, provinceData, DEFAULT_YEAR } from '../data'
import type { AvailableYear } from '../data'
import type { ProvinceOverview, ProvinceIndustry, IndustryCategory } from '../types'
import { INDUSTRIAL_PARKS } from '../data/industrialParks'
import type { IndustrialPark } from '../data/industrialParks'
import { TRADE_FLOWS } from '../data/tradeFlows'
import type { TradeFlow } from '../types'

export interface DashboardSummary {
  totalGDP: number           // 全国 GDP 总量（亿元）
  totalEnterprises: number   // 重点企业总数
  avgIndex: number           // 平均产业指数
  provinceCount: number      // 有数据的省份数
}

/** 企业所在地信息 */
export interface EnterpriseLocation {
  enterprise: string
  province: string
  city?: string
}

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
  /** 企业搜索文本 */
  const enterpriseQuery = ref('')
  /** 选中的企业名（高亮在地图上） */
  const selectedEnterprise = ref<string | null>(null)
  /** 当前选择年份（默认 2024） */
  const selectedYear = ref<AvailableYear>(DEFAULT_YEAR)
  /** 当前查看的产业链（null 表示关闭） */
  const selectedIndustry = ref<string | null>(null)
  /** 深色模式 */
  const isDark = ref(false)

  /** 当前下钻省份（null 表示全国视图） */
  const drillProvince = ref<string | null>(null)

  /** 数据源说明面板是否可见 */
  const showDataSource = ref(false)

  /** 是否显示园区/开发区标记 */
  const showParks = ref(false)

  /** 是否显示省份间贸易流向 */
  const showTradeFlows = ref(false)

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

  /** 全量企业索引 Map — 企业名 → 所在地列表（从 provinceData 构建） */
  const enterpriseIndex = computed<Map<string, EnterpriseLocation[]>>(() => {
    const idx = new Map<string, EnterpriseLocation[]>()
    for (const prov of provinceData) {
      // 省份级企业
      for (const ent of prov.keyEnterprises) {
        const list = idx.get(ent) ?? []
        list.push({ enterprise: ent, province: prov.province })
        idx.set(ent, list)
      }
      // 城市级企业
      for (const city of prov.cities) {
        for (const ent of city.keyEnterprises) {
          const list = idx.get(ent) ?? []
          // 避免重复（同企业名同时出现在省和市）
          if (!list.some(l => l.city === city.name)) {
            list.push({ enterprise: ent, province: prov.province, city: city.name })
            idx.set(ent, list)
          }
        }
      }
    }
    return idx
  })

  /** 企业搜索结果（按前缀匹配 + 包含匹配） */
  const enterpriseResults = computed<string[]>(() => {
    const q = enterpriseQuery.value.trim().toLowerCase()
    if (!q) return []
    const all = Array.from(enterpriseIndex.value.keys())
    const startsWith = all.filter(e => e.toLowerCase().startsWith(q))
    const includes = all.filter(e => e.toLowerCase().includes(q) && !e.toLowerCase().startsWith(q))
    return [...startsWith, ...includes].slice(0, 20)
  })

  /** 当前选中的企业所在地列表 */
  const enterpriseMarkers = computed<{ name: string; province: string; city?: string }[]>(() => {
    if (!selectedEnterprise.value) return []
    return (enterpriseIndex.value.get(selectedEnterprise.value) ?? []).map(loc => ({
      name: loc.enterprise,
      province: loc.province,
      city: loc.city,
    }))
  })

  /** 园区/开发区标记数据 */
  const parkMarkers = computed<{ name: string; province: string; city: string; type: string }[]>(() => {
    if (!showParks.value) return []
    return INDUSTRIAL_PARKS.map(p => ({
      name: p.name,
      province: p.province,
      city: p.city,
      type: p.type,
    }))
  })

  /** 贸易流向数据（根据 toggle 决定是否返回） */
  const tradeFlowData = computed<TradeFlow[]>(() => {
    if (!showTradeFlows.value) return []
    return TRADE_FLOWS
  })

  /** 全国汇总仪表盘数据 */
  const dashboardSummary = computed<DashboardSummary>(() => {
    const ov = overviews.value
    if (ov.length === 0) return { totalGDP: 0, totalEnterprises: 0, avgIndex: 0, provinceCount: 0 }
    const totalGDP = ov.reduce((s, o) => s + o.gdp, 0)
    const provinceCount = ov.length
    const avgIndex = Math.round(ov.reduce((s, o) => s + o.index, 0) / provinceCount)
    // 从完整数据中统计企业总数
    const yearData = selectedYear.value
      ? (() => { const d = getProvinceByName(provinceData[0]?.province ?? '', selectedYear.value)
                 return d ? provinceData.map(p => getProvinceByName(p.province, selectedYear.value) ?? p)
                           : provinceData })()
      : provinceData
    const totalEnterprises = yearData.reduce((s, p) => s + p.keyEnterprises.length, 0)
    return { totalGDP, totalEnterprises, avgIndex, provinceCount }
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

  function toggleParks() {
    showParks.value = !showParks.value
  }

  function toggleTradeFlows() {
    showTradeFlows.value = !showTradeFlows.value
  }

  function toggleDark() {
    isDark.value = !isDark.value
  }

  function drillToProvince(name: string | null) {
    drillProvince.value = name
  }

  function resetDrill() {
    drillProvince.value = null
  }

  function selectEnterprise(name: string | null) {
    selectedEnterprise.value = name
    if (name !== null) {
      // 清空已有 searchHighlight 避免冲突
      searchHighlight.value = null
      selectedProvince.value = null
    }
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
    enterpriseQuery,
    enterpriseResults,
    enterpriseIndex,
    selectedEnterprise,
    enterpriseMarkers,
    selectedYear,
    currentYearData,
    selectedIndustry,
    isDark,
    showDataSource,
    showParks,
    tradeFlowData,
    showTradeFlows,
    dashboardSummary,
    parkMarkers,
    drillProvince,
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
    toggleParks,
    toggleTradeFlows,
    toggleDark,
    drillToProvince,
    resetDrill,
    selectEnterprise,
  }
})
