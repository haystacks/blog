// 全局数据
// tank数据
var data = function() {
    var tankInfo = {
        'hero': [
            {
                'position1': {
                    'up': '0 0',
                    'right': '-896px 0',
                    'down': '-1920px 0',
                    'left': '-2688px 0'
                },
                'position2': {
                    'up': '-448px 0',
                    'right': '-1344px 0',
                    'down': '-2368px 0',
                    'left': '-3136px 0'
                }
            }
        ],
        'npc': [
            {
                'position1': {
                    'up': '-128px 0',
                    'right': '-1024px 0',
                    'down': '-2048px 0',
                    'left': '-2816px 0'
                },
                'position2': {
                    'up': '-576px 0',
                    'right': '-1472px 0',
                    'down': '-2496px 0',
                    'left': '-3264px 0'
                }
            },
            {
                'position1': {
                    'up': '0 0',
                    'right': '-896px 0',
                    'down': '-1920px 0',
                    'left': '-2688px 0'
                },
                'position2': {
                    'up': '-448px 0',
                    'right': '-1344px 0',
                    'down': '-2368px 0',
                    'left': '-3136px 0'
                }
            },
        ]
    };

    // level 1 -> 2npc etc.
    var level = [
        {npc: 4, speed: 1, bulletSpeed: 3}
    ];
    
    return {
        tankInfo: tankInfo,
        level: level
    }
}