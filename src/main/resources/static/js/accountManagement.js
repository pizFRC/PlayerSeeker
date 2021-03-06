var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $("#new_event").html('<i style="font-size: 1.5rem"class="bi bi-plus-lg"></i>');
 	   $("#calendar_button").html('<i style="font-size: 1.5rem"class="bi bi-calendar-range"></i>');
   } else {
       $("#new_event").html('<i style="font-size: 1.5rem"class="bi bi-plus-lg me-3"></i>Crea nuovo evento');
	   $("#calendar_button").html('<i style="font-size: 1.5rem"class="bi bi-calendar-range me-3"></i> Visualizza calendario');
   }
   lastScrollTop = st;
});

var address = null;
function initializeAddress(longitude, latitude){
	$.ajax({
		type: "GET",
		url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q',
		async: false,
		success: function(place) {
			address = place.features[0];
			console.log(address);
		}
	});
}

$(document).ready(function(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero civico',
	});
	addressGeocoder.addTo("#addressDiv");
	$($("#addressDiv").find("input")).attr("id", "address");
	$($("#addressDiv").find("input")).addClass("form-control");
	$($("#addressDiv").find("input")).attr("name", "address");
	$("#addressDiv").find("input").val(address.place_name);
	addressGeocoder.on('result', function(e) {
		address = e.result;
	});
	cloudinary.setCloudName("player-seeker");
	$('#disabled_add_photo_button').popover();
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

