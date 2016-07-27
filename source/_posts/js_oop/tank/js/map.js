/**
 * @desc    地图
 * @author  unofficial
 * @param   width: 500;     宽度
 * @param   height: 500;    高度
 * @param   isAuto: 1/<0>;  是否自动画地图
 * @param   mapName: map;   地图选择器名称
 * @func    draw;           画地图方法
 */

var Map = (function() {
    function Map() {
        var args = [].slice.call(arguments);
        
        // 如果不存在参数，使用默认值
        !args[0] && args.push('map');
        !args[1] && args.push(500);
        !args[2] && args.push(500);
        !args[3] && args.push('#ccc');
        args[4] === undefined && args.push(1);

        // 初始化地图大小
        this.mapName = args[0];
        this.width = args[1];
        this.height = args[2];
        this.backgroundColor = args[3];

        // 默认为1
        args[4] && this.draw();
    }

    // 创建地图
    function draw() {
        // 选择地图
        var mapEle = document.getElementById(this.mapName);
        
        // 判断地图元素是否存在
        if(mapEle) {
            mapEle.style.width = this.width + 'px';
            mapEle.style.height = this.height + 'px';
            mapEle.style.backgroundColor = this.backgroundColor;

            this.mapEle = mapEle;
        } else {
            console.log('输入地图容器ID选择器名称');
        }
    }

    Map.prototype = (function() {
        return {
            draw: draw
        };
    })()
    
    return Map;
})();

// mapName, width, height, backgroundColor, isAuto
// new Map('map', 600, 500, '#ccc', 1);
new Map();