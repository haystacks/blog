define(['zepto', 'hammer'], function($, Hammer) {
	let articleEle = $('article'),
		$article = $(articleEle[0]),
		sectionEle = $('section'),
		len = sectionEle.length,
		index = 0,
		prevIndex,
		time = 700,
		deltaY,
		pageHeight = $(document).height(),
		articleHeight = articleEle.height(),
		articleMoveTime = articleHeight / len;

	return {
		panPage: function() {
			// 禁止默认事件
			$(document).on('touchmove', (ev) => {
				ev.preventDefault();
			})
			// 遍历绑定
			$.each(sectionEle, (k, v) => {
				new Hammer(sectionEle[k]).on('panmove', (ev) => {
					if(!this.checkIndex(index, ev.direction)) {
						return;
					}
					// 整体移动
					deltaY = ev.deltaY;
					this.articletranslate();
				}).on('panend', (ev) => {
					if(!this.checkIndex(index, ev.direction)) {
						return;
					}
					switch(ev.direction) {
						case 8:
							index++;
							break;
						case 16:
							index--;
							break;
					}
					deltaY = 0;
					// 整体移动
					$article.hasClass('transtioned')||$article.addClass('transtioned');
					this.articletranslate();
					setTimeout(() => {
						$article.removeClass('transtioned');
					}, time)
				});
			});

		},
		checkIndex: (index, direction) => {
			if(index == 0 && direction == 16) {
				return false;
			} else if(index == len - 1 && direction == 8) {
				return false;
			} else {
				return true;
			}
		},
		articletranslate: () => {
			let y = -articleMoveTime*index+deltaY;
			$article.css('webkitTransform', 'translate3d(0, '+ y +'px, 0)');
			$article.css('transform', 'translate3d(0, '+ y +'px, 0)');
		}
	}

})