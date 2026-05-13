import * as echarts from 'echarts'
import type { ProvinceOverview, CityIndustry } from '../types'
import type { IndustryChain } from '../data/industryChains'

/** 色阶颜色（低→高：从浅黄到深红褐） */
const COLOR_STEPS = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000', '#7f0000']

/**
 * 省份简称 → GeoJSON 全称 映射
 * china.json 的 properties.name 使用省/市/自治区全称，
 * 而数据中使用简称，需要转换后才能正确匹配并显示颜色。
 */
export const SHORT_TO_FULL: Record<string, string> = {
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
export const PROVINCE_COORDS: Record<string, [number, number]> = {
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

/**
 * 主要城市中心坐标
 */
export const CITY_COORDS: Record<string, [number, number]> = {
  '北京': [116.4, 39.9],
  '天津': [117.2, 39.1],
  '上海': [121.5, 31.2],
  '重庆': [106.5, 29.6],
  '石家庄': [114.5, 38.0],
  '唐山': [118.2, 39.6],
  '保定': [115.5, 38.9],
  '廊坊': [116.7, 39.5],
  '太原': [112.5, 37.9],
  '大同': [113.3, 40.1],
  '长治': [113.1, 36.2],
  '呼和浩特': [111.8, 40.8],
  '包头': [109.8, 40.7],
  '鄂尔多斯': [109.8, 39.6],
  '沈阳': [123.4, 41.8],
  '大连': [121.6, 38.9],
  '鞍山': [123.0, 41.1],
  '长春': [125.3, 43.9],
  '吉林市': [126.6, 43.8],
  '哈尔滨': [126.6, 45.8],
  '大庆': [125.1, 46.6],
  '齐齐哈尔': [123.9, 47.3],
  '苏州': [120.6, 31.3],
  '南京': [118.8, 32.1],
  '无锡': [120.3, 31.5],
  '常州': [119.9, 31.8],
  '南通': [120.9, 32.0],
  '徐州': [117.2, 34.3],
  '杭州': [120.2, 30.3],
  '宁波': [121.5, 29.9],
  '温州': [120.7, 28.0],
  '绍兴': [120.6, 30.0],
  '嘉兴': [120.8, 30.8],
  '合肥': [117.3, 31.8],
  '芜湖': [118.4, 31.3],
  '滁州': [118.3, 32.3],
  '福州': [119.3, 26.1],
  '厦门': [118.1, 24.5],
  '泉州': [118.6, 24.9],
  '宁德': [119.5, 26.7],
  '南昌': [115.9, 28.7],
  '赣州': [114.9, 25.8],
  '上饶': [117.9, 28.4],
  '济南': [117.0, 36.7],
  '青岛': [120.4, 36.1],
  '烟台': [121.4, 37.5],
  '潍坊': [119.1, 36.7],
  '临沂': [118.3, 35.1],
  '郑州': [113.7, 34.8],
  '洛阳': [112.5, 34.6],
  '南阳': [112.5, 33.0],
  '武汉': [114.3, 30.6],
  '襄阳': [112.1, 32.0],
  '宜昌': [111.3, 30.7],
  '长沙': [112.9, 28.2],
  '株洲': [113.2, 27.8],
  '湘潭': [112.9, 27.8],
  '深圳': [114.1, 22.5],
  '广州': [113.3, 23.1],
  '佛山': [113.1, 23.0],
  '东莞': [113.8, 23.0],
  '惠州': [114.4, 23.1],
  '珠海': [113.6, 22.3],
  '南宁': [108.4, 22.8],
  '柳州': [109.4, 24.3],
  '桂林': [110.3, 25.3],
  '海口': [110.3, 20.0],
  '三亚': [109.5, 18.3],
  '成都': [104.1, 30.6],
  '绵阳': [104.7, 31.5],
  '宜宾': [104.6, 28.8],
  '泸州': [105.4, 28.9],
  '贵阳': [106.7, 26.6],
  '遵义': [106.9, 27.7],
  '昆明': [102.7, 25.0],
  '曲靖': [103.8, 25.5],
  '大理': [100.2, 25.6],
  '拉萨': [91.1, 29.7],
  '西安': [108.9, 34.3],
  '榆林': [109.7, 38.3],
  '宝鸡': [107.1, 34.4],
  '兰州': [103.8, 36.0],
  '金昌': [102.2, 38.5],
  '嘉峪关': [98.3, 39.8],
  '西宁': [101.8, 36.6],
  '海西': [97.3, 37.3],
  '银川': [106.3, 38.5],
  '石嘴山': [106.4, 39.0],
  '乌鲁木齐': [87.6, 43.8],
  '克拉玛依': [84.9, 45.6],
  '昌吉': [87.3, 44.0],
  '香港': [114.2, 22.3],
  '澳门': [113.5, 22.2],
  '台北': [121.5, 25.1],
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
  drillProvince?: string,
  drillCities?: CityIndustry[],
  /** 企业标记：{ name, province, city? }[]，在地图上显示 pins */
  enterpriseMarkers?: { name: string; province: string; city?: string }[],
  /** 园区标记：{ name, province, city, type }[]，在地图上显示 pins */
  parkMarkers?: { name: string; province: string; city: string; type: string }[],
) {
  const maxGdp = Math.max(...overviews.map(o => o.gdp), 100000)
  const minGdp = Math.min(...overviews.map(o => o.gdp), 0)

  const isFiltering = filteredProvinces !== undefined && filteredProvinces.length > 0
  const isComparing = compareProvinces !== undefined && compareProvinces.length > 0
  const isHighlighting = highlightProvince !== undefined && highlightProvince.length > 0

  const isDrilling = drillProvince !== undefined && drillProvince !== null && drillProvince.length > 0

  // 下钻省份的中心坐标
  let drillCenter: [number, number] | undefined
  let drillZoom = 1.2
  if (isDrilling && drillProvince) {
    const coords = PROVINCE_COORDS[drillProvince]
    if (coords) {
      drillCenter = coords
      // 直辖市 zoom 高一些，大省略低
      drillZoom = (drillProvince === '北京' || drillProvince === '天津' || drillProvince === '上海' || drillProvince === '重庆')
        ? 6 : 3.5
    }
  }

  // 城市散点数据
  const cityScatterData: any[] = []
  if (isDrilling && drillCities) {
    for (const city of drillCities) {
      const coord = CITY_COORDS[city.name]
      if (!coord) continue
      cityScatterData.push({
        name: city.name,
        value: [...coord, city.gdp],
        gdp: city.gdp,
        enterpriseCount: city.keyEnterprises.length,
      })
    }
  }

  // 企业标记散点数据
  const enterpriseScatterData: any[] = []
  if (enterpriseMarkers && enterpriseMarkers.length > 0) {
    for (const marker of enterpriseMarkers) {
      // 先按城市查找，再按省份查找
      let coord = marker.city ? CITY_COORDS[marker.city] : undefined
      if (!coord) coord = PROVINCE_COORDS[marker.province]
      if (!coord) continue
      enterpriseScatterData.push({
        name: marker.name,
        value: coord,
        province: marker.province,
        city: marker.city,
        type: 'enterprise',
      })
    }
  }

  // 园区标记散点数据
  const parkScatterData: any[] = []
  if (parkMarkers && parkMarkers.length > 0) {
    for (const marker of parkMarkers) {
      let coord = marker.city ? CITY_COORDS[marker.city] : undefined
      if (!coord) coord = PROVINCE_COORDS[marker.province]
      if (!coord) continue
      parkScatterData.push({
        name: marker.name,
        value: coord,
        province: marker.province,
        city: marker.city,
        type: marker.type === '高新区' ? 'park_tech' : 'park_economic',
        itemStyle: {
          color: marker.type === '高新区' ? '#7b1fa2' : '#e65100',
        },
      })
    }
  }

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) => {
        const data = params.data
        if (!data) return ''
        // 企业标记
        if (data.type === 'enterprise') {
          return `<b>${data.name}</b><br/>
                  <span style="font-size:12px;color:#888;">${data.city || data.province}</span><br/>
                  <span style="font-size:11px;color:#1565c0;">🏢 重点企业</span>`
        }
        // 园区标记
        if (data.type === 'park_tech' || data.type === 'park_economic') {
          const typeLabel = data.type === 'park_tech' ? '国家级高新区' : '国家级经开区'
          const color = data.type === 'park_tech' ? '#7b1fa2' : '#e65100'
          return `<b>${data.name}</b><br/>
                  <span style="font-size:12px;color:#888;">${data.city}，${data.province}</span><br/>
                  <span style="font-size:11px;color:${color};">🏭 ${typeLabel}</span>`
        }
        // 城市散点
        if (data.enterpriseCount !== undefined) {
          return `<b>${data.name}</b><br/>
                  GDP: ${(data.gdp / 10000).toFixed(2)} 万亿元<br/>
                  重点企业: ${data.enterpriseCount} 家`
        }
        // 省份地图
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
        zoom: isDrilling ? drillZoom : 1.2,
        center: isDrilling && drillCenter ? drillCenter : undefined,
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
      ...(isDrilling && cityScatterData.length > 0 ? [{
        name: '城市',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 6,
        data: cityScatterData,
        symbolSize: (val: any) => Math.max(8, Math.sqrt(val[2] / 10000) * 6),
        encode: { value: 2 },
        label: {
          show: true,
          formatter: '{b}',
          fontSize: 11,
          fontWeight: 'bold' as const,
          color: '#37474f',
          position: 'right' as const,
        },
        emphasis: {
          label: { show: true, fontSize: 13, fontWeight: 'bold' },
          itemStyle: { borderColor: '#fff', borderWidth: 2 },
        },
        itemStyle: {
          color: '#ff6d00',
          borderColor: '#fff',
          borderWidth: 1.5,
        },
      }] : []),
      ...(enterpriseScatterData.length > 0 ? [{
        name: '企业',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 7,
        data: enterpriseScatterData,
        symbol: 'pin',
        symbolSize: 28,
        label: {
          show: true,
          formatter: '{b}',
          fontSize: 12,
          fontWeight: 'bold' as const,
          color: '#c62828',
          position: 'top' as const,
        },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
          itemStyle: { borderColor: '#fff', borderWidth: 2 },
        },
        itemStyle: {
          color: '#d32f2f',
          borderColor: '#fff',
          borderWidth: 1.5,
        },
      }] : []),
      ...(parkScatterData.length > 0 ? [{
        name: '园区',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 8,
        data: parkScatterData,
        symbol: 'diamond',
        symbolSize: 14,
        label: {
          show: false,
        },
        emphasis: {
          label: { show: true, fontSize: 12, fontWeight: 'bold' },
          itemStyle: { borderColor: '#fff', borderWidth: 2 },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1.5,
        },
      }] : []),
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
