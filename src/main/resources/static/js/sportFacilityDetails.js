$(document).ready(function() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [16.248828, 39.3301343],
		zoom: 14
	});
	const marker = new mapboxgl.Marker({
		color: "#C30000",
		draggable: false
	}).setLngLat([16.248828, 39.3301343])
		.addTo(map);	
});