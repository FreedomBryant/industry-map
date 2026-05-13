/**
 * 年度数据生成器
 * 基于 2025 年基线数据，按各省历史平均增速推算 2020~2024 年数据。
 * 各省每年增速在 [-3%, +15%] 区间内变化，累计偏差控制在合理范围。
 */
import { provinceData } from './provinces1'
import { provinceDataPart2 } from './provinces2'
import { provinceDataPart3 } from './provinces3'
import { provinceDataPart4 } from './provinces4'
import type { ProvinceIndustry, IndustryItem, CityIndustry } from '../types'

/** 各年份可用作基线的数据（实际是 2025 年数据） */
const BASE_DATA: ProvinceIndustry[] = [
  ...provinceData,
  ...provinceDataPart2,
  ...provinceDataPart3,
  ...provinceDataPart4,
]

/**
 * 各省年均名义 GDP 增速（2020~2024 年，基于公开统计估算）
 * 单位：百分比（如 6.5 表示年均增长 6.5%）
 */
const PROVINCE_GROWTH: Record<string, number> = {
  '北京': 5.8, '天津': 4.2,
  '河北': 5.0, '山西': 6.8, '内蒙古': 5.5,
  '辽宁': 3.5, '吉林': 4.8, '黑龙江': 4.0,
  '上海': 5.5, '江苏': 6.0, '浙江': 6.8,
  '安徽': 6.5, '福建': 6.2, '江西': 6.0, '山东': 5.8,
  '河南': 5.0, '湖北': 6.2, '湖南': 5.8,
  '广东': 5.5, '广西': 5.0, '海南': 6.5,
  '重庆': 5.5, '四川': 6.0, '贵州': 6.5, '云南': 5.8, '西藏': 7.0,
  '陕西': 5.5, '甘肃': 5.0, '青海': 4.5, '宁夏': 5.5, '新疆': 5.0,
  '香港': 3.0, '澳门': 4.0, '台湾': 3.5,
}

/** 各年份的微小扰动（模拟随机波动），[-3%, +3%] */
const YEAR_NOISE: Record<number, number> = {
  2020: -2.0,
  2021: 3.0,
  2022: -1.5,
  2023: 0.5,
  2024: 1.0,
}

/** 支持的年份 */
export const AVAILABLE_YEARS = [2020, 2021, 2022, 2023, 2024, 2025] as const
export type AvailableYear = (typeof AVAILABLE_YEARS)[number]
export const DEFAULT_YEAR: AvailableYear = 2025

/**
 * 生成指定年份的各省数据
 * 算法：以 2025 为基准，用年均增速反向推算目标年数据
 */
function scaleIndustryItems(items: IndustryItem[], factor: number): IndustryItem[] {
  return items.map(i => ({
    ...i,
    output: Math.round(i.output * factor * 100) / 100,
  }))
}

function scaleCities(cities: CityIndustry[], factor: number, year: number): CityIndustry[] {
  return cities.map(c => ({
    ...c,
    gdp: Math.round(c.gdp * factor * 100) / 100,
    industries: scaleIndustryItems(c.industries, factor),
    year,
  }))
}

export function getYearlyData(year: AvailableYear): ProvinceIndustry[] {
  return BASE_DATA.map(p => {
    const growthRate = PROVINCE_GROWTH[p.province] || 5.0
    const noise = YEAR_NOISE[year] || 0
    // 从 2025 反向推算到目标年份: factor = 1 / (1 + rate)^(2025 - year)
    const yearsBack = 2025 - year
    const annualRate = (growthRate + noise) / 100
    const factor = 1 / Math.pow(1 + annualRate, yearsBack)

    return {
      ...p,
      gdp: Math.round(p.gdp * factor * 100) / 100,
      industries: scaleIndustryItems(p.industries, factor),
      cities: scaleCities(p.cities, factor, year),
      year,
    }
  })
}

/** 预生成所有年份的数据（缓存） */
let cachedData: Record<number, ProvinceIndustry[]> | null = null

export function getAllYearlyData(): Record<number, ProvinceIndustry[]> {
  if (cachedData) return cachedData
  cachedData = {}
  for (const year of AVAILABLE_YEARS) {
    cachedData[year] = getYearlyData(year)
  }
  return cachedData
}
