/** 
 * @desc    坦克
 * @author  unofficial
 * @param   hero;   英雄
 * @param   NPC;    行尸
 */
var Tank = (function() {

    // 方向
    var direction = ['up', 'right', 'down', 'left'];

    function Tank() {
        var args = [].slice.call(arguments);
        // tank的属性
        this.roleName = args[0];

        this.draw();

        // hero
        if(this.roleName === 'hero') {
            // 英雄坦克固定位置，正向居中在地图上，等待命令
            var x = (map.mapEle.clientWidth - this.tanker.clientWidth) / 2;
            var y = (map.mapEle.clientHeight - this.tanker.clientHeight) / 2;
            this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';

            var self = this;
            // 控制移动
            setTimeout(function() {
                self.data = {
                    direction: direction[0],
                    src: {
                        x: x,
                        y: y
                    },
                    dest: {
                        x: 10,
                        y: 10
                    }
                };

                self.move();

            }, 3000);
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
    function moveUp() {
        // 保持原来的X方向不变，Y方向正向移动
        var x = this.data.src.x;
        var y = this.data.dest.y;
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        this.tanker.style.transition = 'transform 2.s';
        this.data.src.y = y;
    }
    

    // 右移动
    function moveRight() {

    }

    // 下移动
    function moveDown() {

    }

    // 左移动
    function moveLeft() {
        var x = this.data.dest.x;
        var y = this.data.dest.y;
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        this.tanker.style.transition = 'transform 2.s';
    }

    // 移动操作
    // 从A移动到B
    // tanker direction up
    // eg: 50, 50 -> 10, 10
    // up: 50 -> 10, left: 50 -> 10
    // test
    function move() {
        this.moveUp();
        this.moveLeft();
    }


    Tank.prototype = {
        draw: draw,
        move: move,
        moveUp: moveUp,
        moveRight: moveRight,
        moveDown: moveDown,
        moveLeft: moveLeft
    }

    return Tank;
})()