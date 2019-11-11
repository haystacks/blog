/*\
|*|
|*| parse string to json by symbol
|*|
\*/

export default function stringify(json, symbol) {
    const keys = Object.keys(json);
    let arr = [];
    keys.map(key => {
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`);
    })
    let str = arr.join(symbol);
    return str;
}

export function queryi(json) {
    return stringify(json, '&');
}

export function cookiei(json) {
    let expires;
    if (json.hasOwnProperty('expires')) {
        expires = json.expires;
        Reflect.deleteProperty(json, 'expires');
    }
    return expires ? `expires=${expires}; ${stringify(json, '; ')}` : stringify(json, '; ');
}