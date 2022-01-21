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
	$("#playground_button").find("i").removeClass("bi-puzzle-fill");
	$("#playground_button").find("i").addClass("bi-puzzle");
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
	$("#playground_button").find("i").removeClass("bi-puzzle-fill");
	$("#playground_button").find("i").addClass("bi-puzzle");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#passwordDiv").addClass("active");
}

function showPlaygroudsSettings(){
	$(".button").removeClass("selected");
	$("#playground_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#playground_button").find("i").removeClass("bi-puzzle");
	$("#playground_button").find("i").addClass("bi-puzzle-fill");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#playgroundDiv").addClass("active");
}

function showEventsSettings(){
	$(".button").removeClass("selected");
	$("#event_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#playground_button").find("i").removeClass("bi-puzzle-fill");
	$("#playground_button").find("i").addClass("bi-puzzle");
	$("#event_button").find("i").removeClass("bi-calendar2-event");
	$("#event_button").find("i").addClass("bi-calendar2-event-fill");
	$("#organized_button").addClass("selected");
	$(".section").removeClass("active");
	$("#eventsDiv").addClass("active");
	$("#organized").addClass("active");
}


function showOrganized(){
	$("#organized_button").addClass("selected");
	$("#participate_button").removeClass("selected");
	$("#organized").addClass("active");
	$("#partecipate").removeClass("active");
}

function showParticipate(){
	$("#organized_button").removeClass("selected");
	$("#participate_button").addClass("selected");
	$("#organized").removeClass("active");
	$("#partecipate").addClass("active");
}

function openOrClose(checkbox){
	if($(checkbox).is(':checked')) {
		$('#hour_modal').find("#open_hour").prop("disabled", false);
		$('#hour_modal').find("#close_hour").prop("disabled", false);
		$('#hour_modal').find("#status").text("Aperto");
	}
	else {
		$('#hour_modal').find("#status").text("Chiuso");
		$('#hour_modal').find("#open_hour").prop("disabled", true);
		$('#hour_modal').find("#close_hour").prop("disabled", true);
	}
}

function modifyHour(event, button){
	event.preventDefault();
	$('#hour_modal').find("#day").text($(button).closest("tr").find(".day").text());
	if($(button).closest("tr").find(".open").text() === "Chiuso"){
		$('#hour_modal').find("#status").text("Chiuso");
		$('#hour_modal').find("#open_hour").prop("disabled", true);
		$('#hour_modal').find("#close_hour").prop("disabled", true);
		$('#hour_modal').find("#checkbox").prop('checked', false);
	}
	else {
		$('#hour_modal').find("#open_hour").prop("disabled", false);
		$('#hour_modal').find("#close_hour").prop("disabled", false);
		$('#hour_modal').find("#status").text("Aperto");
		$('#hour_modal').find("#checkbox").prop('checked', true);
	}
	$('#hour_modal').find("#open_hour").val($(button).closest("tr").find(".open").text());
	$('#hour_modal').find("#close_hour").val($(button).closest("tr").find(".close").text());
	$('#hour_modal').modal('show');
}

function changeHours(event){
	event.preventDefault();	
}

