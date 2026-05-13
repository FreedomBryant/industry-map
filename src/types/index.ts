/** 产业分类 */
export type IndustryCategory =
  | 'IT/通信'
  | '制造业'
  | '能源化工'
  | '农业'
  | '金融'
  | '文旅'
  | '生物医药'
  | '交通物流'
  | '房地产'
  | '教育科研'

/** 单个产业 */
export interface IndustryItem {
  name: string
  category: IndustryCategory
  output: number       // 产值（亿元）
  percentage: number   // 占省GDP百分比
}

/** 城市产业数据 */
export interface CityIndustry {
  name: string         // 城市名
  gdp: number          // GDP（亿元）
  industries: IndustryItem[]
  keyEnterprises: string[]
  year?: number        // 数据年份
}

/** 省份产业数据 */
export interface ProvinceIndustry {
  province: string
  gdp: number
  industries: IndustryItem[]
  keyEnterprises: string[]
  cities: CityIndustry[]
  year?: number        // 数据年份
}

/** 产业概况（用于热力图） */
export interface ProvinceOverview {
  province: string
  index: number        // 综合产业指数
  gdp: number
  mainIndustry: string // 主导产业
}

/** 筛选条件 */
export interface FilterState {
  categories: IndustryCategory[]
  year: number
  minGDP: number
}

/** 省份间贸易流向 */
export interface TradeFlow {
  source: string      // 来源省份
  target: string      // 目标省份
  value: number       // 贸易额（亿元）
  category: string    // 主要贸易品类
}
