/**
 * 更新各省GDP数据为2025年官方数据
 * 自动按比例缩放各产业产值和城市GDP
 */
const fs = require('fs');
const path = require('path');

// 2025年官方GDP数据（单位：亿元）
// 来源：国家统计局及各省2025年统计公报
const NEW_GDP = {
  '北京': 52073.4,
  '天津': 18539.82,
  '河北': 49305.2,
  '山西': 25495.7,
  '内蒙古': 26710.3,
  '辽宁': 33182.9,
  '吉林': 14973.88,
  '黑龙江': 16878.0,
  '上海': 56708.71,
  '江苏': 142351.5,
  '浙江': 94545,
  '安徽': 52989,
  '福建': 60199.45,
  '江西': 36020.0,
  '山东': 103197,
  '河南': 66632.79,
  '湖北': 62660.90,
  '湖南': 55308.65,
  '广东': 145847,
  '广西': 29727.45,
  '海南': 8109,
  '重庆': 33757.93,
  '四川': 67665.34,
  '贵州': 23562.17,
  '云南': 32765.78,
  '西藏': 3031.89,
  '陕西': 36551.1,
  '甘肃': 13697.5,
  '青海': 4121.84,
  '宁夏': 5696,
  '新疆': 21462.14,
};

// 读取旧的GDP数据
function extractOldGdp(content) {
  const oldGdpMap = {};
  const lines = content.split('\n');
  let currentProvince = null;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/province:\s*'([^']+)'/);
    if (m) currentProvince = m[1];
    const g = lines[i].match(/^\s*gdp:\s*([\d.]+),?$/);
    if (g && currentProvince && !oldGdpMap[currentProvince]) {
      oldGdpMap[currentProvince] = parseFloat(g[1]);
    }
  }
  return oldGdpMap;
}

function round(val) {
  return Math.round(val * 100) / 100;
}

// 处理一个文件
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const oldGdpMap = extractOldGdp(content);
  
  for (const [prov, newGdp] of Object.entries(NEW_GDP)) {
    const oldGdp = oldGdpMap[prov];
    if (!oldGdp) {
      console.log(`  ⚠ 未找到 ${prov} 的旧GDP，跳过`);
      continue;
    }
    const factor = newGdp / oldGdp;
    console.log(`  ${prov}: ${oldGdp} → ${newGdp} (比例 ${factor.toFixed(4)})`);
    
    // 找到这个省份的起始位置
    const regex = new RegExp(`province:\\s*'${prov}'`);
    const match = content.match(regex);
    if (!match) continue;
    
    // 找到省份块的范围（从 { 开始）
    const startIdx = content.lastIndexOf('{', match.index);
    if (startIdx === -1) continue;
    
    // 找到该省份块的结束（匹配大括号）
    let depth = 0;
    let endIdx = startIdx;
    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === '{') depth++;
      else if (content[i] === '}') {
        depth--;
        if (depth === 0) { endIdx = i; break; }
      }
    }
    
    const before = content.substring(0, startIdx);
    const block = content.substring(startIdx, endIdx + 1);
    const after = content.substring(endIdx + 1);
    
    // 在block内，替换 province 级别的 gdp
    let newBlock = block.replace(
      /(province:\s*'[^']+'\s*,\s*\n\s*)gdp:\s*[\d.]+/,
      (match, prefix) => `${prefix}gdp: ${newGdp}`
    );
    
    // 替换所有 output: 值（按比例缩放）
    newBlock = newBlock.replace(
      /(output:\s*)([\d.]+)/g,
      (match, prefix, val) => `${prefix}${round(parseFloat(val) * factor)}`
    );
    
    // 替换所有城市级别的 gdp: 值（按比例缩放）
    // 城市级别的 gdp 是在 name: '...' 之后出现的
    newBlock = newBlock.replace(
      /(name:\s*'[^']+'\s*,\s*\n\s*)gdp:\s*([\d.]+)/g,
      (match, prefix, val) => `${prefix}gdp: ${round(parseFloat(val) * factor)}`
    );
    
    content = before + newBlock + after;
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ ${path.basename(filePath)} 已更新`);
}

const dataDir = path.join(__dirname, '..', 'src', 'data');
const files = ['provinces1.ts', 'provinces2.ts', 'provinces3.ts', 'provinces4.ts'];

for (const f of files) {
  console.log(`\n📄 处理 ${f}...`);
  processFile(path.join(dataDir, f));
}

console.log('\n🎉 所有文件已更新完成！');