function createCard(event, userId, isOrganizer) {


	var divItem = document.createElement("div");
	divItem.className = "item col-12";

	var divCard = document.createElement("div");
	divCard.className = "card mb-3";

	var divBodyCard = document.createElement("div");
	divBodyCard.className = "card-body";

	var titleCard = document.createElement("h5");
	titleCard.className = "card-title"; 
	$(titleCard).text("Evento di " + event.playground.sport.type);

	var contentCard = document.createElement("p");
	contentCard.className = "row card-text mb-3";
	
	var address = document.createElement("div");
	address.className = "info-container d-flex col-12 col-md-3 mb-2";
	var addressIcon = document.createElement("i");
	addressIcon.className = "bi bi-geo-alt me-2";
	var addressName = document.createElement("p");
	addressName.className = "fs-6";
	address.append(addressIcon, addressName);
	contentCard.append(address);
	
	$.ajax({
		type: "GET",
		url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+event.playground.sportFacility.address.longitude + ',' + event.playground.sportFacility.address.latitude + '.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q',
		success: function(place) {
			$(addressName).text(place.features[0].place_name);
		}
	});
	
	var dateDiv = document.createElement("div");
	dateDiv.className = "info-container d-flex col-12 col-md-3 mb-2";
	var dateIcon = document.createElement("i");
	dateIcon.className = "bi bi-calendar-event me-2";
	var date = document.createElement("p");
	date.className = "fs-6"
	$(date).text(event.start);
	
	dateDiv.append(dateIcon, date);
	
	var beginDiv = document.createElement("div");
	beginDiv.className = "info-container d-flex col-12 col-md-3 mb-2";
	var beginIcon = document.createElement("i");
	beginIcon.className = "bi bi-hourglass-top me-2";
	var begin = document.createElement("p");
	begin.className = "fs-6"
	$(begin).text(event.beginHour);
	
	beginDiv.append(beginIcon, begin);
	
	var endDiv = document.createElement("div");
	endDiv.className = "info-container d-flex col-12 col-md-3 mb-2";
	var endIcon = document.createElement("i");
	endIcon.className = "bi bi-hourglass-bottom me-2";
	var end = document.createElement("p");
	end.className = "fs-6"
	$(end).text(event.endHour);
	
	endDiv.append(endIcon, end);
	
	contentCard.append(address, dateDiv, beginDiv, endDiv);

	var buttonDiv = document.createElement("div");
	buttonDiv.className = "row me-4 ms-4 me-lg-0 ms-lg-0 justify-content-lg-end justify-content-center";
	
	var details = document.createElement("a");
	details.className = "btn btn-outline-primary mb-2 col-12 col-lg-3";
	details.innerHTML = "Visualizza dettagli";
	$(details).attr("href", "eventDetails/" + event.id);
	$(details).attr("target", "_blank");
	
	var unsubscribe = document.createElement("button");
	unsubscribe.className = "btn btn-outline-secondary mb-2 ms-lg-3 col-12 col-lg-3";
	unsubscribe.innerHTML = "Disiscriviti";
if(event.sportFacility.id!=userId)	{
	if (isOrganizer) {
		$(unsubscribe).click(function() {
			$('#div_select').empty();
			console.log(event);

			if (event.playersNumber == 1) {
				$('#event_modal').find("#event_message").text("Solo tu partecipi all'evento,vuoi davvero disinscriverti?L'evento sarà eliminato");
			} else {

				$('#event_modal').find("#event_message").text("Devi nominare organizzatore un giocatore prima di poterti disiscrivere");
				var select = document.createElement("select");
				select.name = "select_organizer";
				select.id = "select_organizer";
				select.className = "form-control";
				select.required = "true";

				var select_first_option = document.createElement("option");
				select_first_option.value = "";
				select_first_option.innerHTML = "Seleziona un organizzatore";

				select.append(select_first_option);
				for (var i = 1; i < event.players.length; i++) {
					var option = document.createElement("option");
					option.value = event.players[i].id;
					option.innerHTML = event.players[i].name + " " + event.players[i].surname;
					select.append(option);
				}
				$('#div_select').append(select);

			}
			$('#event_modal').find("#confirm_button").click(function() {

				if (event.playersNumber == 1) {
					deleteEvent(event.id);
					return;
				}
				var validator = $("#div_select").validate({
					rules: {
						select_organizer: {
							required: true,

						}
					},
					messages: {
						select_organizer: {
							required: "Seleziona un organizzatore",

						}
					}, errorPlacement: function(error, element) {

						$("#error_label_oranizer").html(error);

					},
				});
				if (validator.form()) {
					var idNewOrganizer = document.getElementById("select_organizer").value;
					unsubscribeOrganizerEvent(event.id, idNewOrganizer);
				}

			})
			$('#event_modal').modal('show');
		});
	}
	else{
		$(unsubscribe).click(function() {
			$('#event_modal').find("#event_message").text("Vuoi davvero disinscriverti dall'evento?");
			$('#event_modal').find("#confirm_button").click(function() {
				unsubscribeParticipantEvent(event.id, userId);
			})
			$('#event_modal').modal('show');
		});
	}
		
	
	if (isOrganizer) {
		var remove = document.createElement("button");
		remove.className = "btn btn-outline-danger mb-2 ms-lg-3 col-12 col-lg-3";
		remove.innerHTML = "Elimina";
		$(remove).click(function(){
		
			$('#div_select').empty();
			$('#event_modal').find("#event_message").text("Vuoi davvero eliminare l'evento?");
			$('#event_modal').find("#confirm_button").click(function(){
				deleteEvent(event.id);
			})
			$('#event_modal').modal('show');
		});
		buttonDiv.append(details, unsubscribe, remove);
	}
	else{
		buttonDiv.append(details, unsubscribe);
	}
	}else{
		var remove = document.createElement("button");
		remove.className = "btn btn-outline-danger mb-2 ms-lg-3 col-12 col-lg-3";
		remove.innerHTML = "Elimina";
		$(remove).click(function(){
			$('#event_modal').find("#event_message").text("Vuoi davvero eliminare l'evento?");
			$('#event_modal').find("#confirm_button").click(function(){
				deleteEvent(event.id);
			})
			$('#event_modal').modal('show');
		});
		buttonDiv.append(details, remove);
	}
	divBodyCard.append(titleCard, contentCard, buttonDiv);
	divCard.append(divBodyCard);
	divItem.append(divCard);

	return divItem;
}

