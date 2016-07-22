'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['zepto', 'hammer'], function ($, Hammer) {
	var Music = function () {
		function Music() {
			_classCallCheck(this, Music);

			this.audio = $('#audio')[0];
			this.audioSpan = $('#audio').parent()[0];
			this.isAutoPlay = false;
			this.mobileTouchIndex = true;
		}
		/**
   * 初始化music
   * @return {[type]} [description]
   */


		_createClass(Music, [{
			key: 'init',
			value: function init() {
				var _this = this;

				console.log('music init', this.isMobile());
				// 如果是移动设备，触摸播放
				!this.isMobile || this.touchPlay();
				// 是否有自动播放标签？
				if (!this.isMobile && this.audio.hasAttr('autoplay')) {
					this.isAutoPlay = true;
				}
				// audioSpan 绑定事件触发播放音乐
				new Hammer(this.audioSpan).on('tap', function () {
					if (_this.isAutoPlay) {
						_this.pause();
						// 移除旋转和切换样式
						$(_this.audioSpan).removeClass('audiorotate');
						$(_this.audioSpan).addClass('audioclose');
					} else {
						_this.play();
						// 移除旋转和切换样式
						$(_this.audioSpan).removeClass('audioclose');
						$(_this.audioSpan).addClass('audiorotate');
					}
				});
			}
			/**
    * 手机需要触摸触发播放音乐
    * @return {Boolean} [description]
    */

		}, {
			key: 'isMobile',
			value: function isMobile() {
				var ua = window.navigator.userAgent.toLocaleLowerCase();
				var matchedRE = /iphone|android|symbianos|windows\sphone/g;
				return matchedRE.test(ua);
			}
			/**
    * 播放音乐
    * @return {[type]} [description]
    */

		}, {
			key: 'play',
			value: function play() {
				console.log('play');
				this.audio.play();
				this.isAutoPlay = true;
				this.mobileTouchIndex || $(document).off('touchstart');
			}
		}, {
			key: 'touchPlay',
			value: function touchPlay() {
				var _this2 = this;

				console.log('touch play');
				// 禁止默认事件
				this.mobileTouchIndex = false;
				$(document).on('touchstart', function () {
					_this2.play();
					_this2.isAutoPlay = true;
				});
			}
			/**
    * 暂停播放音乐
    * @return {[type]} [description]
    */

		}, {
			key: 'pause',
			value: function pause() {
				console.log('pause');
				this.isAutoPlay = false;
				this.audio.pause();
			}
		}]);

		return Music;
	}();

	var music = new Music();
	music.init();
	return music;
});