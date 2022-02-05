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

function showPlaygroundDescription(description){
	$("#playground_modal").find("#description").text(description);
	$('#playground_modal').modal('show');
}

function showAddReview(){
	$('#review_modal').modal('show');
}
function showReview(id){
	
		console.log(id);
	$.ajax({
		type: "POST",
		url: "/getReviewsSportsFacility",
		contentType: "application/json",
		data: JSON.stringify(id),
		
 		success: function(response) {
			$('#review_list_modal').modal('show');
		},
		error:function(response){
			alert("400");
		},
	});
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
	console.log("id "+$("#review_stars").find('.chosen').last().attr('id'));
    
	console.log( );
	console.log(sessionStorage.length);
	const dati= {
		userId:id,
		id_struttura:  window.location.pathname.split("/").pop(),
	  testo:document.getElementById("review_text").value,
       voto: $('#review_stars').find('.chosen:last').attr("id"),
	};
	console.log(dati);
	
	$.ajax({
		type: "POST",
		url: "/addReview",
		contentType: "application/json",
		data: JSON.stringify(dati),
		
 		success: function(response) {
			alert("200");
		},
		error:function(response){
			alert("400");
		},
	});
}