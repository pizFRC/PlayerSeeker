$(document).ready(function() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città',
		types: 'place'
	});
	addressGeocoder.addTo("#address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
	});
});