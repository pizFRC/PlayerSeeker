function initializePosition(longitude, latitude) {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude, latitude],
		zoom: 14
	});
	const marker = new mapboxgl.Marker({
		color: "#C30000",
		draggable: false
	}).setLngLat([longitude, latitude])
		.addTo(map);
}

$(document).ready(function() {
	$('#facility').popover();
	$('#popover-max-player').popover();
	$('#popover-not-logged').popover();
	$('#popover-manager').popover();
	$('#popover-already-participate').popover();
});

function attendTheEvent(event, userId, email, name, eventId){
	event.preventDefault();
	const id = [userId, eventId];
	$.ajax({
		type: "POST",
		url: "/checkPlayerAvailability",
		contentType: "application/json",
		data: JSON.stringify(id),
		async: false,
		success: function() {
			$.ajax({
				type: "POST",
				url: "/addEventParticipants",
				contentType: "application/json",
				data: JSON.stringify(id),
				async: false,
				success: function() {
					//INVIO EMAIL
					emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
					var templateParams = {
						to_name: name,
						to_email: email,
						message: "Complimenti, la partecipazione all'evento è avvenuta con successo!"
					};
					emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
						.then(function() { 
							$("#email_message_div").addClass("alert-primary");
							$("#email_message_div").find("#email_message").text("È stata inviata un'email di conferma.");
						}, function() { 
							$("#email_message_div").addClass("alert-warning");
							$("#email_message_div").find("#email_message").text("A causa di un problema temporaneo non è stata inviata l'email di conferma")
						});
					$('#success_modal').modal('show');
				},
				error: function() {
					$('#error_modal').find("#error_message").text("C'è stato un problema temporaneo. Ti invitiamo a riprovare!'");
					$('#error_modal').modal('show');
				}
			});
		},
		error: function(){
			$('#error_modal').find("#error_message").text("Partecipi già ad un altro evento in concomitanza con questo!");
			$('#error_modal').modal('show');
		}
	});
}

function showPlaygroundDetails(id, description){
	if(description == "")
		$("#playground_modal").find("#description").hide();
	else
		$("#playground_modal").find("#description").text(description);
		
	$("#playground_modal").find(".carousel-inner").children().remove();
	var folder = "playground_" + id;
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
					console.log(img);
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