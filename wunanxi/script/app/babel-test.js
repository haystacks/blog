'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Music = function () {
	function Music() {
		_classCallCheck(this, Music);

		this.x = 123;
	}
	/**
  * 初始化music
  * @return {[type]} [description]
  */


	_createClass(Music, [{
		key: 'init',
		value: function init() {
			console.log('music init', this, this.x);
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
		value: function play() {}
		/**
   * 暂停播放音乐
   * @return {[type]} [description]
   */

	}, {
		key: 'pause',
		value: function pause() {}
	}]);

	return Music;
}();

var music = new Music();
music.init();