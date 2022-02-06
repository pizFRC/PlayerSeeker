var position = {
	longitude: null,
	latitude: null
}
var placeName = null;

function changeCurrentPosition(longitude, latitude){
	position.longitude = longitude;
	position.latitude = latitude;
}

$(document).ready(function() {
	$("nav").find("a").removeClass("active");
	$("nav").find("#home").addClass("active");
	showBestEvents();
	showBestSportFacility();
});

function showBestEvents(){
	$("#first_event_container").children().remove();
	$("#second_event_container").children().remove();
	
	var JsonBbox = new Array();
	if(position.longitude == null || position.latitude == null) {
		JsonBbox = [
			{
				longitude: 0,
				latitude: 0
			},
			{
				longitude: 0,
				latitude: 0
			}
		];
	}
	else {
		var distance = $("#range").val();
		var point = turf.point([position.longitude, position.latitude]);
		var buffered = turf.buffer(point, 25, { units: 'kilometers' });
		var bbox = turf.bbox(buffered);
		JsonBbox = [
			{
				longitude: bbox[0],
				latitude: bbox[1]
			},
			{
				longitude: bbox[2],
				latitude: bbox[3]
			}
		];
	}
	
	$.ajax({
		type: "POST",
		url: "/getBestEvents",
		contentType: "application/json",
		data: JSON.stringify(JsonBbox),
		success: function(events) {
			console.log(events.length);
			var firstContainer = document.createElement("div");
			firstContainer.className = "container";
			var firstEventRow = document.createElement("div");
			firstEventRow.className = "row ps-5 pe-5";
			var eventCount = 0;
			while (eventCount < 3) {
				if (events.length > eventCount)
					firstEventRow.append(createEventCard(events[eventCount]));
					
				console.log(events[eventCount]);
				eventCount++;
			}
			firstContainer.append(firstEventRow);
			$("#first_event_container").append(firstContainer);
			if (events.length > eventCount) {
				var secondContainer = document.createElement("div");
				secondContainer.className = "container";
				var secondEventRow = document.createElement("div");
				secondEventRow.className = "row ps-5 pe-5";
				while (eventCount < events.length) {
					secondEventRow.append(createEventCard(events[eventCount]));
					eventCount++;
				}
				secondContainer.append(secondEventRow);
				$("#second_event_container").append(secondContainer);
			}
		}
	});
}

function createEventCard(event){
	var div = document.createElement("div");
	div.className = "col-12 col-lg-4 mb-3";
	
	var card = document.createElement("div");
	card.className = "card event-card mb-3 h-100";
	
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";
	
	var contentCard = document.createElement("p");
	contentCard.className = "row card-text mb-3";
	
	var name = document.createElement("h5");
	name.className = "card-title";
	$(name).text("Evento di " + event.sport.type);
	
	var dateDiv = document.createElement("div");
	dateDiv.className = "info-container d-flex align-items-center col-12 mb-2";
	var dateIcon = document.createElement("i");
	dateIcon.className = "bi bi-calendar-event me-2";
	var date = document.createElement("p");
	date.className = "fs-6"
	$(date).text(event.start);
	
	dateDiv.append(dateIcon, date);
	
	var beginDiv = document.createElement("div");
	beginDiv.className = "info-container d-flex align-items-center col-12 mb-2";
	var beginIcon = document.createElement("i");
	beginIcon.className = "bi bi-hourglass-top me-2";
	var begin = document.createElement("p");
	begin.className = "fs-6"
	$(begin).text(event.beginHour);
	
	beginDiv.append(beginIcon, begin);
	
	var endDiv = document.createElement("div");
	endDiv.className = "info-container d-flex align-items-center col-12 mb-2";
	var endIcon = document.createElement("i");
	endIcon.className = "bi bi-hourglass-bottom me-2";
	var end = document.createElement("p");
	end.className = "fs-6"
	$(end).text(event.endHour);
	
	endDiv.append(endIcon, end);
	
	contentCard.append(dateDiv, beginDiv, endDiv);
	
	var button = document.createElement("a");
	button.className = "btn btn-primary";
	$(button).text("Visualizza dettagli");
	$(button).attr("href", "eventDetails/" + event.id);
	$(button).attr("target", "_blank");
	
	
	cardBody.append(name, contentCard, button);
	card.append(cardBody);
	div.append(card);
	
	return div;
}

