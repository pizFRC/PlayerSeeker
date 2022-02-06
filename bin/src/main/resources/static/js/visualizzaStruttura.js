//inserimento dei campi per ogni struttura

var lat=document.getElementById("lat").value;
var long=document.getElementById("long").value;
//var i=document.getElementById("icon");
var indirizzo=document.getElementById("indirizzo");

console.log(indirizzo);

var link='https://api.mapbox.com/geocoding/v5/mapbox.places/'+lat+','+long+'.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
//reverse geocoding
$.ajax({
        url: link,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
        }, success: function(data){
		indirizzo.innerHTML=i.outerHTML+data.features[0].place_name;
			//			//indirizzo.text=data.features[0].place_name;

            //alert(data.features[0].place_name);
            //process the JSON data etc
        }
})

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
		const map = new mapboxgl.Map({
			container : 'map', // container ID
			style : 'mapbox://styles/mapbox/streets-v11', // style URL
			center : [ 16.1843828, 39.3319934 ], // starting position [lng, lat]
			zoom : 9
		// starting zoom
		});
		const marker = new mapboxgl.Marker({
    color: "#FFFFFF",
    draggable: true
}).setLngLat([lat, long])
    .addTo(map);
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Set marker options.
