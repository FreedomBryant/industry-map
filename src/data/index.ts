import type { ProvinceIndustry, ProvinceOverview, IndustryCategory } from '../types'
import { getAllYearlyData, DEFAULT_YEAR } from './yearlyData'
import type { AvailableYear } from './yearlyData'

// 静态引入所有分片数据
import { provinceData as p1 } from './provinces1'
import { provinceDataPart2 as p2 } from './provinces2'
import { provinceDataPart3 as p3 } from './provinces3'
import { provinceDataPart4 as p4 } from './provinces4'

/** 所有省份产业数据（完整，2025 年基线） */
export const provinceData: ProvinceIndustry[] = [...p1, ...p2, ...p3, ...p4]

/** 所有产业分类 */
export const allCategories: IndustryCategory[] = [
  'IT/通信', '制造业', '能源化工', '农业', '金融',
  '文旅', '生物医药', '交通物流', '房地产', '教育科研',
]

/** 计算省份综合产业指数（用于热力图色阶） */
export function calcProvinceIndex(p: ProvinceIndustry): number {
  // 基于GDP规模、产业多样性、高端产业占比综合计算
  const gdpScore = Math.log10(p.gdp) * 20
  const diversityScore = Math.min(p.industries.length * 8, 40)
  const highTechRatio = p.industries
    .filter(i => i.category === 'IT/通信' || i.category === '生物医药' || i.category === '教育科研')
    .reduce((s, i) => s + i.percentage, 0)
  const highTechScore = highTechRatio * 0.5
  return Math.min(Math.round(gdpScore + diversityScore + highTechScore), 100)
}

/** 获取指定年份的省份概览列表（用于热力图） */
export function getProvinceOverviews(year?: AvailableYear): ProvinceOverview[] {
  const data = year ? getAllYearlyData()[year] : provinceData
  return data.map(p => ({
    province: p.province,
    index: calcProvinceIndex(p),
    gdp: p.gdp,
    mainIndustry: [...p.industries].sort((a, b) => b.output - a.output)[0]?.name || '',
  }))
}

/** 根据省份名和年份查找数据 */
export function getProvinceByName(name: string, year?: AvailableYear): ProvinceIndustry | undefined {
  const normalized = normalizeProvinceName(name)
  const dataset = year ? getAllYearlyData()[year] : provinceData
  return dataset.find(p => p.province === normalized)
}

/** 省份名称映射（GeoJSON 全称 → 数据简称） */
const provinceNameMap: Record<string, string> = {
  '北京市': '北京',
  '天津市': '天津',
  '上海市': '上海',
  '重庆市': '重庆',
  '内蒙古自治区': '内蒙古',
  '广西壮族自治区': '广西',
  '西藏自治区': '西藏',
  '宁夏回族自治区': '宁夏',
  '新疆维吾尔自治区': '新疆',
  '香港特别行政区': '香港',
  '澳门特别行政区': '澳门',
}

/** 规范化省份名称（去掉省/市/自治区等后缀） */
function normalizeProvinceName(name: string): string {
  if (provinceNameMap[name]) return provinceNameMap[name]
  // 处理 "河北省" → "河北", "北京市" → "北京" 等
  return name.replace(/[省市]$/, '')
}

export { DEFAULT_YEAR }
export type { AvailableYear }
export { provinceData as default }
