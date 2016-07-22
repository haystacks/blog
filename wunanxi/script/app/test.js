'use strict';

define(['zepto', 'hammer'], function ($, Hammer) {
	var articleEle = $('article'),
	    $article = $(articleEle[0]),
	    sectionEle = $('section'),
	    len = sectionEle.length,
	    index = 0,
	    prevIndex = void 0,
	    time = 700,
	    deltaY = void 0,
	    pageHeight = $(document).height(),
	    articleHeight = articleEle.height(),
	    articleMoveTime = articleHeight / len;

	return {
		panPage: function panPage() {
			var _this = this;

			// 禁止默认事件
			$(document).on('touchmove', function (ev) {
				ev.preventDefault();
			});
			// 遍历绑定
			$.each(sectionEle, function (k, v) {
				new Hammer(sectionEle[k]).on('panmove', function (ev) {
					if (!_this.checkIndex(index, ev.direction)) {
						return;
					}
					// 整体移动
					deltaY = ev.deltaY;
					_this.articletranslate();
				}).on('panend', function (ev) {
					if (!_this.checkIndex(index, ev.direction)) {
						return;
					}
					switch (ev.direction) {
						case 8:
							index++;
							break;
						case 16:
							index--;
							break;
					}
					deltaY = 0;
					// 整体移动
					$article.hasClass('transtioned') || $article.addClass('transtioned');
					_this.articletranslate();
					setTimeout(function () {
						$article.removeClass('transtioned');
					}, time);
				});
			});
		},
		checkIndex: function checkIndex(index, direction) {
			if (index == 0 && direction == 16) {
				return false;
			} else if (index == len - 1 && direction == 8) {
				return false;
			} else {
				return true;
			}
		},
		articletranslate: function articletranslate() {
			var y = -articleMoveTime * index + deltaY;
			$article.css('webkitTransform', 'translate3d(0, ' + y + 'px, 0)');
			$article.css('transform', 'translate3d(0, ' + y + 'px, 0)');
		}
	};
});