function unsubscribeOrganizerEvent(eventId, userId){
	const id = [userId, eventId];
	$.ajax({
		type: "POST",
		url: "/updateEventOrganizer",
		contentType: "application/json",
		data: JSON.stringify(id),
		async: false,
		success: function() {
			$('#success_modal').modal('show');
		},
		error: function() {
			//$('#error_modal').find("#error_message").text("C'è stato un problema temporaneo. Ti invitiamo a riprovare!'");
			$('#error_modal').modal('show');
		}
	});
}

function unsubscribeParticipantEvent(eventId, userId){
	const id = [userId, eventId];
	$.ajax({
		type: "POST",
		url: "/removeEventParticipants",
		contentType: "application/json",
		data: JSON.stringify(id),
		async: false,
		success: function() {
			$('#success_modal').modal('show');
		},
		error: function() {
			//$('#error_modal').find("#error_message").text("C'è stato un problema temporaneo. Ti invitiamo a riprovare!'");
			$('#error_modal').modal('show');
		}
	});
}

function deleteEvent(id){
	$.ajax({
		type: "POST",
		url: "/deleteEvent",
		contentType: "application/json",
		data: JSON.stringify(id),
		success: function () { 
			$('#success_modal').modal('show');  
		},
		error: function() {
			$('#error_modal').modal('show');  
		}
	});
}

var colorArray = ['#e59558', '#e5c45d', '#bbe39d', '#8aceec'];

function initializeCalendar(userId){
	$("#calendar").evoCalendar({
		theme: 'Royal Navy',
		todayHighlight: true,
		firstDayOfWeek: 1
	});
	$.ajax({
		type: "POST",
		url: "/getEventByOrganizer",
		contentType: "application/json",
		data: JSON.stringify(userId),
		success: function(list) {
			$.each(list, function(index, event) {
				$("#calendar").evoCalendar('addCalendarEvent', [
					{
						id: event.id, // Event's id (required, for removing event)
						name: "Evento di " + event.playground.sport.type, // Name of event
						description: event.playground.description, // Description of event (optional)
						date: event.start, // Date of event
						badge: event.beginHour.substring(0, 5) + " - " + event.endHour.substring(0, 5),
						type: "event", // Type of event (event|holiday|birthday)
						color: colorArray[Math.floor(Math.random()*colorArray.length)]
					}
				]);
			});
		}
	});
	$.ajax({
		type: "POST",
		url: "/getEventByParticipant",
		contentType: "application/json",
		data: JSON.stringify(userId),
		success: function(list) {
			$.each(list, function(index, event) {
				$("#calendar").evoCalendar('addCalendarEvent', [
					{
						id: event.id, // Event's id (required, for removing event)
						name: "Evento di " + event.playground.sport.type, // Name of event
						description: event.playground.description, // Description of event (optional)
						date: event.start, // Date of event
						badge: event.beginHour.substring(0, 5) + " - " + event.endHour.substring(0, 5),
						type: "event", // Type of event (event|holiday|birthday)
						color: colorArray[Math.floor(Math.random()*colorArray.length)]
					}
				]);
			});
		}
	});
	
	$("#calendar").evoCalendar('setTheme', 'Royal Navy');
	$("#calendar_modal").modal('show');
}

function initializeFacilityCalendar(sportFacilityId){
	$("#calendar").evoCalendar({
		theme: 'Royal Navy',
		todayHighlight: true
	});
	$.ajax({
		type: "POST",
		url: "/getEventBySportsFacilityKey",
		contentType: "application/json",
		data: JSON.stringify(sportFacilityId),
		success: function(list) {
			$.each(list, function(index, event) {
				$("#calendar").evoCalendar('addCalendarEvent', [
					{
						id: event.id, // Event's id (required, for removing event)
						name: "Evento di " + event.playground.sport.type, // Name of event
						description: event.playground.description, // Description of event (optional)
						date: event.start, // Date of event
						badge: event.beginHour.substring(0, 5) + " - " + event.endHour.substring(0, 5),
						type: "event", // Type of event (event|holiday|birthday)
						color: colorArray[Math.floor(Math.random()*colorArray.length)]
					}
				]);
			});
		}
	});	
	$("#calendar_modal").modal('show');
}

