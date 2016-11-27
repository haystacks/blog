window.onload = function() {
	var fanyi = document.getElementById('fanyi');
	var result = document.getElementById('result');
	var xhr = new XMLHttpRequest();
	var handleStateChange = function(e) {
		// JSON.parse(data).trans_result.data[0].dst
		if(xhr.readyState == 4) {
			result.innerText = JSON.parse(xhr.responseText).trans_result.data[0].dst;
		}
	}
	fanyi.addEventListener('click', function(e) {
		var query = document.getElementById('query').value;
		var url = "http://fanyi.baidu.com/v2transapi?from=zh&to=en&query="+ query +"&trantype=realtime&simple_means_flag=3";
		// xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
		// xhr.open("POST", url, true);
		// xhr.send();
		fetch(url).then(function(response) {
			return response.json();
		}).then(function(res) {
			result.innerText = res.trans_result.data[0].dst;
		})
	})

	document.addEventListener('select', function(e) {
		console.log(e);
	})
}