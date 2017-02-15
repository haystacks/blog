/** 
 * 处理作战包文件
 * 1. excel -> html(手动)
 * 2. html -> 规范html(自动)
 */
const fs = require('fs');
const html = fs.readFileSync('./sheet001.htm').toString();

let table = html.match(/<table[^]*table>/)[0];

/** 
 * 过滤style
 * /\<\!\[.*]>/
 */
fs.writeFileSync('a.txt', table);
table = table.replace(/\s*<\!\[.*\]>\s*|\s*style='[\w:\.;-]*(\r\n\s*)?[\w:\.;-]*'\s*|\s*width=\d*\s*|\sheight=\S*\s*|\s*class=xl\d*/g, '');
fs.writeFileSync('b.txt', table);
console.log(table);
