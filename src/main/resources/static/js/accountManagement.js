$(document).ready(function(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	addressGeocoder.addTo("#addressDiv");
	$($("#addressDiv").find("input")).attr("id", "address");
	$($("#addressDiv").find("input")).addClass("form-control");
	$($("#addressDiv").find("input")).attr("name", "address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
		window.address = e.result;
	});
});

function showAccountSettings(){
	$(".button").removeClass("selected");
	$("#account_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person");
	$("#account_button").find("i").addClass("bi-person-fill");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#accountDiv").addClass("active");
}

function showPasswordSettings(){
	$(".button").removeClass("selected");
	$("#password_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key");
	$("#password_button").find("i").addClass("bi-key-fill");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#passwordDiv").addClass("active");
}

function showEventsSettings(){
	$(".button").removeClass("selected");
	$("#event_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#event_button").find("i").removeClass("bi-calendar2-event");
	$("#event_button").find("i").addClass("bi-calendar2-event-fill");
	$(".section").removeClass("active");
	$("#eventsDiv").addClass("active");
}