function showOrganized(userId){
	$("#organized_button").addClass("selected");
	$("#participate_button").removeClass("selected");
	$("#organized").addClass("active");
	$("#partecipate").removeClass("active");
	$("#organized").children().remove();
	
	$.ajax({
		type: "POST",
		url: "/getEventByOrganizer",
		contentType: "application/json",
		data: JSON.stringify(userId),
		success: function(list) {
			$.each(list, function(index, event) {
				$("#organized").append(createCard(event, userId, true));
			});
		}
	});
}
function showEventSportsFacility(id){
	console.log(id);
	$.ajax({
		type: "POST",
		url: "/getEventBySportsFacilityKey",
		contentType: "application/json",
		data: JSON.stringify(id),
		success: function(list) {
			$.each(list, function(index, event) {
				var div =document.createElement("div");
				div.innerHTML="<h1> ciao<h1>"
				$("#organized").append(createCard(event,id,true));
			});
		}
	});
}

function showParticipate(userId){
	$("#organized_button").removeClass("selected");
	$("#participate_button").addClass("selected");
	$("#organized").removeClass("active");
	$("#partecipate").addClass("active");
	$("#partecipate").children().remove();
	
	$.ajax({
		type: "POST",
		url: "/getEventByParticipant",
		contentType: "application/json",
		data: JSON.stringify(userId),
		success: function(list) {
			$.each(list, function(index, event) {
				$("#partecipate").append(createCard(event, userId, false));
			});
		}
	});
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

var currentDay = null;
function modifyHour(event, button){
	event.preventDefault();
	currentDay = button.id;
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
	if($('#hour_modal').find("#checkbox").is(":checked")) { 
		$("#" + currentDay).closest("tr").find(".open").text($('#hour_modal').find("#open_hour").val());
		$("#" + currentDay).closest("tr").find(".close").text($('#hour_modal').find("#close_hour").val());
	}
	else {
		$("#" + currentDay).closest("tr").find(".open").text("Chiuso");
		$("#" + currentDay).closest("tr").find(".close").text("");
	}
	$('#hour_modal').modal('hide');
}


currentPlayground = null;
var allSports = new Array();
var imagesToDelete = new Array();
var newImage = new Array();
var maxImageNumber = 0;

function createUploadWidget(){
	var uploadPhotoWidget = cloudinary.createUploadWidget({ 
  		uploadPreset: 'uurvojju', folder: 'playground_' + currentPlayground.id, multiple: true, maxFiles: maxImageNumber, 
		clientAllowedFormats: ['png', 'jpg'], showUploadMoreButton: true
	}, (error, result) => {
		console.log(result);
		if (!error && result.event === "queues-end") {
     		result.info.files.forEach((item) => {
      			newImage.push(item.uploadInfo.public_id);
    		});
  		}
		if(!error && result.event === "close") {
			showPlaygroundDetails(currentPlayground.id);
		}
	});
	return uploadPhotoWidget;
}

function showPlaygroundDetails(id){
	var playground;
	$.ajax({
		type: "POST",
		url: "/getPlayground",
		contentType: "application/json",
		data: JSON.stringify(id),
		async: false,
		success: function(result) {
			playground = result;
			currentPlayground = playground;
		}
	});
	
	$('#playground_modal').find("#sport").children().remove();
	$.ajax({
		type: "POST",
		url: "/getSportList",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function (list) { 
			$.each(list, function(index, sport) {
				allSports.push(sport);
				var option = document.createElement("option");
				$(option).text(sport.type);
				$("#sport").append(option);
				if(sport.id == playground.sport.id){
					$(option).attr('selected', 'selected');
					$('#playground_modal').find(".modal-title").text("Campo da " + sport.type);
				}	
			});
		}
	});
	
	$('#playground_modal').find("#description").text(playground.description);
	
	$("#playground_modal").find("#photos").children().remove();
	var folder = "playground_" + playground.id;
	$.ajax({
		type: "POST",
		url: "/getPlaygroundImage",
		contentType: "application/json",
		data: JSON.stringify(folder),
		async: false,
		success: function(result) {
			if(result.resources.length >= 5){
				$("#disabled_add_photo_button").show();
				$('#add_photo_button').attr('style', 'display: none !important');
			}
			else{
				$('#disabled_add_photo_button').attr('style', 'display: none !important');
				$("#add_photo_button").show();
			}
			maxImageNumber = 5 - result.resources.length;
			$.each(result.resources, function(index, img) {
				item = document.createElement("div");
				item.className = "position-relative mb-3 me-2";
				$(item).css("min-width", "250px");
				var image = document.createElement("img");
				image.className = "d-block w-100 rounded me-2";
				$(image).attr("src", img.url);
				$(image).height('200px');
				var deleteButton = document.createElement("div");
				deleteButton.id = img.public_id;
				$(deleteButton).on("click", function(event) {
					event.preventDefault();
					imagesToDelete.push(this.id);
					maxImageNumber++;
					$(this).parent('div').remove();
					$('#disabled_add_photo_button').attr('style', 'display: none !important');
					$("#add_photo_button").show();
				});
				deleteButton.className = "btn btn-danger btn-sm position-absolute top-100 start-50 translate-middle shadow rounded";
				$(deleteButton).text("Elimina");
				item.append(image, deleteButton);
				$("#playground_modal").find("#photos").append(item);
			});
		}
	});
	$('#playground_modal').modal('show');
}

function addPhoto(){
	var uploadWidget = createUploadWidget();
	uploadWidget.open();
}

function deleteNewPhoto(){
	$.each(newImage, function(index, path) {
		$.ajax({
			type: "POST",
			url: "/deleteImage",
			contentType: "application/json",
			data: JSON.stringify(path),
			async: false,
			success: function() {
				console.log("image deleted");
			}
		});
	});
	$('#playground_modal').modal('hide');
}

function modifyPlayground(event){
	event.preventDefault();
	var newSport = allSports.find(function(element) { return element.type == $('#sport').find(":selected").text(); });
	//ELIMINARE FOTO
	$.each(imagesToDelete, function(index, path) {
		$.ajax({
			type: "POST",
			url: "/deleteImage",
			contentType: "application/json",
			data: JSON.stringify(path),
			success: function() {
				console.log("image deleted");
			}
		});
	});
	newPlayground = {
		id: currentPlayground.id,
		description: $('#playground_modal').find("#description").val(),
		sport: newSport
	}
	$('#playground_modal').modal('hide');
	$.ajax({
		type: "POST",
		url: "/updatePlayground",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(newPlayground),
		success: function () { 
			$('#playground_success_modal').modal('show');  
		},
		error: function() {
			$('#error_modal').modal('show');  
		}
	});
}

function deletePlayground(jsonObj){
	console.log(jsonObj);
}

var validUsername = true;
var validEmail = true;

function usernameCheckResult(result){
	validUsername = result;
}

function emailCheckResult(result){
	validEmail = result;
}

function updateGooglePlayerAccount(event, userId, _email, _name, _surname){
	event.preventDefault();
	var validator = $("#player_account_form").validate({
		rules: {
			birthday: {
				required: true,
				date: true
			},
			address: {
				required: true,
				isValid: true,
			}
		},
		messages: {
			birthday: {
				required: "Inserisci la tua data di nascita",
				date: "Inserisci una data valida"
			},
			address: {
				required: "Inserisci il tuo indirizzo"
			}
		}
	});

	$.validator.addMethod('isValid', function() {
		if(address == null)
			return false;
		if ((address.place_type[0] === "address" || address.place_type[0] === "poi")
			&& address.place_name === $("#address").val())
			return true;
		else
			return false;
	}, 'Inserire un indirizzo valido');

	if (validator.form()) {
		const player = {
			id: userId,
			name: _name,
			surname: _surname,
			birthday: new Date($("#birthday").val()),
			address: {
				longitude: address.geometry.coordinates[0],
				latitude: address.geometry.coordinates[1],
			},
		};
		$.ajax({
			type: "POST",
			url: "/updatePlayer",
			contentType: "application/json",
			data: JSON.stringify(player),
			success: function() {
				$('#success_modal').modal('show');
				//INVIO EMAIL
				emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
				var templateParams = {
					to_name: _name,
					to_email: _email,
					message: "Complimenti, il tuo account è stato aggiornato con successo!"
				};
				emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
					.then(function() { }, function() { });
			},
			error: function() {
				$('#error_modal').modal('show');
			}
		});
	}
}

function updatePlayerAccount(event, userId, username, email){
	event.preventDefault();
	var validator = $("#player_account_form").validate({
		rules: {
			name: {
				required: true,
				maxlength: 20
			},
			surname: {
				required: true,
				maxlength: 20
			},
			username: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			email: {
				required: true,
				email: true,
			},
			birthday: {
				required: true,
				date: true
			},
			address: {
				required: true,
				isValid: true,
			}
		},
		messages: {
			name: {
				required: "Inserisci il tuo nome",
				maxlength: "il nome deve essere lungo al massimo 20 caratteri"
			},
			surname: {
				required: "Inserisci il tuo nome",
				maxlength: "il nome deve essere lungo al massimo 20 caratteri"
			},
			username: {
				required: "Inserire l'username",
				minlength: "L'username deve essere lungo almeno 5 caratteri",
				maxlength: "L'username deve essere lungo al massimo 20 caratteri"
			},
			email: {
				required: "Inserisci la tua email",
				email: "Inserire un indirizzo email valido"
			},
			birthday: {
				required: "Inserisci la tua data di nascita",
				date: "Inserisci una data valida"
			},
			address: {
				required: "Inserisci il tuo indirizzo"
			}
		}
	});

	$.validator.addMethod('isValid', function() {
		if(address == null)
			return false;
		if ((address.place_type[0] === "address" || address.place_type[0] === "poi")
			&& address.place_name === $("#address").val())
			return true;
		else
			return false;
	}, 'Inserire un indirizzo valido');

	if (validator.form()) {
		if ($("#username").val() != username) {
			validateUsername();
		}
		if ($("#email").val() != email) {
			validateEmail();
		}

		if (validUsername && validEmail) {
			const user = {
				id: userId,
				username: $("#username").val(),
				email: $("#email").val()
			};

			$.ajax({
				type: "POST",
				url: "/updateUser",
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(user),
				success: function() {
					const player = {
						id: userId,
						name: $("#name").val(),
						surname: $("#surname").val(),
						birthday: new Date($("#birthday").val()),
						address: {
							longitude: address.geometry.coordinates[0],
							latitude: address.geometry.coordinates[1],
						},
					};
					$.ajax({
						type: "POST",
						url: "/updatePlayer",
						contentType: "application/json",
						data: JSON.stringify(player),
						success: function() {
							$('#success_modal').modal('show');  
							//INVIO EMAIL
							emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
							var templateParams = {
								to_name: $("#name").val(),
								to_email: $("#email").val(),
								message: "Complimenti, il tuo account è stato aggiornato con successo!"
							};
							emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
								.then(function() {}, function() {});
						},
						error: function() {
							$('#error_modal').modal('show');  
						}
					});
				},
				error: function() {
					$('#error_modal').modal('show');  
				}
			});
		}
	}	
}
var openingHours = new Array();
function updateGoogleSportFacilityAccount(event, userId, email) {
	event.preventDefault();
	var validator = $("#sport_facility_account_form").validate({
		rules: {
			name: {
				required: true,
				maxlength: 20
			},
			phone: {
				regex: "([0-9]{9,10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})|(\([0-9]{4}\)\s+[0-9]{5})"
			},
			address: {
				required: true,
				isValid: true,
			}
		},
		messages: {
			name: {
				required: "Inserisci il nome della struttura",
				maxlength: "il nome deve essere lungo al massimo 20 caratteri"
			},
			address: {
				required: "Inserisci l'indirizzo della struttura"
			}
		}
	});

	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},
		"Inserisci un numero di telefono valido"
	);

	$.validator.addMethod('isValid', function() {
		if (address == null)
			return false;
		if ((address.place_type[0] === "address" || address.place_type[0] === "poi")
			&& address.place_name === $("#address").val())
			return true;
		else
			return false;
	}, 'Inserire un indirizzo valido');

	if (validator.form()) {

		$("#opening_hours tr").each(function() {
			var dayRow = $(this).find("button");
			if ($(dayRow).closest("tr").find(".open").text() != "Chiuso") {
				var day = {
					day: $(dayRow).attr('id'),
					openTime: $(dayRow).closest("tr").find(".open").text(),
					closeTime: $(dayRow).closest("tr").find(".close").text()
				}
				openingHours.push(day);
			}
		});
		const sportFacility = {
			id: userId,
			name: $("#name").val(),
			address: {
				longitude: address.geometry.coordinates[0],
				latitude: address.geometry.coordinates[1],
			},
			phone: $("#phone").val(),
			webSiteUrl: $("#web_site").val(),
			openingHours
		};
		$.ajax({
			type: "POST",
			url: "/updateSportFacility",
			contentType: "application/json",
			data: JSON.stringify(sportFacility),
			success: function() {
				$('#success_modal').modal('show');
				//INVIO EMAIL
				emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
				var templateParams = {
					to_name: $("#name").val(),
					to_email: email,
					message: "Complimenti, il tuo account è stato aggiornato con successo!"
				};
				emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
					.then(function() { }, function() { });
			},
			error: function() {
				$('#error_modal').modal('show');
			}
		});
	}
}

