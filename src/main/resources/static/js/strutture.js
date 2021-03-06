var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
	   $("#my_position").html('<i style="font-size: 1.5rem"class="bi bi-geo-alt-fill"></i>');
   } else {
	   $("#my_position").html('<i style="font-size: 1.5rem"class="bi bi-geo-alt-fill me-3"></i>Vicine a te');
   }
   lastScrollTop = st;
});

var placeName = null;
$(document).ready(function() {
	$("nav").find("a").removeClass("active");
	$("nav").find("#sport_facility").addClass("active");
	$('#popover').popover();
	
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
			showNearbySportFacility();
		});
	
	$("#range").on("change", function(){
		$("#distance").text($("#range").val() + " km");
		showNearbySportFacility();
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
	document.querySelectorAll(".item").forEach(element => element.className = "item col-12 mb-3");
});

//Grid view
$("#btn_grid").click(function() {
	var larghezza = $(window).width();
	if (larghezza <= 991) {
		return;
	} 
	else if (lastViewPressed === "list") {
		document.querySelectorAll(".info-container").forEach(element => $(element).removeClass("col-md-3 mb-3"));
		document.querySelectorAll(".item").forEach(element => element.className = "item col-4 mb-3");
	}
	lastViewPressed = "grid";
});

//Automatic list view
window.addEventListener("resize", function() {
	var larghezza = $(window).width();
	if (larghezza <= 991) {
		$(".tasti_da_nascondere").hide(500);
		document.querySelectorAll(".item").forEach(element => element.className = "item col-12 mb-3");
		$("#rangeDiv").removeClass("w-50");
		$("#rangeDiv").addClass("w-100");
	} else {
		$(".tasti_da_nascondere").show(500);
		$("#rangeDiv").removeClass("w-100");
		$("#rangeDiv").addClass("w-50");
		if (lastViewPressed === "grid") {
			document.querySelectorAll(".item").forEach(element => element.className = "item col-4 mb-3");
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

function showNearbySportFacility(){
	if(position.longitude == null || position.latitude == null)
		return;
	$("#sport_facility_container").children().remove();
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
		url: "/getSportFacilityByBBox",
		contentType: "application/json",
		data: JSON.stringify(JsonBbox),
		success: function(list) {
			$.each(list, function(index, sportFacility) {
				if($('#sport_select').find(":selected").attr('id') === 'all'){
					$("#sport_facility_container").append(createCard(sportFacility));
				}
				else {
					$.each(sportFacility.playgrounds, function(index, playground){
						if(playground.sport.type === $('#sport_select').find(":selected").text()){
							$("#sport_facility_container").append(createCard(sportFacility));
						}
					});
				}
			});
		}
	});
}

function createCard(sportFacility) {

	var divItem = document.createElement("div");
	divItem.className = "item col-12 mb-3";

	var divCard = document.createElement("div");
	divCard.className = "card h-100";

	var divBodyCard = document.createElement("div");
	divBodyCard.className = "card-body";

	var titleCard = document.createElement("h5");
	titleCard.className = "card-title"; 
	$(titleCard).text(sportFacility.name);

	var contentCard = document.createElement("p");
	contentCard.className = "row card-text mb-3";
	
	var address = document.createElement("div");
	address.className = "d-flex col-12 col-md-6 mb-2";
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
	phoneDiv.className = "d-flex col-12 col-md-6 mb-2";
	var phoneIcon = document.createElement("i");
	phoneIcon.className = "bi bi-telephone-fill me-2";
	var phone = document.createElement("p");
	phone.className = "fs-6";
	$(phone).text(sportFacility.phone);
	
	phoneDiv.append(phoneIcon, phone);
	
	contentCard.append(address, phoneDiv);

	var btnCard = document.createElement("a");
	btnCard.className = "btn btn-outline-primary";
	btnCard.innerHTML = "Visualizza dettagli";
	$(btnCard).attr("href", "sportFacilityDetails/" + sportFacility.id);
	$(btnCard).attr("target", "_blank");

	divBodyCard.append(titleCard, contentCard, btnCard);
	divCard.append(divBodyCard);
	divItem.append(divCard);

	return divItem;
}