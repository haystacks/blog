var Impact = (function() {
    // 碰撞检测
    function Impact() {
        // tank and map
        // tank and tank
        var args = [].slice.call(arguments);
        this.map = args[0];
        // 已经检查过的对象
        this.checkedObj = args[1];
    }

    /**
     * 边界碰撞
     * @return boolean
     * */
    function border(e, allObj) {

        // 是否和地图边缘碰撞
        if(e.data.src.x >= 0 && e.data.src.x + e.size.width <= this.map.mapEle.clientWidth && e.data.src.y >= 0 && e.data.src.y + e.size.height <= this.map.mapEle.clientHeight) {
            // return this.tank2obj(e, allObj);
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
        this.checkedObj.push(e);
        for (var key in allObj) {
            if (allObj[key]['roleName'] == 'hero' || allObj[key]['roleName'] == 'npc' && e.id != allObj[key]['id']) {
                if(Math.abs(e.data.src.x - allObj[key]['data']['src']['x']) < e.size.width && Math.abs(e.data.src.y - allObj[key]['data']['src']['y']) < e.size.height) {
                    return true;
                } else {
                    return false;
                }
                
            }
        }
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