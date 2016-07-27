/** 
 * @desc    坦克
 * @author  unofficial
 * @param   hero;   英雄
 * @param   NPC;    行尸
 */
var Tank = (function() {

    function Tank() {
        var args = [].slice.call(arguments);
        // tank的属性
        this.roleName = args[0];

        this.draw();

        // hero
        if(this.roleName === 'hero') {
            // 英雄坦克固定位置，正向居中在地图上，等待命令
            var x = (map.mapEle.clientWidth - this.tanker.clientWidth) / 2 + 'px';
            var y = (map.mapEle.clientHeight - this.tanker.clientHeight) / 2 + 'px';
            this.tanker.style.transform = 'translate3d('+ x + ',' + y + ', 0)';

            // 控制移动

        } else if(this.roleName === 'NPC') {
            // NPC坦克随机位置

            // 自由移动

        }
    }

    // 往地图中画坦克
    function draw() {
        var divEle = document.createElement('div');
        divEle.className = 'tank ' + this.roleName;
        map.mapEle.appendChild(divEle);
        this.tanker = divEle;
    }

    // 上移动
    function moveLeft() {

    }

    // 下移动
    function moveLeft() {

    }

    // 左移动
    function moveLeft() {

    }

    // 右移动
    function moveLeft() {

    }


    Tank.prototype = {
        draw: draw
    }

    return Tank;
})()