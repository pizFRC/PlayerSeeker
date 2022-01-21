
/*var lat=document.getElementById("lat").value;
var long=document.getElementById("long").value;
var i=document.getElementById("icon");
var indirizzo=document.getElementById("indirizzo");

console.log(indirizzo);

var link='https://api.mapbox.com/geocoding/v5/mapbox.places/'+lat+','+long+'.json?access_token=pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
//reverse geocoding
$.ajax({
        url: link,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
        }, success: function(data){
			//indirizzo.innerHTML=i.outerHTML+data.features[0].place_name;
					indirizzo.innerHTML=data.features[0].place_name;

            //alert(data.features[0].place_name);
            //process the JSON data etc
        }
})*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [16.248828, 39.3301343],
	zoom: 14
});
const marker = new mapboxgl.Marker({
	color: "#C30000",
	draggable: false
}).setLngLat([16.248828, 39.3301343])
	.addTo(map);