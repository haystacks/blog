define(['zepto', 'hammer'], function($, Hammer) {

	class Music {
		constructor() {
			this.audio = $('#audio')[0];
			this.audioSpan = $('#audio').parent()[0];
			this.isAutoPlay = false;
			this.mobileTouchIndex = true;
		}
		/**
		 * 初始化music
		 * @return {[type]} [description]
		 */
		init() {
			console.log('music init', this.isMobile());
			// 如果是移动设备，触摸播放
			!this.isMobile || this.touchPlay();
			// 是否有自动播放标签？
			if(!this.isMobile && this.audio.hasAttr('autoplay')) {
				this.isAutoPlay = true;
			}
			// audioSpan 绑定事件触发播放音乐
			new Hammer(this.audioSpan).on('tap', () => {
				if(this.isAutoPlay) {
					this.pause();
					// 移除旋转和切换样式
					$(this.audioSpan).removeClass('audiorotate');
					$(this.audioSpan).addClass('audioclose');
				} else {
					this.play();
					// 移除旋转和切换样式
					$(this.audioSpan).removeClass('audioclose');
					$(this.audioSpan).addClass('audiorotate');
				}
			})
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
			console.log('play');
			this.audio.play();
			this.isAutoPlay = true;
			this.mobileTouchIndex || $(document).off('touchstart');
		}

		touchPlay() {
			console.log('touch play');
			// 禁止默认事件
			this.mobileTouchIndex = false;
			$(document).on('touchstart', () => {
				this.play();
				this.isAutoPlay = true;
			});
		}
		/**
		 * 暂停播放音乐
		 * @return {[type]} [description]
		 */
		pause() {
			console.log('pause');
			this.isAutoPlay = false;
			this.audio.pause();
		}
	}

	let music = new Music();
	music.init();
	return music;
})