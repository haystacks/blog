// 主函数
// 生成地图
// 坦克
var Main = (function () {
	function Main() {
		this.level = 1;
        // 获得数据信息
        this.dataInfo = data();
        this.allObj = [];
	};
	// 初始化
	Main.prototype.init = function() {
		// 初始化地图
        this.map = new Map();
        this.impact = new Impact(this.map);

        // 主角闪现
        var hero = new Tank('hero', this);
        this.allObj.push(hero);
        // 初始创建
        this.createNpc();
	}
	// 创建NPC
	Main.prototype.createNpc = function() {
		// 按照关卡生成坦克
        for (var i = 0; i < this.dataInfo.level[this.level - 1]['npc']; i++) {
        	var npc = new Tank('npc', this);
			npc.name = 'npc'+i;
        	this.allObj.push(npc);
        };
	}

	return Main;
})()