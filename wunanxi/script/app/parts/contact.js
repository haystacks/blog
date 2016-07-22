define(['zepto', 'hammer'], function($, Hammer) {
	console.log('contact init');
	let contactEle = $('#contact'),
		contactContainerEle = $('#contactContainer'),
		isShow = false;
	new Hammer(contactEle[0]).on('tap', () => {
		if(isShow) {
			contactContainerEle.css('display', 'none');
			isShow = false;
		} else {
			contactContainerEle.css('display', 'block');
			isShow = true;
		}
	})
})