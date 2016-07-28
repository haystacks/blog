/** 
 * @desc    坦克
 * @author  unofficial
 * @param   hero;   英雄
 * @param   npc;    行尸
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

            // 控制移动
            this.data = {
                direction: direction[0],
                speed: 5,
                src: {
                    x: x,
                    y: y
                }
            };

        } else if(this.roleName === 'npc') {
            // npc坦克随机位置
            var x = 10;
            var y = 400;
            this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';

            // 控制移动
            this.data = {
                direction: direction[0],
                speed: 5,
                src: {
                    x: x,
                    y: y
                }
            };

            // 自由移动
            this.move();

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
        var y = this.data.src.y;
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
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
        var x = this.data.src.x;
        var y = this.data.src.y;
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        this.tanker.style.transition = 'transform 2.s';
    }

    // 自由移动操作
    // 从A移动到B
    // tanker direction up
    // eg: 50, 50 -> 10, 10
    // up: 50 -> 10, left: 50 -> 10
    // test
    function move() {
        var src = this.data.src;
        this.data.src = {
            x: src.x,
            y: src.y - 1
        }
        switch(this.data.direction) {
            case 'up':
                this.moveUp();
            case 'right':
                this.moveRight();
            case 'down':
                this.moveDown();
            case 'left':
                this.moveLeft();
        }

        if(this.moveId === 200) {
            cancelAnimationFrame(this.moveId);
        } else {
            this.moveId = requestAnimationFrame(this.move.bind(this));
        }

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