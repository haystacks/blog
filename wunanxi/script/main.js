'use strict';

// config

require.config({
	baseUrl: 'script/lib',
	paths: {
		'app': '../app',
		'hammer': 'hammer.min',
		'zepto': 'zepto.min'
	},
	shim: {
		'hammer': {
			exports: 'Hammer'
		},
		'zepto': {
			exports: '$'
		}
	}
});

// require the lib and app
require(['app/test', 'app/music'], function (test, music) {
	// page trans
	test.panPage();
});