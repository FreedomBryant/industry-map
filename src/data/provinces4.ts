import type { ProvinceIndustry } from '../types'

export const provinceDataPart4: ProvinceIndustry[] = [
  // ========== 西南 ==========
  {
    province: '重庆',
    gdp: 33757.93,
    industries: [
      { name: '汽车制造', category: '制造业', output: 6414.32, percentage: 19.0 },
      { name: '电子信息', category: 'IT/通信', output: 6076.67, percentage: 18.0 },
      { name: '装备制造', category: '制造业', output: 4050.76, percentage: 12.0 },
      { name: '材料', category: '制造业', output: 2700.16, percentage: 8.0 },
      { name: '金融', category: '金融', output: 2025.91, percentage: 6.0 },
    ],
    keyEnterprises: ['长安汽车', '赛力斯', '重庆钢铁', '重庆啤酒', '中冶赛迪'],
    cities: [
      {
        name: '重庆', gdp: 33757.93,
        industries: [
          { name: '汽车制造', category: '制造业', output: 6414.32, percentage: 19.0 },
          { name: '电子信息', category: 'IT/通信', output: 6076.67, percentage: 18.0 },
          { name: '装备制造', category: '制造业', output: 4050.76, percentage: 12.0 },
        ],
        keyEnterprises: ['长安汽车', '赛力斯', '重庆钢铁'],
      },
    ],
  },
  {
    province: '四川',
    gdp: 67665.34,
    industries: [
      { name: '电子信息', category: 'IT/通信', output: 11502.6, percentage: 17.0 },
      { name: '装备制造', category: '制造业', output: 8796.9, percentage: 13.0 },
      { name: '食品饮料', category: '制造业', output: 6766.85, percentage: 10.0 },
      { name: '能源化工', category: '能源化工', output: 5413.48, percentage: 8.0 },
      { name: '金融', category: '金融', output: 4060.11, percentage: 6.0 },
      { name: '文旅', category: '文旅', output: 3383.42, percentage: 5.0 },
    ],
    keyEnterprises: ['长虹集团', '新希望集团', '五粮液', '通威集团', '泸州老窖', '四川航空'],
    cities: [
      {
        name: '成都', gdp: 23009.37,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 5752.34, percentage: 25.0 },
          { name: '金融', category: '金融', output: 2761.12, percentage: 12.0 },
          { name: '生物医药', category: '生物医药', output: 1840.75, percentage: 8.0 },
        ],
        keyEnterprises: ['华为成都', '长虹集团', '腾讯成都', '新希望集团'],
      },
      {
        name: '绵阳', gdp: 4497.29,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 1798.91, percentage: 40.0 },
          { name: '装备制造', category: '制造业', output: 539.67, percentage: 12.0 },
        ],
        keyEnterprises: ['长虹集团', '九州电器'],
      },
      {
        name: '宜宾', gdp: 3869.76,
        industries: [
          { name: '白酒', category: '制造业', output: 1547.9, percentage: 40.0 },
          { name: '新能源', category: '能源化工', output: 464.37, percentage: 12.0 },
        ],
        keyEnterprises: ['五粮液', '宁德时代宜宾'],
      },
      {
        name: '泸州', gdp: 2928.47,
        industries: [
          { name: '白酒', category: '制造业', output: 937.11, percentage: 32.0 },
          { name: '化工', category: '能源化工', output: 351.42, percentage: 12.0 },
        ],
        keyEnterprises: ['泸州老窖'],
      },
    ],
  },
  {
    province: '贵州',
    gdp: 23562.17,
    industries: [
      { name: '数字经济', category: 'IT/通信', output: 4241.11, percentage: 18.0 },
      { name: '装备制造', category: '制造业', output: 3063.37, percentage: 13.0 },
      { name: '白酒酿造', category: '制造业', output: 2827.4, percentage: 12.0 },
      { name: '能源化工', category: '能源化工', output: 2356.52, percentage: 10.0 },
      { name: '文旅', category: '文旅', output: 2120.55, percentage: 9.0 },
      { name: '农业', category: '农业', output: 1649.67, percentage: 7.0 },
    ],
    keyEnterprises: ['贵州茅台', '贵州磷化', '满帮集团', '贵阳银行', '贵州燃气'],
    cities: [
      {
        name: '贵阳', gdp: 5717.18,
        industries: [
          { name: '大数据', category: 'IT/通信', output: 1715.15, percentage: 30.0 },
          { name: '装备制造', category: '制造业', output: 686.06, percentage: 12.0 },
          { name: '文旅', category: '文旅', output: 400.2, percentage: 7.0 },
        ],
        keyEnterprises: ['满帮集团', '贵阳银行', '贵州磷化'],
      },
      {
        name: '遵义', gdp: 4677.69,
        industries: [
          { name: '白酒', category: '制造业', output: 2338.85, percentage: 50.0 },
          { name: '装备制造', category: '制造业', output: 374.22, percentage: 8.0 },
          { name: '农业', category: '农业', output: 327.44, percentage: 7.0 },
        ],
        keyEnterprises: ['贵州茅台', '贵州钢绳'],
      },
    ],
  },
  {
    province: '云南',
    gdp: 32765.78,
    industries: [
      { name: '文旅', category: '文旅', output: 6553.34, percentage: 20.0 },
      { name: '农业', category: '农业', output: 5570.39, percentage: 17.0 },
      { name: '能源化工', category: '能源化工', output: 3604.49, percentage: 11.0 },
      { name: '有色金属', category: '能源化工', output: 2948.85, percentage: 9.0 },
      { name: '烟草', category: '制造业', output: 2621.55, percentage: 8.0 },
      { name: '生物医药', category: '生物医药', output: 1638.6, percentage: 5.0 },
    ],
    keyEnterprises: ['云南烟草', '云南白药', '云南铜业', '云南旅游', '昆明制药'],
    cities: [
      {
        name: '昆明', gdp: 8312.47,
        industries: [
          { name: '文旅', category: '文旅', output: 1662.49, percentage: 20.0 },
          { name: '烟草', category: '制造业', output: 1163.75, percentage: 14.0 },
          { name: '金融', category: '金融', output: 748.12, percentage: 9.0 },
        ],
        keyEnterprises: ['云南烟草', '云南白药', '云南铜业'],
      },
      {
        name: '曲靖', gdp: 4156.23,
        industries: [
          { name: '能源化工', category: '能源化工', output: 1039.06, percentage: 25.0 },
          { name: '农业', category: '农业', output: 581.87, percentage: 14.0 },
          { name: '有色金属', category: '能源化工', output: 457.19, percentage: 11.0 },
        ],
        keyEnterprises: ['云南铜业', '驰宏锌锗'],
      },
      {
        name: '大理', gdp: 1870.31,
        industries: [
          { name: '文旅', category: '文旅', output: 561.09, percentage: 30.0 },
          { name: '农业', category: '农业', output: 336.66, percentage: 18.0 },
        ],
        keyEnterprises: ['大理旅游'],
      },
    ],
  },
  {
    province: '西藏',
    gdp: 3031.89,
    industries: [
      { name: '文旅', category: '文旅', output: 909.04, percentage: 30.0 },
      { name: '农业', category: '农业', output: 484.67, percentage: 16.0 },
      { name: '能源', category: '能源化工', output: 424.36, percentage: 14.0 },
      { name: '民族手工业', category: '制造业', output: 151.32, percentage: 5.0 },
    ],
    keyEnterprises: ['西藏旅游', '西藏矿业', '拉萨啤酒', '西藏药业'],
    cities: [
      {
        name: '拉萨', gdp: 932.07,
        industries: [
          { name: '文旅', category: '文旅', output: 372.83, percentage: 40.0 },
          { name: '商贸', category: '金融', output: 93.21, percentage: 10.0 },
        ],
        keyEnterprises: ['西藏旅游', '拉萨啤酒'],
      },
    ],
  },

  // ========== 西北 ==========
  {
    province: '陕西',
    gdp: 36551.1,
    industries: [
      { name: '能源化工', category: '能源化工', output: 9503.2, percentage: 26.0 },
      { name: '装备制造', category: '制造业', output: 5847.97, percentage: 16.0 },
      { name: '电子信息', category: 'IT/通信', output: 4020.35, percentage: 11.0 },
      { name: '新能源汽车', category: '制造业', output: 2923.98, percentage: 8.0 },
      { name: '文旅', category: '文旅', output: 2558.87, percentage: 7.0 },
    ],
    keyEnterprises: ['延长石油', '陕煤集团', '比亚迪西安', '隆基绿能', '西电集团'],
    cities: [
      {
        name: '西安', gdp: 12341.82,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 2715.2, percentage: 22.0 },
          { name: '装备制造', category: '制造业', output: 1851.27, percentage: 15.0 },
          { name: '文旅', category: '文旅', output: 1481.02, percentage: 12.0 },
        ],
        keyEnterprises: ['比亚迪西安', '隆基绿能', '西电集团', '三星西安'],
      },
      {
        name: '榆林', gdp: 7713.64,
        industries: [
          { name: '煤炭', category: '能源化工', output: 3085.46, percentage: 40.0 },
          { name: '煤化工', category: '能源化工', output: 1157.05, percentage: 15.0 },
          { name: '新能源', category: '能源化工', output: 539.95, percentage: 7.0 },
        ],
        keyEnterprises: ['陕煤集团', '延长石油'],
      },
      {
        name: '宝鸡', gdp: 3085.46,
        industries: [
          { name: '装备制造', category: '制造业', output: 925.64, percentage: 30.0 },
          { name: '有色金属', category: '能源化工', output: 370.25, percentage: 12.0 },
        ],
        keyEnterprises: ['宝钛集团', '中铁宝桥'],
      },
    ],
  },
  {
    province: '甘肃',
    gdp: 13697.5,
    industries: [
      { name: '能源化工', category: '能源化工', output: 3561.61, percentage: 26.0 },
      { name: '有色金属', category: '能源化工', output: 2328.06, percentage: 17.0 },
      { name: '装备制造', category: '制造业', output: 1643.33, percentage: 12.0 },
      { name: '农业', category: '农业', output: 1506.39, percentage: 11.0 },
      { name: '文旅', category: '文旅', output: 684.72, percentage: 5.0 },
    ],
    keyEnterprises: ['金川集团', '酒钢集团', '白银有色', '兰州石化', '读者集团'],
    cities: [
      {
        name: '兰州', gdp: 3897.65,
        industries: [
          { name: '石油化工', category: '能源化工', output: 974.41, percentage: 25.0 },
          { name: '装备制造', category: '制造业', output: 584.65, percentage: 15.0 },
          { name: '生物医药', category: '生物医药', output: 272.84, percentage: 7.0 },
        ],
        keyEnterprises: ['兰州石化', '兰州生物所', '读者集团'],
      },
      {
        name: '金昌', gdp: 632.05,
        industries: [
          { name: '有色金属', category: '能源化工', output: 316.03, percentage: 50.0 },
        ],
        keyEnterprises: ['金川集团'],
      },
      {
        name: '嘉峪关', gdp: 421.37,
        industries: [
          { name: '钢铁冶金', category: '制造业', output: 252.82, percentage: 60.0 },
        ],
        keyEnterprises: ['酒钢集团'],
      },
    ],
  },
  {
    province: '青海',
    gdp: 4121.84,
    industries: [
      { name: '能源化工', category: '能源化工', output: 1153.88, percentage: 28.0 },
      { name: '有色金属', category: '能源化工', output: 701.09, percentage: 17.0 },
      { name: '盐湖化工', category: '能源化工', output: 576.94, percentage: 14.0 },
      { name: '文旅', category: '文旅', output: 371.41, percentage: 9.0 },
      { name: '新能源', category: '能源化工', output: 288.99, percentage: 7.0 },
    ],
    keyEnterprises: ['盐湖集团', '青海电力', '西部矿业', '青海华鼎'],
    cities: [
      {
        name: '西宁', gdp: 1773.6,
        industries: [
          { name: '有色金属', category: '能源化工', output: 443.4, percentage: 25.0 },
          { name: '能源', category: '能源化工', output: 266.04, percentage: 15.0 },
          { name: '装备制造', category: '制造业', output: 159.62, percentage: 9.0 },
        ],
        keyEnterprises: ['西部矿业', '青海铝业'],
      },
      {
        name: '海西', gdp: 938.96,
        industries: [
          { name: '盐湖化工', category: '能源化工', output: 422.53, percentage: 45.0 },
          { name: '新能源', category: '能源化工', output: 131.45, percentage: 14.0 },
        ],
        keyEnterprises: ['盐湖集团'],
      },
    ],
  },
  {
    province: '宁夏',
    gdp: 5696,
    industries: [
      { name: '能源化工', category: '能源化工', output: 1595.12, percentage: 28.0 },
      { name: '装备制造', category: '制造业', output: 797.04, percentage: 14.0 },
      { name: '新材料', category: '制造业', output: 683.18, percentage: 12.0 },
      { name: '新能源', category: '能源化工', output: 569.31, percentage: 10.0 },
      { name: '农业', category: '农业', output: 512.38, percentage: 9.0 },
    ],
    keyEnterprises: ['宁煤集团', '中铝宁夏', '宁夏建材', '西部创业'],
    cities: [
      {
        name: '银川', gdp: 2794.82,
        industries: [
          { name: '装备制造', category: '制造业', output: 503.07, percentage: 18.0 },
          { name: '能源化工', category: '能源化工', output: 419.22, percentage: 15.0 },
          { name: '新材料', category: '制造业', output: 335.38, percentage: 12.0 },
        ],
        keyEnterprises: ['宁煤集团', '银川热电'],
      },
      {
        name: '石嘴山', gdp: 828.09,
        industries: [
          { name: '能源化工', category: '能源化工', output: 289.83, percentage: 35.0 },
          { name: '新材料', category: '制造业', output: 124.21, percentage: 15.0 },
        ],
        keyEnterprises: ['中铝宁夏', '宁夏钢铁'],
      },
    ],
  },
  {
    province: '新疆',
    gdp: 21462.14,
    industries: [
      { name: '油气开采', category: '能源化工', output: 5580.3, percentage: 26.0 },
      { name: '农业', category: '农业', output: 4292.62, percentage: 20.0 },
      { name: '化工', category: '能源化工', output: 2361.1, percentage: 11.0 },
      { name: '纺织服装', category: '制造业', output: 1501.95, percentage: 7.0 },
      { name: '文旅', category: '文旅', output: 1287.68, percentage: 6.0 },
      { name: '新能源', category: '能源化工', output: 858.11, percentage: 4.0 },
    ],
    keyEnterprises: ['中石油新疆', '特变电工', '新疆天业', '金风科技', '新疆棉花'],
    cities: [
      {
        name: '乌鲁木齐', gdp: 4389.82,
        industries: [
          { name: '能源化工', category: '能源化工', output: 1097.46, percentage: 25.0 },
          { name: '装备制造', category: '制造业', output: 614.58, percentage: 14.0 },
          { name: '商贸物流', category: '交通物流', output: 438.98, percentage: 10.0 },
        ],
        keyEnterprises: ['特变电工', '新疆天业', '金风科技'],
      },
      {
        name: '克拉玛依', gdp: 1463.27,
        industries: [
          { name: '油气开采', category: '能源化工', output: 877.96, percentage: 60.0 },
          { name: '石化', category: '能源化工', output: 219.49, percentage: 15.0 },
        ],
        keyEnterprises: ['中石油新疆'],
      },
      {
        name: '昌吉', gdp: 2090.39,
        industries: [
          { name: '能源', category: '能源化工', output: 627.12, percentage: 30.0 },
          { name: '农业', category: '农业', output: 376.27, percentage: 18.0 },
        ],
        keyEnterprises: ['特变电工'],
      },
    ],
  },
  {
    province: '港澳台',
    gdp: 35000,
    industries: [
      { name: '金融', category: '金融', output: 12250, percentage: 35.0 },
      { name: '贸易物流', category: '交通物流', output: 7000, percentage: 20.0 },
      { name: '文旅', category: '文旅', output: 3500, percentage: 10.0 },
      { name: '电子信息', category: 'IT/通信', output: 2800, percentage: 8.0 },
      { name: '生物医药', category: '生物医药', output: 1750, percentage: 5.0 },
    ],
    keyEnterprises: ['汇丰银行', '腾讯', '港铁', '澳门博彩', '台积电'],
    cities: [
      {
        name: '香港', gdp: 28000,
        industries: [
          { name: '金融', category: '金融', output: 11200, percentage: 40.0 },
          { name: '贸易物流', category: '交通物流', output: 5600, percentage: 20.0 },
          { name: '文旅', category: '文旅', output: 1400, percentage: 5.0 },
        ],
        keyEnterprises: ['汇丰银行', '港铁', '国泰航空'],
      },
      {
        name: '澳门', gdp: 3800,
        industries: [
          { name: '博彩旅游', category: '文旅', output: 2280, percentage: 60.0 },
          { name: '金融', category: '金融', output: 342, percentage: 9.0 },
        ],
        keyEnterprises: ['澳门博彩', '澳门航空'],
      },
      {
        name: '台北', gdp: 12000,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 4800, percentage: 40.0 },
          { name: '金融', category: '金融', output: 1800, percentage: 15.0 },
        ],
        keyEnterprises: ['台积电', '富士康', '联发科'],
      },
    ],
  },
]
