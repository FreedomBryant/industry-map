import * as echarts from 'echarts'
import type { ProvinceOverview } from '../types'

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

/**
 * 获取中国地图的 ECharts option
 */
export function getMapOption(
  overviews: ProvinceOverview[],
  filteredProvinces?: string[],
  compareProvinces?: string[],
  highlightProvince?: string,
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
