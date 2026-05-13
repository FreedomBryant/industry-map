import type { ProvinceIndustry } from '../types'

/**
 * 中国各省及主要城市产业数据（基于2025年官方统计数据）
 * 数据来源：国家统计局《2025年国民经济和社会发展统计公报》、各省统计局2025年统计公报
 * GDP数据更新时间：2026年1月（国家统计局公布）
 * 行业细分数据为基于官方统计公报的合理估算，保留官方公布的主导产业占比
 */
export const provinceData: ProvinceIndustry[] = [
  // ========== 华北 ==========
  {
    province: '北京',
    gdp: 52073.4,
    industries: [
      { name: '软件与信息服务', category: 'IT/通信', output: 16142.38, percentage: 31.0 },
      { name: '金融业', category: '金融', output: 10415.08, percentage: 20.0 },
      { name: '科技研发', category: '教育科研', output: 6248.63, percentage: 12.0 },
      { name: '智能制造', category: '制造业', output: 5207.02, percentage: 10.0 },
      { name: '文化创意', category: '文旅', output: 3645.12, percentage: 7.0 },
      { name: '生物医药', category: '生物医药', output: 2603.51, percentage: 5.0 },
    ],
    keyEnterprises: ['字节跳动', '百度', '美团', '京东', '小米', '快手', '京东方'],
    cities: [
      {
        name: '北京', gdp: 52073.4,
        industries: [
          { name: '软件与信息服务', category: 'IT/通信', output: 16142.38, percentage: 31.0 },
          { name: '金融业', category: '金融', output: 10415.08, percentage: 20.0 },
          { name: '科技研发', category: '教育科研', output: 6248.63, percentage: 12.0 },
        ],
        keyEnterprises: ['字节跳动', '百度', '美团', '京东', '小米'],
      },
    ],
  },
  {
    province: '天津',
    gdp: 18539.82,
    industries: [
      { name: '石油化工', category: '能源化工', output: 4634.87, percentage: 25.0 },
      { name: '装备制造', category: '制造业', output: 3708.1, percentage: 20.0 },
      { name: '航空航天', category: '制造业', output: 1853.54, percentage: 10.0 },
      { name: '金融', category: '金融', output: 1668.39, percentage: 9.0 },
      { name: '生物医药', category: '生物医药', output: 1298.09, percentage: 7.0 },
    ],
    keyEnterprises: ['天津石化', '一汽丰田', '空客天津', '中芯国际', '康希诺'],
    cities: [
      {
        name: '天津', gdp: 18539.82,
        industries: [
          { name: '石油化工', category: '能源化工', output: 4634.87, percentage: 25.0 },
          { name: '装备制造', category: '制造业', output: 3708.1, percentage: 20.0 },
          { name: '航空航天', category: '制造业', output: 1853.54, percentage: 10.0 },
        ],
        keyEnterprises: ['天津石化', '一汽丰田', '空客天津', '中芯国际'],
      },
    ],
  },
  {
    province: '河北',
    gdp: 49305.2,
    industries: [
      { name: '钢铁冶金', category: '制造业', output: 10847.23, percentage: 22.0 },
      { name: '装备制造', category: '制造业', output: 7888.52, percentage: 16.0 },
      { name: '石油化工', category: '能源化工', output: 5916.39, percentage: 12.0 },
      { name: '农业', category: '农业', output: 4437.03, percentage: 9.0 },
      { name: '新能源', category: '能源化工', output: 3451.49, percentage: 7.0 },
      { name: '生物医药', category: '生物医药', output: 2464.9, percentage: 5.0 },
    ],
    keyEnterprises: ['河钢集团', '长城汽车', '华北制药', '石药集团', '晶澳科技'],
    cities: [
      {
        name: '石家庄', gdp: 7365.66,
        industries: [
          { name: '生物医药', category: '生物医药', output: 1252.16, percentage: 17.0 },
          { name: '装备制造', category: '制造业', output: 1104.85, percentage: 15.0 },
          { name: '纺织服装', category: '制造业', output: 662.91, percentage: 9.0 },
        ],
        keyEnterprises: ['华北制药', '石药集团', '以岭药业'],
      },
      {
        name: '唐山', gdp: 9233.01,
        industries: [
          { name: '钢铁冶金', category: '制造业', output: 3693.2, percentage: 40.0 },
          { name: '装备制造', category: '制造业', output: 1384.95, percentage: 15.0 },
          { name: '港口物流', category: '交通物流', output: 738.64, percentage: 8.0 },
        ],
        keyEnterprises: ['河钢集团', '首钢京唐', '唐山港'],
      },
      {
        name: '保定', gdp: 4979.6,
        industries: [
          { name: '汽车制造', category: '制造业', output: 1244.9, percentage: 25.0 },
          { name: '新能源', category: '能源化工', output: 647.35, percentage: 13.0 },
          { name: '纺织', category: '制造业', output: 348.57, percentage: 7.0 },
        ],
        keyEnterprises: ['长城汽车', '英利集团'],
      },
      {
        name: '廊坊', gdp: 3734.7,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 560.21, percentage: 15.0 },
          { name: '装备制造', category: '制造业', output: 485.51, percentage: 13.0 },
          { name: '文旅', category: '文旅', output: 336.12, percentage: 9.0 },
        ],
        keyEnterprises: ['华为廊坊', '京东'],
      },
    ],
  },
  {
    province: '山西',
    gdp: 25495.7,
    industries: [
      { name: '煤炭开采', category: '能源化工', output: 8158.32, percentage: 32.0 },
      { name: '焦化冶金', category: '能源化工', output: 3824.15, percentage: 15.0 },
      { name: '装备制造', category: '制造业', output: 2804.11, percentage: 11.0 },
      { name: '新能源', category: '能源化工', output: 1785.07, percentage: 7.0 },
      { name: '农业', category: '农业', output: 1530.06, percentage: 6.0 },
      { name: '文旅', category: '文旅', output: 1275.05, percentage: 5.0 },
    ],
    keyEnterprises: ['山西焦煤', '晋能控股', '太钢集团', '山西汾酒', '大秦铁路'],
    cities: [
      {
        name: '太原', gdp: 5500.22,
        industries: [
          { name: '装备制造', category: '制造业', output: 1100.04, percentage: 20.0 },
          { name: '电子信息', category: 'IT/通信', output: 550.02, percentage: 10.0 },
          { name: '冶金', category: '制造业', output: 495.02, percentage: 9.0 },
        ],
        keyEnterprises: ['太钢集团', '山西焦煤', '太重集团'],
      },
      {
        name: '大同', gdp: 2100.08,
        industries: [
          { name: '煤炭', category: '能源化工', output: 840.03, percentage: 40.0 },
          { name: '新能源', category: '能源化工', output: 210.01, percentage: 10.0 },
          { name: '文旅', category: '文旅', output: 168.01, percentage: 8.0 },
        ],
        keyEnterprises: ['晋能控股', '大同煤业'],
      },
      {
        name: '长治', gdp: 2800.11,
        industries: [
          { name: '煤炭', category: '能源化工', output: 896.04, percentage: 32.0 },
          { name: '装备制造', category: '制造业', output: 364.01, percentage: 13.0 },
          { name: '农业', category: '农业', output: 224.01, percentage: 8.0 },
        ],
        keyEnterprises: ['潞安集团', '振东制药'],
      },
    ],
  },
  {
    province: '内蒙古',
    gdp: 26710.3,
    industries: [
      { name: '能源化工', category: '能源化工', output: 8547.63, percentage: 32.0 },
      { name: '农牧业', category: '农业', output: 4540.26, percentage: 17.0 },
      { name: '装备制造', category: '制造业', output: 2670.56, percentage: 10.0 },
      { name: '稀土材料', category: '能源化工', output: 2136.65, percentage: 8.0 },
      { name: '新能源', category: '能源化工', output: 1869.7, percentage: 7.0 },
    ],
    keyEnterprises: ['内蒙古电力', '伊利集团', '蒙牛集团', '包钢集团', '鄂尔多斯'],
    cities: [
      {
        name: '呼和浩特', gdp: 3857.14,
        industries: [
          { name: '乳业', category: '农业', output: 1002.86, percentage: 26.0 },
          { name: '电子信息', category: 'IT/通信', output: 424.29, percentage: 11.0 },
          { name: '金融', category: '金融', output: 347.14, percentage: 9.0 },
        ],
        keyEnterprises: ['伊利集团', '蒙牛集团'],
      },
      {
        name: '包头', gdp: 4263.16,
        industries: [
          { name: '钢铁稀土', category: '能源化工', output: 1492.1, percentage: 35.0 },
          { name: '装备制造', category: '制造业', output: 639.47, percentage: 15.0 },
          { name: '新能源', category: '能源化工', output: 341.05, percentage: 8.0 },
        ],
        keyEnterprises: ['包钢集团', '北方稀土', '北重集团'],
      },
      {
        name: '鄂尔多斯', gdp: 5684.21,
        industries: [
          { name: '煤炭', category: '能源化工', output: 2273.68, percentage: 40.0 },
          { name: '煤化工', category: '能源化工', output: 852.63, percentage: 15.0 },
          { name: '新能源', category: '能源化工', output: 454.74, percentage: 8.0 },
        ],
        keyEnterprises: ['鄂尔多斯集团', '伊泰集团', '汇能集团'],
      },
    ],
  },
]
