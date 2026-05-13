import { provinceData } from '../src/data/index';
console.log('Province names:');
provinceData.forEach(p => console.log('  "' + p.province + '"'));
console.log('Total:', provinceData.length);
