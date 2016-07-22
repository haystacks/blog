'use strict';

define(['zepto', 'hammer', 'map'], function ($, Hammer, Map) {
	console.log('map init');
	var mapEle = $('#map'),
	    mapContainerEle = $('#mapContainer'),
	    point = mapEle.data('point'),
	    pointArr = point.split(','),
	    isShow = false,
	    mapInit = void 0;

	// 绑定事件
	new Hammer(mapEle[0]).on('tap', function () {
		if (isShow) {
			isShow = false;
			mapContainerEle.css('display', 'none');
		} else {
			if (!mapInit) {
				var map = new BMap.Map("mapContainer"); // 创建地图实例 
				var _point = new BMap.Point(pointArr[0], pointArr[1]); // 创建点坐标 
				map.centerAndZoom(_point, 15); // 初始化地图，设置中心点坐标和地图级别 
				mapInit = true;
			} else {
				mapContainerEle.css('display', 'block');
			}
			isShow = true;
		}
	});
});