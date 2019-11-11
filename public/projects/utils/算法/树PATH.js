let arr0 = [
    {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    {
                        value: 3
                    },
                    {
                        value: 4
                    }
                ]
            },
            {
                value: 5
            },
            {
                value: 6,
                children: [
                    {
                        value: 7
                    },
                    {
                        value: 8
                    }
                ]
            }
        ]
    },
    {
        value: 9,
        children: [
            {
                value: 10
            },
            {
                value: 11
            }
        ]
    },
    {
        value: 12
    }
];

function makeMap(data) {
    let map = {};
    (function fromTree(data, i = '') {
        data.forEach(item => {
            const key = i ? `${i}-${item.value}` : `${item.value}`;
            if (item.children && item.children.length) {
                fromTree(item.children, key);
            } else {
                map[key] = item;
            }
        })
    })(data)
    return map;
}

function getRes(data, v) {
    const map = makeMap(data);
    const arr = Object.keys(map);
    const reg = new RegExp(`-${v}$`);
    for(let i = 0, len = arr.length; i < len; i++) {
        if (reg.test(arr[i])) {
            return arr[i].split('-');
        }
    }
}
console.log(getRes(arr0, 7), getRes(arr0, 10));