// 主函数
// 生成地图
// 坦克
var Main = (function () {
	function Main() {
		this.level = 1;
        // 获得数据信息
        this.dataInfo = data();
        this.allObj = [];
		this.checkedObj = []; // 已经检查的对象
		this.timeshow = 0;
	};
	// 初始化
	Main.prototype.init = function() {
		// 初始化地图
        this.map = new Map();
        this.impact = new Impact(this.map, this.checkedObj);

        // 主角闪现
        var hero = new Tank('hero', this);
		
		document.addEventListener("keydown", function(e) {
			// console.log(new Date().getTime() - this.timeshow);
			console.log(e);
			switch(e.keyCode) {
				case 87:
					hero.moveUp();
					break;
				case 38:
					hero.moveUp();
					break;
				case 68:
					hero.moveRight();
					break;
				case 39:
					hero.moveRight();
					break;
				case 83:
					hero.moveDown();
					break;
				case 40:
					hero.moveDown();
					break;
				case 65:
					hero.moveLeft();
					break;
				case 37:
					hero.moveLeft();
					break;
				case 74:
					hero.fire();
					break;
				case 32:
					hero.fire();
					break;
			}
			this.timeshow = new Date().getTime();
		})

        this.allObj.push(hero);
        // 初始创建
        this.createNpc();
	}
	// 创建NPC
	Main.prototype.createNpc = function() {
		// 按照关卡生成坦克
        for (var i = 0; i < this.dataInfo.level[this.level - 1]['npc']; i++) {
        	var npc = new Tank('npc', this);
			npc.id = i;
        	this.allObj.push(npc);
        };
	}

	return Main;
})()