function updateSportFacilityAccount(event, userId, username, email){
	event.preventDefault();
	var validator = $("#sport_facility_account_form").validate({
		rules: {
			name: {
				required: true,
				maxlength: 20
			},
			username: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			email: {
				required: true,
				email: true,
			},
			phone: {
				regex: "([0-9]{9,10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})|(\([0-9]{4}\)\s+[0-9]{5})"
			},
			address: {
				required: true,
				isValid: true,
			}
		},
		messages: {
			name: {
				required: "Inserisci il nome della struttura",
				maxlength: "il nome deve essere lungo al massimo 20 caratteri"
			},
			username: {
				required: "Inserire l'username",
				minlength: "L'username deve essere lungo almeno 5 caratteri",
				maxlength: "L'username deve essere lungo al massimo 20 caratteri"
			},
			email: {
				required: "Inserisci la tua email",
				email: "Inserire un indirizzo email valido"
			},
			address: {
				required: "Inserisci l'indirizzo della struttura"
			}
		}
	});
	
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},
		"Inserisci un numero di telefono valido"
	);

	$.validator.addMethod('isValid', function() {
		if(address == null)
			return false;
		if ((address.place_type[0] === "address" || address.place_type[0] === "poi")
			&& address.place_name === $("#address").val())
			return true;
		else
			return false;
	}, 'Inserire un indirizzo valido');
	
	if (validator.form()) {
		if ($("#username").val() != username) {
			validateUsername();
		}
		if ($("#email").val() != email) {
			validateEmail();
		}

		if (validUsername && validEmail) {
			const user = {
				id: userId,
				username: $("#username").val(),
				email: $("#email").val()
			};
			
			$("#opening_hours tr").each(function() {
				var dayRow = $(this).find("button");
				if ($(dayRow).closest("tr").find(".open").text() != "Chiuso") {
					var day = {
						day: $(dayRow).attr('id'),
						openTime: $(dayRow).closest("tr").find(".open").text(),
						closeTime: $(dayRow).closest("tr").find(".close").text()
					}
					openingHours.push(day);
				}
			});

			$.ajax({
				type: "POST",
				url: "/updateUser",
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(user),
				success: function() {
					const sportFacility = {
						id: userId,
						name: $("#name").val(),
						address: {
							longitude: address.geometry.coordinates[0],
							latitude: address.geometry.coordinates[1],
						},
						phone: $("#phone").val(),
						webSiteUrl: $("#web_site").val(),
						openingHours
					};
					$.ajax({
						type: "POST",
						url: "/updateSportFacility",
						contentType: "application/json",
						data: JSON.stringify(sportFacility),
						success: function() {
							$('#success_modal').modal('show');  
							//INVIO EMAIL
							emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
							var templateParams = {
								to_name: $("#name").val(),
								to_email: $("#email").val(),
								message: "Complimenti, il tuo account è stato aggiornato con successo!"
							};
							emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
								.then(function() {}, function() {});
						},
						error: function() {
							$('#error_modal').modal('show');  
						}
					});
				},
				error: function(){
					$('#error_modal').modal('show'); 
				}
			})
		}
	}
}

