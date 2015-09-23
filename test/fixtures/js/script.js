(function () {

	function require(name) {
		// Some codes
	}

	var img = new Image();
	img.src = 'img/avatar4.jpg';
	img.width = img.height = 200;
	document.body.appendChild(img);

	require('./inner.js');

})();
