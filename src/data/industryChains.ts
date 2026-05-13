/** 产业链节点 */
export interface ChainNode {
  name: string
  category: '上游' | '中游' | '下游' | '终端'
  provinces: string[]
  /** 行业分类标签，用于匹配筛选 */
  industryTag: string
}

/** 节点间关联 */
export interface ChainLink {
  source: string
  target: string
  /** 关联强度（0~100） */
  intensity: number
}

/** 单条产业链定义 */
export interface IndustryChain {
  /** 产业名称（与 IndustryItem.name 匹配） */
  id: string
  /** 显示名称 */
  label: string
  /** 描述 */
  description: string
  nodes: ChainNode[]
  links: ChainLink[]
}

/** 预定义的产业链数据 */
export const industryChains: IndustryChain[] = [
  // ── IT/通信 ──────────────────────────────────
  {
    id: 'IT/通信',
    label: 'IT / 通信',
    description: '从芯片设计到互联网服务的完整信息技术产业链',
    nodes: [
      {
        name: '芯片设计',
        category: '上游',
        provinces: ['北京', '上海', '深圳', '杭州', '成都'],
        industryTag: 'IT/通信',
      },
      {
        name: '半导体制造',
        category: '上游',
        provinces: ['上海', '北京', '天津', '武汉', '合肥'],
        industryTag: 'IT/通信',
      },
      {
        name: '封装测试',
        category: '中游',
        provinces: ['江苏', '上海', '广东', '陕西', '四川'],
        industryTag: 'IT/通信',
      },
      {
        name: '通信设备',
        category: '中游',
        provinces: ['广东', '北京', '浙江', '江苏', '四川'],
        industryTag: 'IT/通信',
      },
      {
        name: '终端制造',
        category: '下游',
        provinces: ['广东', '江苏', '重庆', '四川', '江西'],
        industryTag: 'IT/通信',
      },
      {
        name: '互联网服务',
        category: '终端',
        provinces: ['北京', '上海', '广东', '浙江', '福建'],
        industryTag: 'IT/通信',
      },
      {
        name: '云计算/大数据',
        category: '终端',
        provinces: ['北京', '浙江', '广东', '上海', '贵州'],
        industryTag: 'IT/通信',
      },
    ],
    links: [
      { source: '芯片设计', target: '半导体制造', intensity: 90 },
      { source: '半导体制造', target: '封装测试', intensity: 85 },
      { source: '封装测试', target: '通信设备', intensity: 60 },
      { source: '封装测试', target: '终端制造', intensity: 75 },
      { source: '通信设备', target: '互联网服务', intensity: 70 },
      { source: '终端制造', target: '互联网服务', intensity: 80 },
      { source: '终端制造', target: '云计算/大数据', intensity: 50 },
      { source: '互联网服务', target: '云计算/大数据', intensity: 65 },
    ],
  },

  // ── 新能源汽车 ──────────────────────────────
  {
    id: '新能源汽车',
    label: '新能源汽车',
    description: '从原材料到充换电设施的完整新能源车产业链',
    nodes: [
      {
        name: '锂矿/原材料',
        category: '上游',
        provinces: ['四川', '青海', '江西', '西藏', '新疆'],
        industryTag: '制造业',
      },
      {
        name: '动力电池',
        category: '中游',
        provinces: ['福建', '江苏', '广东', '安徽', '四川'],
        industryTag: '制造业',
      },
      {
        name: '电机电控',
        category: '中游',
        provinces: ['浙江', '上海', '广东', '江苏', '湖南'],
        industryTag: '制造业',
      },
      {
        name: '整车制造',
        category: '下游',
        provinces: ['广东', '上海', '北京', '安徽', '重庆'],
        industryTag: '制造业',
      },
      {
        name: '智能座舱',
        category: '下游',
        provinces: ['北京', '上海', '浙江', '广东', '江苏'],
        industryTag: 'IT/通信',
      },
      {
        name: '充电/换电设施',
        category: '终端',
        provinces: ['广东', '江苏', '浙江', '山东', '河南'],
        industryTag: '制造业',
      },
    ],
    links: [
      { source: '锂矿/原材料', target: '动力电池', intensity: 95 },
      { source: '动力电池', target: '电机电控', intensity: 70 },
      { source: '动力电池', target: '整车制造', intensity: 90 },
      { source: '电机电控', target: '整车制造', intensity: 80 },
      { source: '动力电池', target: '充电/换电设施', intensity: 40 },
      { source: '整车制造', target: '智能座舱', intensity: 60 },
      { source: '整车制造', target: '充电/换电设施', intensity: 50 },
    ],
  },

  // ── 生物医药 ──────────────────────────────
  {
    id: '生物医药',
    label: '生物医药',
    description: '从原料药到医疗终端的医药健康产业链',
    nodes: [
      {
        name: '原料药/中间体',
        category: '上游',
        provinces: ['浙江', '山东', '河北', '河南', '湖北'],
        industryTag: '生物医药',
      },
      {
        name: '生物技术研发',
        category: '上游',
        provinces: ['北京', '上海', '江苏', '广东', '四川'],
        industryTag: '教育科研',
      },
      {
        name: '药品生产',
        category: '中游',
        provinces: ['江苏', '山东', '浙江', '广东', '上海'],
        industryTag: '生物医药',
      },
      {
        name: '医疗器械',
        category: '中游',
        provinces: ['广东', '江苏', '北京', '上海', '浙江'],
        industryTag: '生物医药',
      },
      {
        name: '医药流通',
        category: '下游',
        provinces: ['北京', '上海', '广东', '浙江', '湖北'],
        industryTag: '交通物流',
      },
      {
        name: '医疗服务',
        category: '终端',
        provinces: ['北京', '上海', '广东', '四川', '浙江'],
        industryTag: '教育科研',
      },
    ],
    links: [
      { source: '原料药/中间体', target: '药品生产', intensity: 85 },
      { source: '生物技术研发', target: '药品生产', intensity: 75 },
      { source: '生物技术研发', target: '医疗器械', intensity: 70 },
      { source: '药品生产', target: '医药流通', intensity: 80 },
      { source: '医疗器械', target: '医药流通', intensity: 65 },
      { source: '医药流通', target: '医疗服务', intensity: 75 },
    ],
  },

  // ── 能源化工 ──────────────────────────────
  {
    id: '能源化工',
    label: '能源化工',
    description: '从化石能源到精细化工的能源化工产业链',
    nodes: [
      {
        name: '原油/天然气开采',
        category: '上游',
        provinces: ['黑龙江', '新疆', '陕西', '天津', '山东'],
        industryTag: '能源化工',
      },
      {
        name: '炼化/煤化工',
        category: '中游',
        provinces: ['山东', '辽宁', '广东', '浙江', '福建'],
        industryTag: '能源化工',
      },
      {
        name: '基础化工原料',
        category: '中游',
        provinces: ['江苏', '浙江', '山东', '广东', '内蒙古'],
        industryTag: '能源化工',
      },
      {
        name: '精细化工',
        category: '下游',
        provinces: ['浙江', '江苏', '山东', '上海', '广东'],
        industryTag: '能源化工',
      },
      {
        name: '新能源材料',
        category: '下游',
        provinces: ['四川', '江西', '湖南', '青海', '江苏'],
        industryTag: '能源化工',
      },
      {
        name: '环保/碳处理',
        category: '终端',
        provinces: ['北京', '广东', '浙江', '江苏', '四川'],
        industryTag: '能源化工',
      },
    ],
    links: [
      { source: '原油/天然气开采', target: '炼化/煤化工', intensity: 90 },
      { source: '原油/天然气开采', target: '基础化工原料', intensity: 60 },
      { source: '炼化/煤化工', target: '基础化工原料', intensity: 80 },
      { source: '基础化工原料', target: '精细化工', intensity: 75 },
      { source: '基础化工原料', target: '新能源材料', intensity: 65 },
      { source: '精细化工', target: '环保/碳处理', intensity: 50 },
      { source: '新能源材料', target: '环保/碳处理', intensity: 55 },
    ],
  },
]

/** 通过产业名称查找产业链 */
export function getChainById(id: string): IndustryChain | undefined {
  return industryChains.find(c => c.id === id)
}

/** 搜索结果：匹配产业名的产业链列表 */
export function searchChains(query: string): IndustryChain[] {
  const q = query.toLowerCase()
  return industryChains.filter(
    c => c.id.toLowerCase().includes(q) || c.label.toLowerCase().includes(q),
  )
}
