$(document).ready(function() {
	var container = document.createElement("div");
	container.className = "d-flex justify-content-between";
	var addressLabel = document.createElement("label");
	addressLabel.innerText = "Inserisci il tuo indirizzo";
	addressLabel.className = "mt-3";

	var address = document.createElement("div");
	address.id = "address";
	address.className = "w-100 p-3";

	var buttonContainer = document.createElement("div");
	buttonContainer.className = "text-center mt-3";
	buttonContainer.id = "bottone";

	var button = document.createElement("button");
	button.className = "btn btn-primary";
	button.id = "validate_player_form";
	button.innerText = "Registrati";
	buttonContainer.append(button);
	container.append(address,buttonContainer);
	
	$("#posizione").append(addressLabel);
	$("#posizione").append(container);

	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	addressGeocoder.addTo("#address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
	});



});