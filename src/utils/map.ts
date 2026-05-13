import * as echarts from 'echarts'
import type { ProvinceOverview } from '../types'
import type { IndustryChain } from '../data/industryChains'

/** 色阶颜色（低→高：从浅黄到深红褐） */
const COLOR_STEPS = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000', '#7f0000']

/**
 * 省份简称 → GeoJSON 全称 映射
 * china.json 的 properties.name 使用省/市/自治区全称，
 * 而数据中使用简称，需要转换后才能正确匹配并显示颜色。
 */
const SHORT_TO_FULL: Record<string, string> = {
  '北京': '北京市',
  '天津': '天津市',
  '上海': '上海市',
  '重庆': '重庆市',
  '河北': '河北省',
  '山西': '山西省',
  '内蒙古': '内蒙古自治区',
  '辽宁': '辽宁省',
  '吉林': '吉林省',
  '黑龙江': '黑龙江省',
  '江苏': '江苏省',
  '浙江': '浙江省',
  '安徽': '安徽省',
  '福建': '福建省',
  '江西': '江西省',
  '山东': '山东省',
  '河南': '河南省',
  '湖北': '湖北省',
  '湖南': '湖南省',
  '广东': '广东省',
  '广西': '广西壮族自治区',
  '海南': '海南省',
  '四川': '四川省',
  '贵州': '贵州省',
  '云南': '云南省',
  '西藏': '西藏自治区',
  '陕西': '陕西省',
  '甘肃': '甘肃省',
  '青海': '青海省',
  '宁夏': '宁夏回族自治区',
  '新疆': '新疆维吾尔自治区',
  '香港': '香港特别行政区',
  '澳门': '澳门特别行政区',
  '台湾': '台湾省',
}

/** 各省份近似中心坐标（用于飞线/水波纹定位） */
const PROVINCE_COORDS: Record<string, [number, number]> = {
  '北京': [116.4, 39.9],
  '天津': [117.2, 39.1],
  '上海': [121.5, 31.2],
  '重庆': [106.5, 29.6],
  '河北': [114.5, 38.0],
  '山西': [112.5, 37.9],
  '内蒙古': [111.8, 40.8],
  '辽宁': [123.4, 41.8],
  '吉林': [125.3, 43.9],
  '黑龙江': [126.6, 45.8],
  '江苏': [119.8, 33.0],
  '浙江': [120.2, 30.3],
  '安徽': [117.3, 31.8],
  '福建': [119.3, 26.1],
  '江西': [115.9, 27.6],
  '山东': [117.0, 36.7],
  '河南': [113.7, 33.9],
  '湖北': [112.4, 30.6],
  '湖南': [112.0, 27.1],
  '广东': [113.3, 23.1],
  '广西': [108.4, 22.8],
  '海南': [110.0, 19.2],
  '四川': [104.0, 30.6],
  '贵州': [106.7, 26.6],
  '云南': [102.7, 25.0],
  '西藏': [89.1, 31.5],
  '陕西': [108.9, 34.3],
  '甘肃': [103.8, 36.0],
  '青海': [96.0, 36.0],
  '宁夏': [106.3, 37.5],
  '新疆': [85.6, 42.1],
  '香港': [114.2, 22.3],
  '澳门': [113.5, 22.2],
  '台湾': [121.0, 24.0],
}

/** 飞线颜色 */
const FLY_LINE_COLOR = '#ff9800'
const FLY_LINE_COLOR_DIM = '#ffcc80'


/**
 * 获取中国地图的 ECharts option
 */
