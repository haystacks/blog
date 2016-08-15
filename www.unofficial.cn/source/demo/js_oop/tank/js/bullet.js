var Bullet = (function() {
    function Bullet() {
        this.data = {
            src: []
        }
        this.size = {
            width: 8,
            height: 8
        }
        this.roleName = 'bullet';
        var args = [].slice.call(arguments);
        this.direction = args[0];
        this.speed = args[1] * 5;
        this.data.src = args[2];
        this.tankSize = args[3];
        this.map = args[4];
        this.checkedObj = []; // 暂时没使用 无意义
        this.allObj = []; // 无意义
        this.impact = new Impact(this.map, this.checkedObj);
        this.create();
        this.status;
    }

    // 创建子弹
    function create() {
        var divEle = document.createElement('div');
        divEle.className = 'bullet';
        this.map.mapEle.appendChild(divEle);
        this.bulletEle = divEle;
        this.status = true;
        
        // 设置坦克子弹的初始位置
        switch(this.direction) {
            case 'up':
                this.bulletEle.style.backgroundPosition = '0 0';
                this.data.src.x += (this.tankSize.width - this.size.width) / 2;
                this.data.src.y -= this.size.height;
                break;
            case 'right':
                this.bulletEle.style.backgroundPosition = -this.size.width + 'px 0';
                this.data.src.x += this.tankSize.width;
                this.data.src.y += (this.tankSize.height - this.size.height) / 2;
                break;
            case 'down':
                this.bulletEle.style.backgroundPosition = -2 * this.size.width + 'px 0';
                this.data.src.x += (this.tankSize.width - this.size.width) / 2;
                this.data.src.y += this.tankSize.height;
                break;
            case 'left':
                this.bulletEle.style.backgroundPosition = -3 * this.size.width + 'px 0';
                this.data.src.x -= this.size.width;
                this.data.src.y += (this.tankSize.width - this.size.height) / 2;
                break;
        }
        
        this.bulletEle.style.transform = 'translate3d('+ this.data.src.x + 'px,' + this.data.src.y + 'px, 0)';
    }

    // 子弹移动
    function move() {
        var src = this.data.src;
        var x = src.x, y = src.y;
        // 沿着坦克移动方向继续移动，速度默认为坦克速度的5倍
        // 根据方向判断移动位置
        switch(this.direction) {
            case 'up':
                y -= this.speed;
                break;
            case 'right':
                x += this.speed;
                break;
            case 'down':
                y += this.speed;
                break;
            case 'left':
                x -= this.speed;
                break;
        }

        this.data.src = {
            x: x,
            y: y
        }
        this.bulletEle.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';

        // 碰撞检测
        // console.log(this.data.src.x >= 0 && this.data.src.x + this.size.width <= this.map.mapEle.clientWidth && this.data.src.y >= 0 && this.data.src.y + e.size.height <= this.map.mapEle.clientHeight);
        // console.log(this.impact.border(this, this.allObj));
        if(this.impact.border(this, this.allObj)) {
            this.destroy();
        }
    }

    // 碰撞销毁
    // 子弹销毁
    function destroy() {
        this.map.mapEle.removeChild(this.bulletEle);
        this.status = false;
    }

    Bullet.prototype = {
        create: create,
        move: move,
        destroy: destroy
    }

    return Bullet;
})()