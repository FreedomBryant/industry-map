import type { ProvinceIndustry } from '../types'

export const provinceDataPart2: ProvinceIndustry[] = [
  // ========== 东北 ==========
  {
    province: '辽宁',
    gdp: 33182.9,
    industries: [
      { name: '装备制造', category: '制造业', output: 7632.15, percentage: 23.0 },
      { name: '石油化工', category: '能源化工', output: 5972.63, percentage: 18.0 },
      { name: '钢铁冶金', category: '制造业', output: 3649.72, percentage: 11.0 },
      { name: '农业', category: '农业', output: 2654.62, percentage: 8.0 },
      { name: '电子信息', category: 'IT/通信', output: 1991.22, percentage: 6.0 },
    ],
    keyEnterprises: ['鞍钢集团', '大连造船', '华晨汽车', '恒力石化', '沈飞集团'],
    cities: [
      {
        name: '沈阳', gdp: 8241.62,
        industries: [
          { name: '装备制造', category: '制造业', output: 1977.99, percentage: 24.0 },
          { name: '汽车制造', category: '制造业', output: 988.99, percentage: 12.0 },
          { name: '电子信息', category: 'IT/通信', output: 659.33, percentage: 8.0 },
        ],
        keyEnterprises: ['沈飞集团', '华晨汽车', '沈阳机床', '新松机器人'],
      },
      {
        name: '大连', gdp: 8343.37,
        industries: [
          { name: '装备制造', category: '制造业', output: 1752.11, percentage: 21.0 },
          { name: '石油化工', category: '能源化工', output: 1334.94, percentage: 16.0 },
          { name: '港口物流', category: '交通物流', output: 750.9, percentage: 9.0 },
        ],
        keyEnterprises: ['大连造船', '恒力石化', '大连重工'],
      },
      {
        name: '鞍山', gdp: 2136.72,
        industries: [
          { name: '钢铁冶金', category: '制造业', output: 854.69, percentage: 40.0 },
          { name: '装备制造', category: '制造业', output: 256.41, percentage: 12.0 },
        ],
        keyEnterprises: ['鞍钢集团'],
      },
    ],
  },
  {
    province: '吉林',
    gdp: 14973.88,
    industries: [
      { name: '汽车制造', category: '制造业', output: 5689.8, percentage: 38.0 },
      { name: '石化化工', category: '能源化工', output: 1796.5, percentage: 12.0 },
      { name: '农业', category: '农业', output: 1647.4, percentage: 11.0 },
      { name: '生物医药', category: '生物医药', output: 898.77, percentage: 6.0 },
      { name: '文旅', category: '文旅', output: 598.49, percentage: 4.0 },
    ],
    keyEnterprises: ['中国一汽', '中车长客', '吉林石化', '修正药业', '长春高新'],
    cities: [
      {
        name: '长春', gdp: 7507.16,
        industries: [
          { name: '汽车制造', category: '制造业', output: 4128.94, percentage: 55.0 },
          { name: '生物医药', category: '生物医药', output: 525.5, percentage: 7.0 },
          { name: '轨道交通', category: '制造业', output: 375.36, percentage: 5.0 },
        ],
        keyEnterprises: ['中国一汽', '中车长客', '长春高新', '修正药业'],
      },
      {
        name: '吉林市', gdp: 2085.32,
        industries: [
          { name: '石油化工', category: '能源化工', output: 667.3, percentage: 32.0 },
          { name: '冶金', category: '制造业', output: 250.24, percentage: 12.0 },
        ],
        keyEnterprises: ['吉林石化', '吉林化纤'],
      },
    ],
  },
  {
    province: '黑龙江',
    gdp: 16878,
    industries: [
      { name: '能源工业', category: '能源化工', output: 4050.25, percentage: 24.0 },
      { name: '农业', category: '农业', output: 3882.26, percentage: 23.0 },
      { name: '装备制造', category: '制造业', output: 2194.14, percentage: 13.0 },
      { name: '食品加工', category: '制造业', output: 1688.12, percentage: 10.0 },
      { name: '旅游', category: '文旅', output: 1181.07, percentage: 7.0 },
      { name: '生物医药', category: '生物医药', output: 675.04, percentage: 4.0 },
    ],
    keyEnterprises: ['大庆油田', '哈电集团', '北大荒集团', '哈飞集团', '葵花药业'],
    cities: [
      {
        name: '哈尔滨', gdp: 5633.89,
        industries: [
          { name: '装备制造', category: '制造业', output: 1126.78, percentage: 20.0 },
          { name: '食品加工', category: '制造业', output: 676.07, percentage: 12.0 },
          { name: 'IT/软件', category: 'IT/通信', output: 450.71, percentage: 8.0 },
        ],
        keyEnterprises: ['哈电集团', '哈飞集团', '葵花药业'],
      },
      {
        name: '大庆', gdp: 2868.16,
        industries: [
          { name: '石油开采', category: '能源化工', output: 1577.49, percentage: 55.0 },
          { name: '石化加工', category: '能源化工', output: 401.54, percentage: 14.0 },
        ],
        keyEnterprises: ['大庆油田'],
      },
      {
        name: '齐齐哈尔', gdp: 1434.08,
        industries: [
          { name: '装备制造', category: '制造业', output: 430.22, percentage: 30.0 },
          { name: '食品加工', category: '制造业', output: 200.77, percentage: 14.0 },
        ],
        keyEnterprises: ['中国一重', '齐重数控'],
      },
    ],
  },

  // ========== 华东 ==========
  {
    province: '上海',
    gdp: 56708.71,
    industries: [
      { name: '金融业', category: '金融', output: 14744.32, percentage: 26.0 },
      { name: '电子信息', category: 'IT/通信', output: 7939.49, percentage: 14.0 },
      { name: '汽车制造', category: '制造业', output: 6804.83, percentage: 12.0 },
      { name: '生物医药', category: '生物医药', output: 4536.55, percentage: 8.0 },
      { name: '高端装备', category: '制造业', output: 3969.75, percentage: 7.0 },
      { name: '房地产', category: '房地产', output: 3402.94, percentage: 6.0 },
    ],
    keyEnterprises: ['上汽集团', '中国商飞', '中芯国际', '复星集团', '上海医药', '拼多多', 'B站'],
    cities: [
      {
        name: '上海', gdp: 56708.71,
        industries: [
          { name: '金融业', category: '金融', output: 14744.32, percentage: 26.0 },
          { name: '电子信息', category: 'IT/通信', output: 7939.49, percentage: 14.0 },
          { name: '汽车制造', category: '制造业', output: 6804.83, percentage: 12.0 },
          { name: '生物医药', category: '生物医药', output: 4536.55, percentage: 8.0 },
        ],
        keyEnterprises: ['上汽集团', '中国商飞', '中芯国际', '复星集团', '拼多多'],
      },
    ],
  },
  {
    province: '江苏',
    gdp: 142351.5,
    industries: [
      { name: '电子信息', category: 'IT/通信', output: 24199.38, percentage: 17.0 },
      { name: '装备制造', category: '制造业', output: 21352.52, percentage: 15.0 },
      { name: '化工', category: '能源化工', output: 15658.79, percentage: 11.0 },
      { name: '纺织服装', category: '制造业', output: 11388.49, percentage: 8.0 },
      { name: '新能源', category: '能源化工', output: 9965.06, percentage: 7.0 },
      { name: '生物医药', category: '生物医药', output: 8540.59, percentage: 6.0 },
      { name: '金融', category: '金融', output: 7117.16, percentage: 5.0 },
    ],
    keyEnterprises: ['华为南京', '苏宁集团', '恒瑞医药', '徐工集团', '药明康德', 'SK海力士'],
    cities: [
      {
        name: '苏州', gdp: 27014.04,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 6753.51, percentage: 25.0 },
          { name: '装备制造', category: '制造业', output: 4052.11, percentage: 15.0 },
          { name: '纺织', category: '制造业', output: 2161.12, percentage: 8.0 },
        ],
        keyEnterprises: ['华为苏州', '友达光电', '恒力集团', '盛虹集团'],
      },
      {
        name: '南京', gdp: 18909.82,
        industries: [
          { name: '软件信息', category: 'IT/通信', output: 3971.06, percentage: 21.0 },
          { name: '金融', category: '金融', output: 2269.18, percentage: 12.0 },
          { name: '生物医药', category: '生物医药', output: 1701.88, percentage: 9.0 },
        ],
        keyEnterprises: ['华为南京', '苏宁集团', '药明康德'],
      },
      {
        name: '无锡', gdp: 16104.52,
        industries: [
          { name: '集成电路', category: 'IT/通信', output: 3220.9, percentage: 20.0 },
          { name: '装备制造', category: '制造业', output: 2415.68, percentage: 15.0 },
          { name: '物联网', category: 'IT/通信', output: 1610.45, percentage: 10.0 },
        ],
        keyEnterprises: ['SK海力士', '华虹半导体', '远景能源'],
      },
      {
        name: '常州', gdp: 10493.91,
        industries: [
          { name: '新能源', category: '能源化工', output: 3148.17, percentage: 30.0 },
          { name: '装备制造', category: '制造业', output: 1574.09, percentage: 15.0 },
          { name: '新材料', category: '制造业', output: 839.51, percentage: 8.0 },
        ],
        keyEnterprises: ['理想汽车', '中创新航', '天合光能'],
      },
      {
        name: '南通', gdp: 12260.22,
        industries: [
          { name: '纺织', category: '制造业', output: 2206.84, percentage: 18.0 },
          { name: '装备制造', category: '制造业', output: 1716.43, percentage: 14.0 },
          { name: '建筑', category: '房地产', output: 1226.02, percentage: 10.0 },
        ],
        keyEnterprises: ['中天科技', '通富微电'],
      },
      {
        name: '徐州', gdp: 9143.21,
        industries: [
          { name: '工程机械', category: '制造业', output: 2285.8, percentage: 25.0 },
          { name: '新能源', category: '能源化工', output: 1097.19, percentage: 12.0 },
          { name: '食品加工', category: '制造业', output: 548.59, percentage: 6.0 },
        ],
        keyEnterprises: ['徐工集团', '协鑫集团'],
      },
    ],
  },
  {
    province: '浙江',
    gdp: 94545,
    industries: [
      { name: '数字经济', category: 'IT/通信', output: 18909, percentage: 20.0 },
      { name: '装备制造', category: '制造业', output: 14181.75, percentage: 15.0 },
      { name: '纺织服装', category: '制造业', output: 9454.5, percentage: 10.0 },
      { name: '化工', category: '能源化工', output: 7563.6, percentage: 8.0 },
      { name: '金融', category: '金融', output: 6618.15, percentage: 7.0 },
      { name: '文旅', category: '文旅', output: 5672.7, percentage: 6.0 },
      { name: '电子商务', category: 'IT/通信', output: 4727.25, percentage: 5.0 },
    ],
    keyEnterprises: ['阿里巴巴', '蚂蚁集团', '网易', '海康威视', '吉利汽车', '娃哈哈'],
    cities: [
      {
        name: '杭州', gdp: 20986.68,
        industries: [
          { name: '数字经济', category: 'IT/通信', output: 6296, percentage: 30.0 },
          { name: '金融', category: '金融', output: 2518.4, percentage: 12.0 },
          { name: '生物医药', category: '生物医药', output: 1259.2, percentage: 6.0 },
        ],
        keyEnterprises: ['阿里巴巴', '蚂蚁集团', '网易', '海康威视'],
      },
      {
        name: '宁波', gdp: 17314.01,
        industries: [
          { name: '装备制造', category: '制造业', output: 3462.8, percentage: 20.0 },
          { name: '石油化工', category: '能源化工', output: 2423.96, percentage: 14.0 },
          { name: '港口物流', category: '交通物流', output: 1558.26, percentage: 9.0 },
        ],
        keyEnterprises: ['宁波港', '舜宇光学', '均胜电子'],
      },
      {
        name: '温州', gdp: 9129.21,
        industries: [
          { name: '电气机械', category: '制造业', output: 1825.84, percentage: 20.0 },
          { name: '鞋革服装', category: '制造业', output: 1095.5, percentage: 12.0 },
          { name: '新能源', category: '能源化工', output: 639.04, percentage: 7.0 },
        ],
        keyEnterprises: ['正泰集团', '德力西', '华峰化学'],
      },
      {
        name: '绍兴', gdp: 8184.81,
        industries: [
          { name: '纺织', category: '制造业', output: 2046.2, percentage: 25.0 },
          { name: '化工', category: '能源化工', output: 982.18, percentage: 12.0 },
          { name: '装备制造', category: '制造业', output: 654.78, percentage: 8.0 },
        ],
        keyEnterprises: ['海亮集团', '三花智控'],
      },
      {
        name: '嘉兴', gdp: 7345.34,
        industries: [
          { name: '纺织服装', category: '制造业', output: 1322.16, percentage: 18.0 },
          { name: '化工', category: '能源化工', output: 734.53, percentage: 10.0 },
          { name: '光伏', category: '能源化工', output: 587.63, percentage: 8.0 },
        ],
        keyEnterprises: ['桐昆集团', '巨石集团'],
      },
    ],
  },
  {
    province: '安徽',
    gdp: 52989,
    industries: [
      { name: '装备制造', category: '制造业', output: 10597.8, percentage: 20.0 },
      { name: '新能源汽车', category: '制造业', output: 6888.31, percentage: 13.0 },
      { name: '电子信息', category: 'IT/通信', output: 6358.68, percentage: 12.0 },
      { name: '新材料', category: '制造业', output: 4239.12, percentage: 8.0 },
      { name: '家电制造', category: '制造业', output: 3709.49, percentage: 7.0 },
      { name: '农业', category: '农业', output: 3179.86, percentage: 6.0 },
    ],
    keyEnterprises: ['奇瑞汽车', '蔚来汽车', '科大讯飞', '京东方', '阳光电源', '长鑫存储'],
    cities: [
      {
        name: '合肥', gdp: 13188.37,
        industries: [
          { name: '集成电路', category: 'IT/通信', output: 2769.56, percentage: 21.0 },
          { name: '新能源汽车', category: '制造业', output: 1978.26, percentage: 15.0 },
          { name: '人工智能', category: 'IT/通信', output: 1318.84, percentage: 10.0 },
        ],
        keyEnterprises: ['科大讯飞', '京东方', '蔚来汽车', '长鑫存储', '阳光电源'],
      },
      {
        name: '芜湖', gdp: 4919.47,
        industries: [
          { name: '汽车制造', category: '制造业', output: 1721.82, percentage: 35.0 },
          { name: '装备制造', category: '制造业', output: 590.34, percentage: 12.0 },
        ],
        keyEnterprises: ['奇瑞汽车', '海螺集团'],
      },
      {
        name: '滁州', gdp: 3872.78,
        industries: [
          { name: '家电制造', category: '制造业', output: 774.56, percentage: 20.0 },
          { name: '光伏', category: '能源化工', output: 464.73, percentage: 12.0 },
        ],
        keyEnterprises: ['博西华', '隆基乐叶'],
      },
    ],
  },
  {
    province: '福建',
    gdp: 60199.45,
    industries: [
      { name: '电子信息', category: 'IT/通信', output: 10835.92, percentage: 18.0 },
      { name: '装备制造', category: '制造业', output: 9029.76, percentage: 15.0 },
      { name: '纺织服装', category: '制造业', output: 7826, percentage: 13.0 },
      { name: '石油化工', category: '能源化工', output: 6019.84, percentage: 10.0 },
      { name: '轻工食品', category: '制造业', output: 4816.08, percentage: 8.0 },
      { name: '文旅', category: '文旅', output: 3009.92, percentage: 5.0 },
    ],
    keyEnterprises: ['宁德时代', '紫金矿业', '福耀玻璃', '安踏集团', '兴业银行'],
    cities: [
      {
        name: '福州', gdp: 13444.58,
        industries: [
          { name: '电子信息', category: 'IT/通信', output: 2688.92, percentage: 20.0 },
          { name: '纺织', category: '制造业', output: 1613.35, percentage: 12.0 },
          { name: '化工', category: '能源化工', output: 1075.57, percentage: 8.0 },
        ],
        keyEnterprises: ['京东方', '冠捷电子', '永辉超市'],
      },
      {
        name: '厦门', gdp: 8233.51,
        industries: [
          { name: '电子', category: 'IT/通信', output: 2058.38, percentage: 25.0 },
          { name: '金融', category: '金融', output: 988.02, percentage: 12.0 },
          { name: '文旅', category: '文旅', output: 658.68, percentage: 8.0 },
        ],
        keyEnterprises: ['戴尔', '厦门航空', '美图公司'],
      },
      {
        name: '泉州', gdp: 12715.03,
        industries: [
          { name: '纺织鞋服', category: '制造业', output: 3814.51, percentage: 30.0 },
          { name: '建材家居', category: '制造业', output: 1780.1, percentage: 14.0 },
          { name: '装备制造', category: '制造业', output: 1017.2, percentage: 8.0 },
        ],
        keyEnterprises: ['安踏集团', '特步', '361°'],
      },
      {
        name: '宁德', gdp: 4168.86,
        industries: [
          { name: '锂电池', category: '能源化工', output: 1667.55, percentage: 40.0 },
          { name: '新能源', category: '能源化工', output: 500.26, percentage: 12.0 },
        ],
        keyEnterprises: ['宁德时代', '青拓集团'],
      },
    ],
  },
]
