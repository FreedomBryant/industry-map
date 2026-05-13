import type { TradeFlow } from '../types'

/**
 * 中国省份间主要贸易流向数据（基于 2025 年区域间投入产出表估算）
 * 数据规模：30 条主要省际贸易通道，涵盖八大经济板块
 */
export const TRADE_FLOWS: TradeFlow[] = [
  // ===== 长三角 — 全国 =====
  { source: '上海', target: '江苏', value: 12860, category: '电子信息/装备制造' },
  { source: '江苏', target: '上海', value: 14320, category: '电子元件/机械' },
  { source: '浙江', target: '上海', value: 8920, category: '纺织/电商物流' },
  { source: '江苏', target: '浙江', value: 7560, category: '化工/钢铁' },
  { source: '浙江', target: '江苏', value: 6840, category: '纺织品/小商品' },
  { source: '安徽', target: '江苏', value: 4720, category: '能源/农产品' },
  { source: '安徽', target: '上海', value: 3560, category: '汽车零部件/电子' },

  // ===== 珠三角 — 全国 =====
  { source: '广东', target: '江苏', value: 11560, category: '电子/通信设备' },
  { source: '广东', target: '浙江', value: 7320, category: '电子/家电' },
  { source: '广东', target: '北京', value: 5680, category: 'IT/通信' },
  { source: '广东', target: '四川', value: 4120, category: '手机/电子' },

  // ===== 京津冀 — 周边 =====
  { source: '北京', target: '河北', value: 5860, category: '科技服务/能源' },
  { source: '河北', target: '北京', value: 4230, category: '钢铁/建材' },
  { source: '北京', target: '天津', value: 3480, category: 'IT/金融' },
  { source: '天津', target: '北京', value: 2960, category: '制造/化工' },

  // ===== 成渝 — 沿海 =====
  { source: '四川', target: '广东', value: 3860, category: '电子/食品' },
  { source: '四川', target: '重庆', value: 5240, category: '电子信息/汽车' },
  { source: '重庆', target: '四川', value: 4720, category: '汽车/电子' },
  { source: '重庆', target: '广东', value: 3150, category: '手机/笔记本电脑' },

  // ===== 中部 — 沿海 =====
  { source: '河南', target: '广东', value: 4560, category: '食品/劳动力密集' },
  { source: '河南', target: '江苏', value: 3620, category: '农产品/铝材' },
  { source: '湖北', target: '广东', value: 3980, category: '汽车零部件/电子' },
  { source: '湖北', target: '江苏', value: 2860, category: '钢铁/化工' },
  { source: '湖南', target: '广东', value: 4860, category: '装备制造/食品' },

  // ===== 北方能源走廊 =====
  { source: '山东', target: '江苏', value: 6230, category: '化工/钢铁' },
  { source: '山东', target: '浙江', value: 4120, category: '化工/农产品' },
  { source: '内蒙古', target: '河北', value: 3580, category: '煤炭/稀土' },
  { source: '内蒙古', target: '北京', value: 2460, category: '能源/乳品' },
  { source: '山西', target: '河北', value: 3120, category: '煤炭/焦炭' },
  { source: '山西', target: '山东', value: 1980, category: '煤炭/甲醇' },

  // ===== 东北 — 沿海 =====
  { source: '辽宁', target: '山东', value: 3520, category: '石化/装备' },
  { source: '辽宁', target: '江苏', value: 2680, category: '钢铁/汽车' },
  { source: '黑龙江', target: '辽宁', value: 2340, category: '石油/粮食' },

  // ===== 福建 — 长三角/珠三角 =====
  { source: '福建', target: '浙江', value: 3120, category: '纺织/鞋服' },
  { source: '福建', target: '广东', value: 2860, category: '电子信息/鞋服' },
]
