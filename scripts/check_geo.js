const j = require('./public/china.json');
const names = j.features.map(f => f.properties.name || f.properties.NL_NAME || f.properties.NAME);
names.forEach((n, i) => console.log(i, JSON.stringify(n)));
