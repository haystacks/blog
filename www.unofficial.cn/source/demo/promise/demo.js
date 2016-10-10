var fs = require('fs');

console.log(1);

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

console.log(2);

h().then(function(res) {
	console.log(res.toString());
}).catch(function(err) {
	console.log(err);
})

console.log(3);

function he() {
	return function *hee() {
		return 'generator';
	}
}

var val = he()().next();

console.log(val);
