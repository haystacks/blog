/*\
|*|
|*| parse string to json by symbol
|*|
\*/
export default function parse(str, symbol) {
    const items = str.split(symbol);
    let obj = {};
    items.map(item => {
        const [k, v = ''] = item.split(/=/);
        obj[decodeURIComponent(k)] = decodeURIComponent(v);
    })
    return obj;
}

export function iquery(str) {
    if (!/&/.test(str) && /%26/.test(str)) {
        str = decodeURIComponent(str);
    }
    return parse(str, '&');
}

export function icookie(str) {
    return parse(str, '; ');
}