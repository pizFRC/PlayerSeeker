$(document).ready(function() {
	$("nav").find("a").removeClass("active");
	$("nav").find("#home").addClass("active");
	
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

function createSportFacilityCard(sportFacilityName, id){
	var div = document.createElement("div");
	div.className = "col-12 col-md-4";
	
	var card = document.createElement("div");
	card.className = "card sportFacility-card mb-3";
	
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";
	
	var name = document.createElement("h5");
	name.className = "card-title";
	$(name).text(sportFacilityName);
	
	var description = document.createElement("p");
	description.className = "card-text pb-3";
	
	var button = document.createElement("a");
	button.className = "btn btn-primary";
	$(button).attr("href", "/sportFacilityDetails?id=" + id);
	
	cardBody.append(name, description, button);
	card.append(cardBody);
	div.append(card);
	
	return div;
}