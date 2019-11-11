let arr = [];

// 属性
// Array.length;
// Array.prototype;
// Object.getOwnPropertyDescriptor(Array, 'prototype'); // configurable: false, enumerable: false, writable: false


// 方法 ESX？
// 会改变自身
// > arr.copyWithin(target[, start[, end]])
{
    let arr = [9, 8 ,7 ,6, 5, 4, 3, 2, 1];
    let res = arr.copyWithin(2, 7, 10);
    console.log('=>>>', res, arr, res === arr);
}

// 不会改变自身