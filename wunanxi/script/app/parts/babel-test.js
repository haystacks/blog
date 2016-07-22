class Music {
	constructor() {
		this.x = 123;
	}
	/**
	 * 初始化music
	 * @return {[type]} [description]
	 */
	init() {
		console.log('music init', this, this.x);
	}
	/**
	 * 手机需要触摸触发播放音乐
	 * @return {Boolean} [description]
	 */
	isMobile() {
		let ua  = window.navigator.userAgent.toLocaleLowerCase();
		let matchedRE = /iphone|android|symbianos|windows\sphone/g;
		return matchedRE.test(ua);
	}
	/**
	 * 播放音乐
	 * @return {[type]} [description]
	 */
	play() {

	}
	/**
	 * 暂停播放音乐
	 * @return {[type]} [description]
	 */
	pause() {

	}
}

let music = new Music();
music.init();