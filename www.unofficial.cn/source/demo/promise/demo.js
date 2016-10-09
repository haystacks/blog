var fs = require('fs');

function h() {
	return new Promise(function(resolve, reject) {
		fs.readFile(__dirname+'\\a.txt', function(err, res) {
			if(!err) {
				resolve(res);
			} else {
				reject(err);
			}
		})
	})
}

h().then(function(res) {
	console.log(res.toString());
}).catch(function(err) {
	console.log(err);
})