function showBestSportFacility(){
	$("#first_facility_container").children().remove();
	$("#second_facility_container").children().remove();
	
	var JsonBbox = new Array();
	if(position.longitude == null || position.latitude == null) {
		JsonBbox = [
			{
				longitude: 0,
				latitude: 0
			},
			{
				longitude: 0,
				latitude: 0
			}
		];
	}
	else {
		var point = turf.point([position.longitude, position.latitude]);
		var buffered = turf.buffer(point, 25, { units: 'kilometers' });
		var bbox = turf.bbox(buffered);
		JsonBbox = [
			{
				longitude: bbox[0],
				latitude: bbox[1]
			},
			{
				longitude: bbox[2],
				latitude: bbox[3]
			}
		];
	}
	
	$.ajax({
		type: "POST",
		url: "/getBestSportFacility",
		contentType: "application/json",
		data: JSON.stringify(JsonBbox),
		success: function(facilities) {
			console.log(facilities.length);
			var firstContainer = document.createElement("div");
			firstContainer.className = "container";
			var firstFacilityRow = document.createElement("div");
			firstFacilityRow.className = "row ps-5 pe-5";
			var facilityCount = 0;
			while (facilityCount < 3) {
				if (facilities.length > facilityCount)
					firstFacilityRow.append(createSportFacilityCard(facilities[facilityCount]));
				facilityCount++;
			}
			firstContainer.append(firstFacilityRow);
			$("#first_facility_container").append(firstContainer);
			if (facilities.length > facilityCount) {
				var secondContainer = document.createElement("div");
				secondContainer.className = "container";
				var secondFacilityRow = document.createElement("div");
				secondFacilityRow.className = "row ps-5 pe-5";
				while (facilityCount < facilities.length) {
					secondFacilityRow.append(createSportFacilityCard(facilities[facilityCount]));
					facilityCount++;
				}
				secondContainer.append(secondFacilityRow);
				$("#second_facility_container").append(secondContainer);
			}
		}
	});
}

function createSportFacilityCard(sportFacility){
	var div = document.createElement("div");
	div.className = "col-12 col-lg-4 mb-3";
	
	var card = document.createElement("div");
	card.className = "card sportFacility-card mb-3 h-100";
	
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";
	
	var name = document.createElement("h5");
	name.className = "card-title";
	$(name).text(sportFacility.name);
	
	var contentCard = document.createElement("p");
	contentCard.className = "row card-text mb-3";
	
	var address = document.createElement("div");
	address.className = "d-flex align-items-center col-12 mb-2";
	var addressIcon = document.createElement("i");
	addressIcon.className = "bi bi-geo-alt-fill me-2";
	var addressName = document.createElement("p");
	addressName.className = "fs-6";
	address.append(addressIcon, addressName);
	
	$.ajax({
		type: "GET",
		url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+sportFacility.address.longitude+','+sportFacility.address.latitude+'.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q',
		success: function(place) {
			$(addressName).text(place.features[0].place_name);
		}
	});
	
	var phoneDiv = document.createElement("div");
	phoneDiv.className = "d-flex align-items-center col-12 mb-2";
	var phoneIcon = document.createElement("i");
	phoneIcon.className = "bi bi-telephone-fill me-2";
	var phone = document.createElement("p");
	phone.className = "fs-6";
	$(phone).text(sportFacility.phone);
	phoneDiv.append(phoneIcon, phone);
	
	var siteDiv = document.createElement("div");
	siteDiv.className = "d-flex align-items-center col-12 mb-2";
	var siteIcon = document.createElement("i");
	siteIcon.className = "bi bi bi-globe me-2";
	var site = document.createElement("p");
	site.className = "fs-6";
	$(site).text(sportFacility.webSiteUrl);
	siteDiv.append(siteIcon, site);
	
	contentCard.append(address, phoneDiv, siteDiv);
	
	var button = document.createElement("a");
	button.className = "btn btn-primary";
	$(button).text("Visualizza dettagli");
	$(button).attr("href", "sportFacilityDetails/" + sportFacility.id);
	$(button).attr("target", "_blank");
	
	cardBody.append(name, contentCard, button);
	card.append(cardBody);
	div.append(card);
	
	return div;
}
