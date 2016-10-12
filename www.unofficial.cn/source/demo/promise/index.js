var fs = require('fs');

// 遍历目录
var path = __dirname;
function readFile() {
	return new Promise(function(resolve, reject) {
		fs.readFile(path + '/list.txt', function(err, res) {
			if(!err) {
				resolve(res);
			} else {
				reject(err);
			}
		})
	})
}

function writeFile(r) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(path + '/a.md', "["+r+"](http://blog.unofficial.cn/DemoHouse/"+r+"/index.html)\r\n" , {"flag": "a+"}, function(err) {
			if(err) {
				throw err;
			}
		})
	})
}

readFile().then(function(res) {
	for(r of res.toString().split('\r\n')) {
		writeFile(r);
	}
}).catch(function(err) {
	console.log(err);
})