export function getMapOption(
  overviews: ProvinceOverview[],
  filteredProvinces?: string[],
  compareProvinces?: string[],
  highlightProvince?: string,
  chain?: IndustryChain,
) {
  const maxGdp = Math.max(...overviews.map(o => o.gdp), 100000)
  const minGdp = Math.min(...overviews.map(o => o.gdp), 0)

  const isFiltering = filteredProvinces !== undefined && filteredProvinces.length > 0
  const isComparing = compareProvinces !== undefined && compareProvinces.length > 0
  const isHighlighting = highlightProvince !== undefined && highlightProvince.length > 0

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) => {
        const data = params.data
        if (!data) return ''
        // data.name 此时已用 GeoJSON 全称，用原始 province 字段查找
        const overview = overviews.find(o => o.province === data.province)
        if (!overview) return `<b>${params.name}</b>`
        return `<b>${data.fullName}</b><br/>
                GDP: ${(overview.gdp / 10000).toFixed(1)} 万亿元<br/>
                主导产业: ${overview.mainIndustry}`
      },
    },
    visualMap: {
      min: minGdp,
      max: maxGdp,
      left: 10,
      bottom: 40,
      text: ['高', '低'],
      textStyle: { fontSize: 12 },
      inRange: {
        color: COLOR_STEPS,
      },
      calculable: true,
    },
    series: [
      {
        name: '产业指数',
        type: 'map',
        map: 'china',
        roam: true,
        selectedMode: 'single',
        aspectScale: 0.75,
        zoom: 1.2,
        label: {
          show: true,
          fontSize: 10,
          color: '#333',
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1.5,
          areaColor: '#e8f5e9',
        },
        emphasis: {
          label: { fontSize: 14, fontWeight: 'bold' },
          itemStyle: { areaColor: '#ffd54f' },
        },
        data: overviews.map(o => {
          const matched = !isFiltering || filteredProvinces.includes(o.province)
          const isCompared = isComparing && compareProvinces.includes(o.province)
          const isHighlighted = isHighlighting && o.province === highlightProvince
          let itemStyle: any = matched ? undefined : { areaColor: '#e0e0e0' }
          if (isCompared) {
            itemStyle = {
              ...(itemStyle || {}),
              borderColor: '#1565c0',
              borderWidth: 3,
              borderType: 'solid' as const,
            }
          }
          if (isHighlighted) {
            itemStyle = {
              ...(itemStyle || {}),
              areaColor: '#fff9c4',
              borderColor: '#f57f17',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(245, 127, 23, 0.4)',
            }
          }
          return {
            name: SHORT_TO_FULL[o.province] || o.province,
            value: o.gdp,
            province: o.province,
            fullName: o.province,
            mainIndustry: o.mainIndustry,
            gdp: o.gdp,
            itemStyle,
          }
        }),
      },
      ...(chain ? getChainFlyLines(chain) : []),
    ],
  }
}

/**
 * 获取省份产业详情饼图 option
 */
export function getIndustryPieOption(industries: { name: string; output: number; percentage: number }[]) {
  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) =>
        `${params.name}: ${params.value} 亿元 (${params.percent}%)`,
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '55%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: '{b}: {d}%',
          fontSize: 11,
        },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold' },
        },
        data: industries.map(i => ({
          name: i.name,
          value: i.output,
        })),
      },
    ],
  }
}

export function getIndustryBarOption(industries: { name: string; output: number }[]) {
  const sorted = [...industries].sort((a, b) => b.output - a.output)
  return {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any[]) =>
        `${params[0].name}: ${params[0].value} 亿元`,
    },
    grid: { left: '3%', right: '16%', bottom: '12%', containLabel: true },
    xAxis: { type: 'value' as const, name: '亿元' },
    yAxis: {
      type: 'category' as const,
      data: sorted.map(i => i.name),
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map(i => ({
          value: i.output,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#43a047' },
              { offset: 1, color: '#81c784' },
            ]),
          },
        })),
        barWidth: 20,
      },
    ],
  }
}

/**
 * 根据产业链数据生成飞线动效系列（ECharts lines 系列）
 * 将链上下游 node 之间的省份连接绘制为带轨迹动画的飞线
 */
function getChainFlyLines(chain: IndustryChain): any[] {
  const nodeMap = new Map(chain.nodes.map(n => [n.name, n]))
  const lines: any[] = []

  for (const link of chain.links) {
    const srcNode = nodeMap.get(link.source)
    const tgtNode = nodeMap.get(link.target)
    if (!srcNode || !tgtNode) continue

    const srcProvinces = srcNode.provinces.filter(p => PROVINCE_COORDS[p])
    const tgtProvinces = tgtNode.provinces.filter(p => PROVINCE_COORDS[p])

    for (const sp of srcProvinces) {
      for (const tp of tgtProvinces) {
        if (sp === tp) continue
        lines.push({
          coords: [PROVINCE_COORDS[sp], PROVINCE_COORDS[tp]],
          lineStyle: {
            opacity: Math.max(0.15, link.intensity / 100),
            width: link.intensity / 15,
          },
        })
      }
    }
  }

  if (lines.length === 0) return []

  return [
    {
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 5,
      data: lines,
      lineStyle: {
        curveness: 0.3,
        color: FLY_LINE_COLOR,
      },
      effect: {
        show: true,
        trailLength: 0.25,
        period: 6,
        symbol: 'arrow',
        symbolSize: 6,
        color: FLY_LINE_COLOR_DIM,
      },
      blendMode: 'source-over',
    },
  ]
}
