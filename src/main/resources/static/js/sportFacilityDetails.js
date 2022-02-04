function initializePosition(longitude, latitude){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude - 0.02, latitude],
		zoom: 13.2
	});
	const marker = new mapboxgl.Marker({
		color: "#C30000",
		draggable: false
	}).setLngLat([longitude, latitude])
		.addTo(map);
		
	$.ajax({
		type: "GET",
		url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q',
		success: function(place) {
			console.log(place);
			$("#address").text(place.features[0].place_name);
		}
	});
}

function getDistance(facilityLongitude, facilityLatitude, userLongitude, userLatitude){
	var from = turf.point([facilityLongitude, facilityLatitude]);
	var to = turf.point([userLongitude, userLatitude]);
	var options = { units: 'kilometers' };
	var distance = turf.distance(from, to, options);
	if(distance < 1){
		distance = distance * 1000;
		$("#distance").text("Distanza dalla tua posizione: " + Math.round(distance) + " metri");
	}
	else {
		$("#distance").text("Distanza dalla tua posizione: " + distance.toFixed(2) + " km");
	}
}

function showPlaygroundDescription(description){
	$("#playground_modal").find("#description").text(description);
	$('#playground_modal').modal('show');
}

$(document).ready(function() {
	
	 var average=parseFloat(document.getElementById("voto_value").innerHTML);
console.log(document.getElementById("stars").children.length);
console.log(average)
var size=document.getElementById("stars").children.length;
for(var i=0;i<5;i++){
	if(average-i>0.5)
document.getElementById("stars").children.item(i).className="fa fa-star chosen";
else
document.getElementById("stars").children.item(i).className="fa fa-star"

console.log(i);
}
console.log("media"+average);
});