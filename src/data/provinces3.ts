import type { ProvinceIndustry } from '../types'

export const provinceDataPart3: ProvinceIndustry[] = [
  {
    province: '江西',
    gdp: 36020,
    industries: [
      { name: '有色金属', category: '能源化工', output: 6483.13, percentage: 18.0 },
      { name: '装备制造', category: '制造业', output: 5402.61, percentage: 15.0 },
      { name: '电子信息', category: 'IT/通信', output: 4322.08, percentage: 12.0 },
      { name: '建材陶瓷', category: '制造业', output: 2881.39, percentage: 8.0 },
      { name: '农业', category: '农业', output: 2521.22, percentage: 7.0 },
      { name: '生物医药', category: '生物医药', output: 1800.87, percentage: 5.0 },
    ],
    keyEnterprises: ['江铜集团', '晶科能源', '赣锋锂业', '江铃汽车', '南昌航空'],
    cities: [
      {
        name: '南昌', gdp: 8214.49,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 1642.9, percentage: 20.0 },
          { name: '汽车制造', category: '制造业', output: 985.74, percentage: 12.0 },
          { name: '航空装备', category: '制造业', output: 492.87, percentage: 6.0 },
        ],
        keyEnterprises: ['江铃汽车', '洪都航空', '欧菲光'],
      },
      {
        name: '赣州', gdp: 4949.76,
        industries: [
          { name: '有色金属', category: '能源化工', output: 1484.93, percentage: 30.0 },
          { name: '家具制造', category: '制造业', output: 544.47, percentage: 11.0 },
          { name: '新能源', category: '能源化工', output: 445.48, percentage: 9.0 },
        ],
        keyEnterprises: ['赣锋锂业', '中国稀土'],
      },
      {
        name: '上饶', gdp: 3685.99,
        industries: [
          { name: '光伏新能源', category: '能源化工', output: 921.5, percentage: 25.0 },
          { name: '有色金属', category: '能源化工', output: 516.04, percentage: 14.0 },
        ],
        keyEnterprises: ['晶科能源', '凤凰光学'],
      },
    ],
  },
  {
    province: '山东',
    gdp: 103197,
    industries: [
      { name: '装备制造', category: '制造业', output: 17543.26, percentage: 17.0 },
      { name: '化工', category: '能源化工', output: 15479.65, percentage: 15.0 },
      { name: '农业', category: '农业', output: 12383.72, percentage: 12.0 },
      { name: '信息技术', category: 'IT/通信', output: 8255.47, percentage: 8.0 },
      { name: '纺织服装', category: '制造业', output: 7224.19, percentage: 7.0 },
      { name: '新能源', category: '能源化工', output: 5159.54, percentage: 5.0 },
      { name: '生物医药', category: '生物医药', output: 4128.26, percentage: 4.0 },
    ],
    keyEnterprises: ['海尔集团', '海信集团', '潍柴动力', '山东黄金', '万华化学', '中泰证券'],
    cities: [
      {
        name: '济南', gdp: 13610.79,
        industries: [
          { name: '信息技术', category: 'IT/通信', output: 2722.16, percentage: 20.0 },
          { name: '装备制造', category: '制造业', output: 1905.51, percentage: 14.0 },
          { name: '生物医药', category: '生物医药', output: 1224.97, percentage: 9.0 },
        ],
        keyEnterprises: ['浪潮集团', '重汽集团', '齐鲁制药'],
      },
      {
        name: '青岛', gdp: 17065.84,
        industries: [
          { name: '家电制造', category: '制造业', output: 3071.85, percentage: 18.0 },
          { name: '港口物流', category: '交通物流', output: 2047.9, percentage: 12.0 },
          { name: '轨道交通', category: '制造业', output: 1365.27, percentage: 8.0 },
        ],
        keyEnterprises: ['海尔集团', '海信集团', '中车四方', '青岛港'],
      },
      {
        name: '烟台', gdp: 10993.33,
        industries: [
          { name: '化工', category: '能源化工', output: 2418.53, percentage: 22.0 },
          { name: '装备制造', category: '制造业', output: 1649, percentage: 15.0 },
          { name: '食品加工', category: '制造业', output: 879.47, percentage: 8.0 },
        ],
        keyEnterprises: ['万华化学', '南山集团', '烟台港'],
      },
      {
        name: '潍坊', gdp: 8375.87,
        industries: [
          { name: '动力装备', category: '制造业', output: 1675.17, percentage: 20.0 },
          { name: '化工', category: '能源化工', output: 1172.62, percentage: 14.0 },
          { name: '农业', category: '农业', output: 753.83, percentage: 9.0 },
        ],
        keyEnterprises: ['潍柴动力', '歌尔股份', '晨鸣纸业'],
      },
      {
        name: '临沂', gdp: 6491.3,
        industries: [
          { name: '商贸物流', category: '交通物流', output: 1298.26, percentage: 20.0 },
          { name: '装备制造', category: '制造业', output: 843.87, percentage: 13.0 },
          { name: '食品', category: '制造业', output: 519.3, percentage: 8.0 },
        ],
        keyEnterprises: ['临工集团', '金锣集团'],
      },
    ],
  },

  // ========== 华中 ==========
  {
    province: '河南',
    gdp: 66632.79,
    industries: [
      { name: '装备制造', category: '制造业', output: 11327.26, percentage: 17.0 },
      { name: '食品加工', category: '制造业', output: 9994.4, percentage: 15.0 },
      { name: '农业', category: '农业', output: 7996.15, percentage: 12.0 },
      { name: '电子信息', category: 'IT/通信', output: 5330.41, percentage: 8.0 },
      { name: '新能源汽车', category: '制造业', output: 4663.98, percentage: 7.0 },
      { name: '生物医药', category: '生物医药', output: 3331.12, percentage: 5.0 },
    ],
    keyEnterprises: ['富士康', '宇通客车', '洛阳钼业', '牧原股份', '双汇发展', '思念食品'],
    cities: [
      {
        name: '郑州', gdp: 14460.33,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 3615.08, percentage: 25.0 },
          { name: '装备制造', category: '制造业', output: 2024.45, percentage: 14.0 },
          { name: '食品加工', category: '制造业', output: 1156.83, percentage: 8.0 },
        ],
        keyEnterprises: ['富士康', '宇通客车', '思念食品'],
      },
      {
        name: '洛阳', gdp: 6287.1,
        industries: [
          { name: '装备制造', category: '制造业', output: 1571.78, percentage: 25.0 },
          { name: '有色金属', category: '能源化工', output: 754.45, percentage: 12.0 },
          { name: '文旅', category: '文旅', output: 565.84, percentage: 9.0 },
        ],
        keyEnterprises: ['洛阳钼业', '中信重工', '中国一拖'],
      },
      {
        name: '南阳', gdp: 4715.33,
        industries: [
          { name: '农牧', category: '农业', output: 943.07, percentage: 20.0 },
          { name: '装备制造', category: '制造业', output: 565.84, percentage: 12.0 },
        ],
        keyEnterprises: ['牧原股份', '中光学集团'],
      },
    ],
  },
  {
    province: '湖北',
    gdp: 62660.9,
    industries: [
      { name: '汽车制造', category: '制造业', output: 10025.67, percentage: 16.0 },
      { name: '装备制造', category: '制造业', output: 8772.72, percentage: 14.0 },
      { name: '电子信息', category: 'IT/通信', output: 7519.77, percentage: 12.0 },
      { name: '钢铁化工', category: '能源化工', output: 5012.83, percentage: 8.0 },
      { name: '生物医药', category: '生物医药', output: 3759.89, percentage: 6.0 },
      { name: '文旅', category: '文旅', output: 2506.94, percentage: 4.0 },
    ],
    keyEnterprises: ['东风汽车', '中建三局', '武钢集团', '长飞光纤', '小米武汉', '三峡集团'],
    cities: [
      {
        name: '武汉', gdp: 20882.45,
        industries: [
          { name: '汽车制造', category: '制造业', output: 4176.49, percentage: 20.0 },
          { name: '电子信息', category: 'IT/通信', output: 3550.02, percentage: 17.0 },
          { name: '金融', category: '金融', output: 1670.6, percentage: 8.0 },
        ],
        keyEnterprises: ['东风汽车', '长飞光纤', '小米武汉', '中建三局'],
      },
      {
        name: '襄阳', gdp: 6577.97,
        industries: [
          { name: '汽车零部件', category: '制造业', output: 1973.39, percentage: 30.0 },
          { name: '装备制造', category: '制造业', output: 789.36, percentage: 12.0 },
        ],
        keyEnterprises: ['东风股份', '骆驼股份'],
      },
      {
        name: '宜昌', gdp: 6264.74,
        industries: [
          { name: '化工', category: '能源化工', output: 1566.18, percentage: 25.0 },
          { name: '水电能源', category: '能源化工', output: 814.42, percentage: 13.0 },
          { name: '生物医药', category: '生物医药', output: 438.53, percentage: 7.0 },
        ],
        keyEnterprises: ['兴发集团', '安琪酵母', '人福医药'],
      },
    ],
  },
  {
    province: '湖南',
    gdp: 55308.65,
    industries: [
      { name: '装备制造', category: '制造业', output: 9956, percentage: 18.0 },
      { name: '工程机械', category: '制造业', output: 7190.09, percentage: 13.0 },
      { name: '电子信息', category: 'IT/通信', output: 5530.76, percentage: 10.0 },
      { name: '食品加工', category: '制造业', output: 4424.19, percentage: 8.0 },
      { name: '农业', category: '农业', output: 3871.43, percentage: 7.0 },
      { name: '新能源', category: '能源化工', output: 2765.9, percentage: 5.0 },
    ],
    keyEnterprises: ['三一重工', '中联重科', '华菱钢铁', '蓝思科技', '爱尔眼科', '湖南广电'],
    cities: [
      {
        name: '长沙', gdp: 15585.47,
        industries: [
          { name: '工程机械', category: '制造业', output: 3896.37, percentage: 25.0 },
          { name: '电子信息', category: 'IT/通信', output: 2337.82, percentage: 15.0 },
          { name: '文化传媒', category: '文旅', output: 1246.84, percentage: 8.0 },
        ],
        keyEnterprises: ['三一重工', '中联重科', '蓝思科技', '湖南广电'],
      },
      {
        name: '株洲', gdp: 3948.32,
        industries: [
          { name: '轨道交通', category: '制造业', output: 1184.5, percentage: 30.0 },
          { name: '新材料', category: '制造业', output: 473.8, percentage: 12.0 },
        ],
        keyEnterprises: ['中车株机', '株洲冶炼'],
      },
      {
        name: '湘潭', gdp: 2805.38,
        industries: [
          { name: '钢铁', category: '制造业', output: 673.29, percentage: 24.0 },
          { name: '装备制造', category: '制造业', output: 364.7, percentage: 13.0 },
        ],
        keyEnterprises: ['华菱钢铁', '湘电集团'],
      },
    ],
  },

  // ========== 华南 ==========
  {
    province: '广东',
    gdp: 145847,
    industries: [
      { name: '电子信息', category: 'IT/通信', output: 30627.77, percentage: 21.0 },
      { name: '装备制造', category: '制造业', output: 17501.58, percentage: 12.0 },
      { name: '家电制造', category: '制造业', output: 11668.06, percentage: 8.0 },
      { name: '汽车制造', category: '制造业', output: 10208.91, percentage: 7.0 },
      { name: '金融', category: '金融', output: 8750.79, percentage: 6.0 },
      { name: '生物医药', category: '生物医药', output: 5833.52, percentage: 4.0 },
      { name: '新能源', category: '能源化工', output: 5104.46, percentage: 3.5 },
    ],
    keyEnterprises: ['华为', '腾讯', '比亚迪', '广汽集团', '美的集团', '格力电器', '招商银行', '大疆', 'TCL', '中兴通讯'],
    cities: [
      {
        name: '深圳', gdp: 35629.25,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 10688.77, percentage: 30.0 },
          { name: '金融', category: '金融', output: 5344.39, percentage: 15.0 },
          { name: '新能源汽车', category: '制造业', output: 2850.34, percentage: 8.0 },
        ],
        keyEnterprises: ['华为', '腾讯', '比亚迪', '招商银行', '大疆', '中兴通讯'],
      },
      {
        name: '广州', gdp: 31201.34,
        industries: [
          { name: '汽车制造', category: '制造业', output: 6240.27, percentage: 20.0 },
          { name: '电子信息', category: 'IT/通信', output: 4680.2, percentage: 15.0 },
          { name: '商贸物流', category: '交通物流', output: 2808.12, percentage: 9.0 },
        ],
        keyEnterprises: ['广汽集团', '网易', '广州医药', '南方电网'],
      },
      {
        name: '佛山', gdp: 13695.64,
        industries: [
          { name: '家电制造', category: '制造业', output: 3560.87, percentage: 26.0 },
          { name: '装备制造', category: '制造业', output: 2054.35, percentage: 15.0 },
          { name: '陶瓷建材', category: '制造业', output: 1095.65, percentage: 8.0 },
        ],
        keyEnterprises: ['美的集团', '碧桂园', '海天味业'],
      },
      {
        name: '东莞', gdp: 11842.09,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 3552.63, percentage: 30.0 },
          { name: '装备制造', category: '制造业', output: 1776.31, percentage: 15.0 },
          { name: '纺织服装', category: '制造业', output: 710.53, percentage: 6.0 },
        ],
        keyEnterprises: ['华为终端', 'OPPO', 'vivo', '立讯精密'],
      },
      {
        name: '惠州', gdp: 5869.56,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 1760.87, percentage: 30.0 },
          { name: '汽车零部件', category: '制造业', output: 528.26, percentage: 9.0 },
          { name: '新能源电池', category: '能源化工', output: 469.56, percentage: 8.0 },
        ],
        keyEnterprises: ['TCL', '亿纬锂能', '比亚迪惠州'],
      },
      {
        name: '珠海', gdp: 4324.94,
        industries: [
          { name: '家电制造', category: '制造业', output: 864.99, percentage: 20.0 },
          { name: '生物医药', category: '生物医药', output: 475.74, percentage: 11.0 },
          { name: '旅游', category: '文旅', output: 389.24, percentage: 9.0 },
        ],
        keyEnterprises: ['格力电器', '丽珠集团', '金山软件'],
      },
    ],
  },
  {
    province: '广西',
    gdp: 29727.45,
    industries: [
      { name: '食品加工', category: '制造业', output: 4756.49, percentage: 16.0 },
      { name: '有色金属', category: '能源化工', output: 3864.13, percentage: 13.0 },
      { name: '装备制造', category: '制造业', output: 3269.57, percentage: 11.0 },
      { name: '农业', category: '农业', output: 2972.81, percentage: 10.0 },
      { name: '文旅', category: '文旅', output: 2080.45, percentage: 7.0 },
      { name: '汽车制造', category: '制造业', output: 1783.68, percentage: 6.0 },
    ],
    keyEnterprises: ['上汽通用五菱', '广西柳钢', '玉柴集团', '桂林三金', '南方有色'],
    cities: [
      {
        name: '南宁', gdp: 5810.72,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 929.72, percentage: 16.0 },
          { name: '食品加工', category: '制造业', output: 697.29, percentage: 12.0 },
          { name: '金融', category: '金融', output: 522.97, percentage: 9.0 },
        ],
        keyEnterprises: ['南宁糖业', '丰林集团'],
      },
      {
        name: '柳州', gdp: 4358.04,
        industries: [
          { name: '汽车制造', category: '制造业', output: 1743.22, percentage: 40.0 },
          { name: '钢铁', category: '制造业', output: 522.97, percentage: 12.0 },
        ],
        keyEnterprises: ['上汽通用五菱', '广西柳钢'],
      },
      {
        name: '桂林', gdp: 3216.65,
        industries: [
          { name: '文旅', category: '文旅', output: 804.16, percentage: 25.0 },
          { name: '装备制造', category: '制造业', output: 386, percentage: 12.0 },
          { name: '生物医药', category: '生物医药', output: 193, percentage: 6.0 },
        ],
        keyEnterprises: ['桂林三金', '桂林福达'],
      },
    ],
  },
  {
    province: '海南',
    gdp: 8109,
    industries: [
      { name: '文旅', category: '文旅', output: 2108.05, percentage: 26.0 },
      { name: '农业', category: '农业', output: 1621.66, percentage: 20.0 },
      { name: '房地产', category: '房地产', output: 972.79, percentage: 12.0 },
      { name: '医药制造', category: '生物医药', output: 486.4, percentage: 6.0 },
      { name: '信息技术', category: 'IT/通信', output: 405.67, percentage: 5.0 },
      { name: '免税零售', category: '金融', output: 323.92, percentage: 4.0 },
    ],
    keyEnterprises: ['海航集团', '海南橡胶', '椰树集团', '天涯社区', '普利制药'],
    cities: [
      {
        name: '海口', gdp: 2452.41,
        industries: [
          { name: '文旅', category: '文旅', output: 613.1, percentage: 25.0 },
          { name: '房地产', category: '房地产', output: 318.81, percentage: 13.0 },
          { name: '医药', category: '生物医药', output: 196.19, percentage: 8.0 },
        ],
        keyEnterprises: ['海航集团', '椰树集团', '普利制药'],
      },
      {
        name: '三亚', gdp: 919.66,
        industries: [
          { name: '文旅', category: '文旅', output: 459.83, percentage: 50.0 },
          { name: '房地产', category: '房地产', output: 110.36, percentage: 12.0 },
        ],
        keyEnterprises: ['海旅投'],
      },
    ],
  },
]
