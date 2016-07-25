'use strict';
let	http = require('http'),
	qs = require('querystring');

let resetData = (query, reject) => {
	// param
	let queryData = {
		'from': 'zh',
		'to': 'en',
		'transtype': 'realtime',
		'simple_means_flag': '3',
	};
	query || reject('query is ' + query);
	queryData.query = query;
	let	data = qs.stringify(queryData);	
	let	options = {
		host: 'fanyi.baidu.com',
		path: '/v2transapi',
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Content-Length': data.length
		}
	}
	return [data, options];
}
let runAsync = (query) => {
	return new Promise((resolve, reject) => {
		
		let resetRs = resetData.call(this, query, reject);
		let data = resetRs[0];
		let options = resetRs[1];
		let req = http.request(options, (res) => {

			let chunks = '';
			res.statusCode == 200 || reject(res.statusCode);
			res.on('data', (chunk) => {
				chunks += chunk;
			})
			res.on('error', (error) => {
				reject(error);
			})
			res.on('end', () => {
				resolve(JSON.parse(chunks).trans_result.data[0].dst);
			})

		});
		req.on('error', (error) => {
			reject(error);
		});
		req.write(data);
		req.end();
	})
}
module.exports = (query) => {
	return	runAsync(query)
			.then((res) => {
				return res;
			})
			.catch((data) => {
				console.log('reject', data);
			})
}