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
    }

    // 画坦克
    function draw() {
        var divEle = document.createElement('div');
        divEle.className = 'tank ' + this.roleName;
        map.mapEle.appendChild(divEle);
    }


    Tank.prototype = {
        draw: draw
    }

    return Tank;
})()