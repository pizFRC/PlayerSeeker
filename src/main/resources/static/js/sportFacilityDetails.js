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
		
	$.ajax({
		type: "GET",
		url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q',
		success: function(place) {
			console.log(place);
			$("#address").text(place.features[0].place_name);
		}
	});
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
	if(description == "")
		$("#playground_modal").find("#description").hide();
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