var Impact = (function() {
    // 碰撞检测
    function Impact() {
        // tank and map
        // tank and tank
        this.map = [].slice.call(arguments)[0];
    }

    /**
     * 边界碰撞
     * @return boolean
     * */
    function border(e, allObj) {
        
        // 是否和地图边缘碰撞
        // debugger;
        if(e.data.src.x > 0 && e.data.src.x + e.size.width < this.map.mapEle.clientWidth && e.data.src.y > 0 && e.data.src.y + e.size.height < this.map.mapEle.clientHeight) {
            this.tank2obj(e, allObj);
            return false;
        } else {
            return true;
        }
        
    }

    /**
     * 坦克对其它对象
     * 其它对象可能是坦克，也可能是子弹
     * @tank    hero/npc
     */
    function tank2obj(e, allObj) {
        // console.log(e.name);
    }

    function fire() {

    }

    Impact.prototype = {
        border: border,
        tank2obj: tank2obj,
        fire: fire
    }

    return Impact;
})();