/**
 * 国家级高新区 / 经开区数据
 * 包含名称、所在省份、所在城市
 */
export interface IndustrialPark {
  name: string
  province: string
  city: string
  type: '高新区' | '经开区'
  level: '国家级'
}

export const INDUSTRIAL_PARKS: IndustrialPark[] = [
  // ===== 华北 =====
  { name: '中关村科技园区', province: '北京', city: '北京', type: '高新区', level: '国家级' },
  { name: '北京经济技术开发区', province: '北京', city: '北京', type: '经开区', level: '国家级' },
  { name: '天津滨海高新技术产业开发区', province: '天津', city: '天津', type: '高新区', level: '国家级' },
  { name: '天津经济技术开发区', province: '天津', city: '天津', type: '经开区', level: '国家级' },
  { name: '石家庄高新技术产业开发区', province: '河北', city: '石家庄', type: '高新区', level: '国家级' },
  { name: '保定高新技术产业开发区', province: '河北', city: '保定', type: '高新区', level: '国家级' },
  { name: '唐山高新技术产业开发区', province: '河北', city: '唐山', type: '高新区', level: '国家级' },
  // ===== 东北 =====
  { name: '沈阳高新技术产业开发区', province: '辽宁', city: '沈阳', type: '高新区', level: '国家级' },
  { name: '大连高新技术产业园区', province: '辽宁', city: '大连', type: '高新区', level: '国家级' },
  { name: '大连经济技术开发区', province: '辽宁', city: '大连', type: '经开区', level: '国家级' },
  { name: '长春高新技术产业开发区', province: '吉林', city: '长春', type: '高新区', level: '国家级' },
  { name: '长春经济技术开发区', province: '吉林', city: '长春', type: '经开区', level: '国家级' },
  { name: '哈尔滨高新技术产业开发区', province: '黑龙江', city: '哈尔滨', type: '高新区', level: '国家级' },
  { name: '大庆高新技术产业开发区', province: '黑龙江', city: '大庆', type: '高新区', level: '国家级' },
  // ===== 华东 =====
  { name: '上海张江高新技术产业开发区', province: '上海', city: '上海', type: '高新区', level: '国家级' },
  { name: '上海漕河泾经济技术开发区', province: '上海', city: '上海', type: '经开区', level: '国家级' },
  { name: '苏州工业园区', province: '江苏', city: '苏州', type: '经开区', level: '国家级' },
  { name: '苏州高新技术产业开发区', province: '江苏', city: '苏州', type: '高新区', level: '国家级' },
  { name: '南京高新技术产业开发区', province: '江苏', city: '南京', type: '高新区', level: '国家级' },
  { name: '无锡高新技术产业开发区', province: '江苏', city: '无锡', type: '高新区', level: '国家级' },
  { name: '常州高新技术产业开发区', province: '江苏', city: '常州', type: '高新区', level: '国家级' },
  { name: '南通经济技术开发区', province: '江苏', city: '南通', type: '经开区', level: '国家级' },
  { name: '杭州高新技术产业开发区', province: '浙江', city: '杭州', type: '高新区', level: '国家级' },
  { name: '宁波高新技术产业开发区', province: '浙江', city: '宁波', type: '高新区', level: '国家级' },
  { name: '宁波经济技术开发区', province: '浙江', city: '宁波', type: '经开区', level: '国家级' },
  { name: '温州高新技术产业开发区', province: '浙江', city: '温州', type: '高新区', level: '国家级' },
  { name: '合肥高新技术产业开发区', province: '安徽', city: '合肥', type: '高新区', level: '国家级' },
  { name: '芜湖经济技术开发区', province: '安徽', city: '芜湖', type: '经开区', level: '国家级' },
  { name: '福州高新技术产业开发区', province: '福建', city: '福州', type: '高新区', level: '国家级' },
  { name: '厦门火炬高技术产业开发区', province: '福建', city: '厦门', type: '高新区', level: '国家级' },
  { name: '南昌高新技术产业开发区', province: '江西', city: '南昌', type: '高新区', level: '国家级' },
  { name: '赣州经济技术开发区', province: '江西', city: '赣州', type: '经开区', level: '国家级' },
  { name: '济南高新技术产业开发区', province: '山东', city: '济南', type: '高新区', level: '国家级' },
  { name: '青岛高新技术产业开发区', province: '山东', city: '青岛', type: '高新区', level: '国家级' },
  { name: '青岛经济技术开发区', province: '山东', city: '青岛', type: '经开区', level: '国家级' },
  { name: '烟台高新技术产业开发区', province: '山东', city: '烟台', type: '高新区', level: '国家级' },
  { name: '潍坊高新技术产业开发区', province: '山东', city: '潍坊', type: '高新区', level: '国家级' },
  // ===== 华中 =====
  { name: '郑州高新技术产业开发区', province: '河南', city: '郑州', type: '高新区', level: '国家级' },
  { name: '洛阳高新技术产业开发区', province: '河南', city: '洛阳', type: '高新区', level: '国家级' },
  { name: '武汉东湖新技术开发区', province: '湖北', city: '武汉', type: '高新区', level: '国家级' },
  { name: '武汉经济技术开发区', province: '湖北', city: '武汉', type: '经开区', level: '国家级' },
  { name: '襄阳高新技术产业开发区', province: '湖北', city: '襄阳', type: '高新区', level: '国家级' },
  { name: '长沙高新技术产业开发区', province: '湖南', city: '长沙', type: '高新区', level: '国家级' },
  { name: '株洲高新技术产业开发区', province: '湖南', city: '株洲', type: '高新区', level: '国家级' },
  { name: '湘潭高新技术产业开发区', province: '湖南', city: '湘潭', type: '高新区', level: '国家级' },
  // ===== 华南 =====
  { name: '广州高新技术产业开发区', province: '广东', city: '广州', type: '高新区', level: '国家级' },
  { name: '广州经济技术开发区', province: '广东', city: '广州', type: '经开区', level: '国家级' },
  { name: '深圳高新技术产业开发区', province: '广东', city: '深圳', type: '高新区', level: '国家级' },
  { name: '珠海高新技术产业开发区', province: '广东', city: '珠海', type: '高新区', level: '国家级' },
  { name: '佛山高新技术产业开发区', province: '广东', city: '佛山', type: '高新区', level: '国家级' },
  { name: '东莞松山湖高新技术产业开发区', province: '广东', city: '东莞', type: '高新区', level: '国家级' },
  { name: '惠州仲恺高新技术产业开发区', province: '广东', city: '惠州', type: '高新区', level: '国家级' },
  { name: '南宁高新技术产业开发区', province: '广西', city: '南宁', type: '高新区', level: '国家级' },
  { name: '柳州高新技术产业开发区', province: '广西', city: '柳州', type: '高新区', level: '国家级' },
  { name: '桂林高新技术产业开发区', province: '广西', city: '桂林', type: '高新区', level: '国家级' },
  { name: '海口高新技术产业开发区', province: '海南', city: '海口', type: '高新区', level: '国家级' },
  // ===== 西南 =====
  { name: '成都高新技术产业开发区', province: '四川', city: '成都', type: '高新区', level: '国家级' },
  { name: '绵阳高新技术产业开发区', province: '四川', city: '绵阳', type: '高新区', level: '国家级' },
  { name: '宜宾临港经济技术开发区', province: '四川', city: '宜宾', type: '经开区', level: '国家级' },
  { name: '重庆高新技术产业开发区', province: '重庆', city: '重庆', type: '高新区', level: '国家级' },
  { name: '重庆经济技术开发区', province: '重庆', city: '重庆', type: '经开区', level: '国家级' },
  { name: '贵阳高新技术产业开发区', province: '贵州', city: '贵阳', type: '高新区', level: '国家级' },
  { name: '昆明高新技术产业开发区', province: '云南', city: '昆明', type: '高新区', level: '国家级' },
  { name: '拉萨高新技术产业开发区', province: '西藏', city: '拉萨', type: '高新区', level: '国家级' },
  // ===== 西北 =====
  { name: '西安高新技术产业开发区', province: '陕西', city: '西安', type: '高新区', level: '国家级' },
  { name: '西安经济技术开发区', province: '陕西', city: '西安', type: '经开区', level: '国家级' },
  { name: '宝鸡高新技术产业开发区', province: '陕西', city: '宝鸡', type: '高新区', level: '国家级' },
  { name: '兰州高新技术产业开发区', province: '甘肃', city: '兰州', type: '高新区', level: '国家级' },
  { name: '金昌经济技术开发区', province: '甘肃', city: '金昌', type: '经开区', level: '国家级' },
  { name: '西宁高新技术产业开发区', province: '青海', city: '西宁', type: '高新区', level: '国家级' },
  { name: '银川高新技术产业开发区', province: '宁夏', city: '银川', type: '高新区', level: '国家级' },
  { name: '银川经济技术开发区', province: '宁夏', city: '银川', type: '经开区', level: '国家级' },
  { name: '乌鲁木齐高新技术产业开发区', province: '新疆', city: '乌鲁木齐', type: '高新区', level: '国家级' },
  { name: '乌鲁木齐经济技术开发区', province: '新疆', city: '乌鲁木齐', type: '经开区', level: '国家级' },
  { name: '昌吉高新技术产业开发区', province: '新疆', city: '昌吉', type: '高新区', level: '国家级' },
]
