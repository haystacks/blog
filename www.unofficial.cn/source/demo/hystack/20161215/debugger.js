(function() {
    (function a() {
		try {
            (function b(i) {
				if (('' + (i / i)).length !== 1 || i % 20 === 0) {
                    (function() {}).constructor('debugger')();
				} else {
					debugger;
				}
				b(++i);
			})(0);
		} catch(e) {
			setTimeout(a, 5000);
		}
	})()
})();