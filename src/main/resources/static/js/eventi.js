var lastScrollTop = 0;
$(window).scroll(function(event) {
	var st = $(this).scrollTop();
	if (st > lastScrollTop) {
		$("#new_event").html('<i style="font-size: 1.5rem"class="bi bi-plus-lg"></i>');
		$("#my_position").html('<i style="font-size: 1.5rem"class="bi bi-geo-alt-fill"></i>');
	} else {
		$("#new_event").html('<i style="font-size: 1.5rem"class="bi bi-plus-lg me-3"></i>Nuovo evento');
		$("#my_position").html('<i style="font-size: 1.5rem"class="bi bi-geo-alt-fill me-3"></i>Vicini a te');
	}
	lastScrollTop = st;
});

var placeName = null;

$(document).ready(function() {
	$("nav").find("a").removeClass("active");
	$("nav").find("#event").addClass("active");
	$('#popover-event').popover();
	$('#popover-new-event').popover();
	
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città',
		types: 'place'
	});
	addressGeocoder.addTo("#addressDiv");
	$($("#addressDiv").find("input")).attr("id", "address");
	$($("#addressDiv").find("input")).attr("name", "address");
	addressGeocoder.on('result', function(e) {
		$("#rangeDiv").find("label").text("Distanza dalla posizione scelta: ");
		placeName = e.result.place_name;
		position.longitude = e.result.center[0];
		position.latitude = e.result.center[1];
	});
	$("#search").on("click", function(e){
		e.preventDefault();
		var validator = $("#search_form").validate();
		$.validator.addMethod('isValid', function(value, element) {
			if(this.optional(element))
				return true;
			if (placeName === $("#address").val())
				return true;
			else
				return false;
		}, 'Inserire un indirizzo valido');

		$("#address").rules("add", {
			isValid: true,
			messages: {
				required: "Inserisci il tuo indirizzo"
			}
		});
		
		if (validator.form())
			showNearbyEvents();
		});
	
	$("#range").on("change", function(){
		$("#distance").text($("#range").val() + " km");
		showNearbyEvents();
	})
	$.ajax({
		type: "POST",
		url: "/getSportList",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function (list) { 
			$.each(list, function(index, sport) {
				var option = document.createElement("option");
				$(option).text(sport.type);
				$("#sport_select").append(option);
			})
		}
	});
});

let lastViewPressed = "list";
//List view
$("#btn_list").on('click', function(e) {
	e.preventDefault();
	if (lastViewPressed === "list")
		return;
	lastViewPressed = "list";
	document.querySelectorAll(".item").forEach(element => element.className = "item col-12 m-1 pb-1");
});

//Grid view
$("#btn_grid").click(function() {
	var larghezza = $(window).width();
	if (larghezza <= 991) {
		return;
	}
	else if (lastViewPressed === "list") {
		document.querySelectorAll(".info-container").forEach(element => $(element).removeClass("col-md-3"));
		document.querySelectorAll(".item").forEach(element => element.className = "item col-4");
	}
	lastViewPressed = "grid";

});

//Automatic list view
window.addEventListener("resize", function() {
	var larghezza = $(window).width();
	if (larghezza <= 991) {
		$(".tasti_da_nascondere").hide(500);
		document.querySelectorAll(".item").forEach(element => element.className = "item col-12");
		$("#rangeDiv").removeClass("w-50");
		$("#rangeDiv").addClass("w-100");
	} else {
		$(".tasti_da_nascondere").show(500);
		$("#rangeDiv").removeClass("w-100");
		$("#rangeDiv").addClass("w-50");
		if (lastViewPressed === "grid") {
			
			document.querySelectorAll(".item").forEach(element => element.className = "item col-4");
		}
	}
});

var position = {
	longitude: null,
	latitude: null
}

function changeCurrentPosition(longitude, latitude){
	position.longitude = longitude;
	position.latitude = latitude;
}

function showNearbyEvents(){
	if(position.longitude == null || position.latitude == null)
		return;
	$("#event_container").children().remove();
	var distance = $("#range").val();
	var point = turf.point([position.longitude, position.latitude]);
	var buffered = turf.buffer(point, distance, {units: 'kilometers'});
	var bbox = turf.bbox(buffered);
	var JsonBbox = [ 
		{
			longitude : bbox[0],
			latitude : bbox[1]
		},
		{
			longitude : bbox[2],
			latitude : bbox[3]
		}
	];
	$.ajax({
		type: "POST",
		url: "/getEventByBBox",
		contentType: "application/json",
		data: JSON.stringify(JsonBbox),
		success: function(list) {
			$.each(list, function(index, event) {
				if($('#sport_select').find(":selected").attr('id') === 'all'){
					$("#event_container").append(createCard(event));
				}
				else if (event.playground.sport.type === $('#sport_select').find(":selected").text()) {
					$("#event_container").append(createCard(event));
				}
			});
		}
	});
}

function createCard(event) {

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

	var btnCard = document.createElement("a");
	btnCard.className = "btn btn-outline-primary";
	btnCard.innerHTML = "Visualizza dettagli";
	$(btnCard).attr("href", "eventDetails/" + event.id);
	$(btnCard).attr("target", "_blank");

	divBodyCard.append(titleCard, contentCard, btnCard);
	divCard.append(divBodyCard);
	divItem.append(divCard);

	return divItem;
}

	


