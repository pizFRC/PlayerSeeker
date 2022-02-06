$(document).ready(function(){
	$('#email_modal').find('#message').bind('input propertychange', function() {
		$("#send_message_button").attr("disabled", true);
		if (this.value.length && this.value != '') {
			$("#send_message_button").attr("disabled", false);
		}
	});
	
	$(window).on('resize', function() {
		var win = $(this);
		if (win.width() < 768){
			$('#internal_email_button').show();
			$('#internal_map').show();
		}
		else{
			$('#internal_email_button').hide();
			$('#internal_map').hide();
		}
	});
});

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
		
	const internalMap = new mapboxgl.Map({
		container: 'internal_map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude, latitude],
		zoom: 13.2
	});
	const internalMarker = new mapboxgl.Marker({
		color: "#C30000",
		draggable: false
	}).setLngLat([longitude, latitude])
		.addTo(internalMap);
		
	$.ajax({
		type: "GET",
		url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q',
		success: function(place) {
			console.log(place);
			$("#address").text(place.features[0].place_name);
		}
	});
}

function sendMessage(id, name){
	$.ajax({
		type: "POST",
		url: "/getSportFacilityEmail",
		contentType: "application/json",
		data: JSON.stringify(id),
		success: function (email) { 
			//INVIO EMAIL
			emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
			var templateParams = {
				to_name: name,
				to_email: email,
				message: $('#email_modal').find('#message').val()
			};
			emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
				.then(function() {
					var messageContainer = document.createElement("div");
					messageContainer.id = "result_message";
					messageContainer.className = "alert alert-success d-flex align-items-center mb-3";
					$(messageContainer).attr("role", "alert");
					var icon = document.createElement("i");
					icon.className = "bi bi-check2-circle me-3";
					$(icon).attr("role", "img");
					$(icon).css("font-size", "2rem");
					var message = document.createElement("div");
					$(message).text("Messaggio inviato con successo!")
					messageContainer.append(icon, message);
					$('#email_modal').find('.modal-body').children().hide();
					$('#email_modal').find('.modal-footer').hide();
					$('#email_modal').find('.modal-body').append(messageContainer);
				}, function() {
					var messageContainer = document.createElement("div");
					messageContainer.id = "result_message";
					messageContainer.className = "alert alert-warning d-flex align-items-center mb-3";
					$(messageContainer).attr("role", "alert");
					var icon = document.createElement("i");
					icon.className = "bi bi-exclamation-triangle-fill me-3";
					$(icon).attr("role", "img");
					$(icon).css("font-size", "2rem");
					var message = document.createElement("div");
					$(message).text("A causa di un problema temporaneo non è stato possibile inviare il messaggio'")
					$('#email_modal').find('.modal-body').children().hide();
					$('#email_modal').find('.modal-footer').hide();
					$('#email_modal').find('.modal-body').append(messageContainer);
				});
		}
	});
}

function closeEmailModal(){
	$('#email_modal').modal('hide');
	$('#email_modal').find('.modal-footer').show();
	$('#email_modal').find('#result_message').remove();
	$('#email_modal').find('.modal-body').children().show();
	$('#email_modal').find('#message').val('');
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

function showPlaygroundDetails(id, description){
	if(description == ""){
		$("#playground_modal").find("#description_label").hide();
		$("#playground_modal").find("#description").hide();
	}
	else
		$("#playground_modal").find("#description").text(description);
		
	var folder = "playground_" + id;
	$("#playground_modal").find(".carousel-inner").children().remove();
	$.ajax({
		type: "POST",
		url: "/getPlaygroundImage",
		contentType: "application/json",
		data: JSON.stringify(folder),
		async: false,
		success: function(result) {
			if(result.resources.length == 0)
				$("#playground_modal").find("#image_carousel").hide();
			else {
				var count = 1;
				$.each(result.resources, function(index, img) {
					if(count==1){
						var item = document.createElement("div");
						item.className = "carousel-item active";
						var image = document.createElement("img");
						image.className = "d-block w-100 rounded";
						$(image).attr("src", img.url);
						item.append(image);
						$("#playground_modal").find(".carousel-inner").append(item);
					}
					else{
						var item = document.createElement("div");
						item.className = "carousel-item";
						var image = document.createElement("img");
						image.className = "d-block w-100 rounded";
						$(image).attr("src", img.url);
						item.append(image);
						$("#playground_modal").find(".carousel-inner").append(item);
					}
					count++;
				});
			}
		}
	});
	
	$('#playground_modal').modal('show');
}

function showAddReview(){
	$('#review_modal').modal('show');
}
function showReview(id){
	
	
			$('#review_list_modal').modal('show');
	
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



$(document).on('click', '.review_star' , function(e) {
		e.preventDefault();
		e.stopPropagation();

  var source = e.target || e.srcElement;

var child =document.getElementById("review_stars").children;

$("#review_stars").children().removeClass("chosen");
	for(var i=0;i<source.id;i++){
		
		$('#'+child.item(i).id).addClass("chosen");
	}

	

});
});


function sendReview(id){
	
	const dati= {
		userId:id,
		id_struttura:  window.location.pathname.split("/").pop(),
	  testo:document.getElementById("review_text").value,
       voto: $('#review_stars').find('.chosen:last').attr("id"),
	};
	
	
	$.ajax({
		type: "POST",
		url: "/addReview",
		contentType: "application/json",
		data: JSON.stringify(dati),
		
		success: function(response) {
			var messageContainer = document.createElement("div");
			messageContainer.id = "result_message";
			messageContainer.className = "alert alert-success d-flex align-items-center mb-3";
			$(messageContainer).attr("role", "alert");
			var icon = document.createElement("i");
			icon.className = "bi bi-check2-circle me-3";
			$(icon).attr("role", "img");
			$(icon).css("font-size", "2rem");
			var message = document.createElement("div");
			$(message).text("Recensione pubblicata con successo!")
			messageContainer.append(icon, message);
			$('#review_modal').find('.modal-body').children().first().removeClass("d-flex").addClass("d-none");
			$('#review_modal').find('.modal-body').find('#review_stars').removeClass("d-flex").addClass("d-none");
			$('#review_modal').find('.modal-body').children().hide();
		    $('#review_modal').find('.modal-footer').hide();
			$('#review_modal').find('.modal-body').append(messageContainer);
		},
		error: function(response) {
			var messageContainer = document.createElement("div");
			messageContainer.id = "result_message";
			messageContainer.className = "alert alert-warning d-flex align-items-center mb-3";
			$(messageContainer).attr("role", "alert");
			var icon = document.createElement("i");
			icon.className = "bi bi-exclamation-triangle-fill me-3";
			$(icon).attr("role", "img");
			$(icon).css("font-size", "2rem");
			var message = document.createElement("div");
			$(message).text("A causa di un problema temporaneo non è stato possibile pubblicare la recensione'")
			$('#review_modal').find('.modal-body').children().hide();
			$('#review_modal').find('.modal-footer').hide();
			$('#review_modal').find('.modal-body').append(messageContainer);
		},
	});
}

function closeReviewModal(){
	$('#review_text').val("");

	window.location.reload();
}