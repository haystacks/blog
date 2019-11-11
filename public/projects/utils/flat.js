// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// 数组扁平化
function flat(arr) {
    return []
        .concat
        .apply(this, arr);
}
