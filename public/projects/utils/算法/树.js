// mock data
const menus = [
    {
        id: 1,
        pid: null,
        name: '一级菜单'
    },
    {
        id: 2,
        pid: null,
        name: '一级菜单'
    },
    {
        id: 3,
        pid: null,
        name: '一级菜单'
    },
    {
        id: 4,
        pid: null,
        name: '一级菜单'
    },
    {
        id: 11,
        pid: 1,
        name: '二级菜单'
    },
    {
        id: 12,
        pid: 1,
        name: '二级菜单'
    },
    {
        id: 13,
        pid: 1,
        name: '二级菜单'
    },
    {
        id: 131,
        pid: 13,
        name: '三级菜单'
    },
    {
        id: 132,
        pid: 13,
        name: '三级菜单'
    },
    {
        id: 1321,
        pid: 132,
        name: '四级菜单'
    },
    {
        id: 21,
        pid: 2,
        name: '二级菜单'
    }
];

/**
 * 无限极分类菜单生成树
 * @param data 数据
 * @param children 子数组名
 * @param id 主键名
 * @param level 是否添加层级名
 * @param levelVal 第一层层级数
 * @param needLevel 是否需要添加层级
 * @param pid 父主键名
 * @param pidVal 第一层父主键值
 */

function toTree(data, options = {}) {
    const defaultOptions = {
        children: 'children',
        id: 'id',
        level: 'level',
        levelVal: 1,
        needLevel: true,
        pid: 'pid',
        pidVal: null
    };
    const { levelVal, pidVal, id, pid, children, level, needLevel } = Object.assign(defaultOptions, options);

    function addLevelCheck(item, data, id, pid, level, pidVal, levelVal) {
        if (item[pid] === pidVal) {
            item[level] = levelVal;
            addLevel(data, id, pid, level, item[id], ++levelVal);
        }
    }

    function addLevel(data, id, pid, level, pidVal, levelVal) {
        data.forEach(item => {
            addLevelCheck(item, data, id, pid, level, pidVal, levelVal);
        })
    }
    // make map
    let map = {};
    data.forEach(item => {
        map[item[id]] = item;
        if (needLevel) {
            addLevelCheck(item, data, id, pid, level, pidVal, levelVal);
        }
    });
    console.log(JSON.stringify(map));

    const arr = [];
    data.forEach((item, index) => {
        const parent = map[item[pid]];
        if (parent) {
            (parent[children] || (parent[children] = [])).push(item);
        } else {
            arr.push(item);
        }
    })
    return arr;
}

const tree = toTree(menus);
console.log(JSON.stringify(tree));


// 讲解

// 1. 值引用的应用原理
// 2. 深拷贝 浅拷贝 https://github.com/wengjq/Blog/issues/3
//      3. 数据结构 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures

/**
 * Boolean 布尔类型 表示一个逻辑实体 true / false
 * Null Null类型 null
 * Undefined 表示一个没有被赋值的变量会有一个默认值 undefined
 * String 字符
 * Number 数字 Number.MAX_VALUE MIN_VALUE MAX_SAFA_INTEGER MIN_SAFE_INTEGER isSafeInteger() Infinity NaN
 * Symbol（ES6）
 */

/**
 * Object
 *      Object
 *      Array
 */