function showAccountErrorMessage(message){
	$("#account_error").find("p").text(message);
	$("#account_error").show();
}

function validateUsername() {
	var username = $("#account_form").find("#username").val();
	$.ajax({
		type: "POST",
		url: "/checkUsername",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(username),
		success: function() {
			usernameCheckResult(true);
		},
		error: function() {
			showAccountErrorMessage("Username già utilizzato!");
			usernameCheckResult(false);
		}
	});
}

function validateEmail() {
	var email = $("#account_form").find("#email").val();
	$.ajax({
		type: "POST",
		url: "/checkEmail",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(email),
		success: function() {
			emailCheckResult(true);
		},
		error: function() {
			showAccountErrorMessage("Email già utilizzata!");
			emailCheckResult(false);
		}
	});
}

function updatePassword(event, userId){
	event.preventDefault();
	var validator = $("#password_form").validate({
		rules: {
			current_password: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			password: {
				required: true,
				notEqualTo: "#current_password",
				minlength: 5,
				maxlength: 20
			},
			confirm_password: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			current_password: {
				required: "Inserire la password",
				minlength: "La password deve essere lunga almeno 5 caratteri",
				maxlength: "La password deve essere lunga al massimo 20 caratteri"
			},
			password: {
				required: "Inserire la password",
				minlength: "La password deve essere lunga almeno 5 caratteri",
				maxlength: "La password deve essere lunga al massimo 20 caratteri"
			},
			confirm_password: {
				required: "Inserire nuovamente la password",
				equalTo: "Le due password non corrispondono"			
			}
		}
	});
	
	$.validator.addMethod('notEqualTo', function(value, element, param) {
		return this.optional(element) || value === param;
	}, 'Inserire una password diversa da quella attuale');
	
	if (validator.form()) {
		validatePassword();
		if(validPassword){
			const user = {
				id: userId,
				password: $("#password_form").find("#password").val()
			};
			$.ajax({
				type: "POST",
				url: "/updatePassword",
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(user),
				success: function() {
					$('#success_modal').modal('show');  
				},
				error: function() {
					$('#error_modal').modal('show');  
				}
			});
		}
	}
}

function showPasswordErrorMessage(message){
	$("#password_error").find("p").text(message);
	$("#password_error").show();
}

var validPassword = true;
function passwordCheckResult(result) {
	validPassword = result;
}

function validatePassword(){
	var password = $("#password_form").find("#current_password").val();
	$.ajax({
		type: "POST",
		url: "/checkPassword",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		data: JSON.stringify(password),
		success: function() {
			passwordCheckResult(true);
		},
		error: function() {
			showPasswordErrorMessage("Password non corretta!");
			passwordCheckResult(false);
		}
	});
}

function signOut() {
	gapi.load('auth2', function() {
  		auth2 = gapi.auth2.init({
            client_id: '345576690488-5jgneq5npfclnad4b92mvflcuhsundgs.apps.googleusercontent.com'
    	});
		auth2.currentUser.listen(function(user){
			user.disconnect();
			sessionStorage.setItem("user", false);
			window.location.replace("/logout");
		});
	});
}