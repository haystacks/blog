'use strict';

let	request = require('./request');
let	say = (query) => {
	return request(query).then((data) => {
		return data;
	})
}
module.exports = say;