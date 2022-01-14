	const strutture = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Palestra", "properties": { "Name": "Fitclub", "Address": "2185 Versailles Rd" }, "geometry": { "type": "Point", "coordinates": [ 16.2007 ,39.2983]} },
    { "type": "Palestra", "properties": { "Name": "RENDEfit", "Address": "1733 Russell Cave Rd" }, "geometry": { "type": "Point", "coordinates": [ 16.2111 ,39.2983] } },
    { "type": "Palestra", "properties": { "Name": "Central Fit", "Address": "140 E Main St" }, "geometry": { "type": "Point", "coordinates": [ 16.2222 ,39.2900]} }
   
  ]
};

const geojson = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'message': 'Foo',
'iconSize': [60, 60]
},
'geometry': {
'type': 'Point',
'coordinates': [ 16.2007 ,39.2983]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Bar',
'iconSize': [50, 50]
},
'geometry': {
'type': 'Point',
'coordinates': [ 16.2111 ,39.2983]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Baz',
'iconSize': [40, 40]
},
'geometry': {
'type': 'Point',
'coordinates':  [ 16.2222 ,39.2900]
}
}
]
};
       
   function next(){
	
	
	
	//	console.log($(".dn").first().filter(".d-n"));
	
$(".d-n:first").removeClass('d-n').addClass('d-y') ;

if($(".d-n:first").attr("id")=="third_step"){
addAddressInput();
	}
console.log("4");
}


   function prev(){
	
	      $(".d-y:last").removeClass('d-y').addClass('d-n');
}


	$(document).ready(function() {
	
     
      var sports;

	
	

	sportsContainer = document.querySelector(".carousel");

	
	$.ajax({
		type: "POST",
		url: "/getSportList",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function (list) {
			
		
 
			$.each(list, function(index, sport) {
				var div = document.createElement("div");
				div.className = "container w-100";
			
				var input = document.createElement("button");
				input.type = "radio";
				input.className = "btn btn-outline-dark w-100";
				input.id = sport.type;
				
				input.innerHTML=sport.type;
				
				
				var i=document.createElement("i");
				
				
				i.className="fas fa-soccer-ball-o";
			   
				input.append(i);
				
				div.append(input);
				sportsContainer.append(div);
			
				$(document).on('click','#'+sport.type,function(e){
					document.getElementById("num_giocatori").value=sport.requiredPlayers; 
			if(($("#second_step").hasClass("d-y")))
			return;		
			
			next();
					//$("#set_giocatori").children().remove();
					
				});
				
			
				});
		
				//<label class="btn btn-outline-secondary" for="btn-check-2-outlined">Checked</label>
				/*
				
			*/

			
    	},
	 	statusCode: {
    		503: function() {
    	  		 	alert( "Problema");btnMeno
 				 }
		}
	});
	 document.querySelector("#first_step").append(sportsContainer);

		
$('.carousel').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


	});
	
	//FUNZIONI RELATIVE ALLA MAPPA
function addAddressInput(){
		
		mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
						const map = new mapboxgl.Map({
							container : 'map',
							style : 'mapbox://styles/mapbox/light-v10',
						
							center : [ 16.2537 ,39.2983],
							zoom : 8,
					
						});
						
						
						
map.on('idle',function(){
		map.resize()

})
     map.on('load',function(){
	
map.resize()
})

map.on('render', () => {
			
map.resize()
console.log('A render event occurred.');
});


			 map.addControl(
new MapboxGeocoder({
		 placeholder: 'Cerca qui la tua città',
					 types:'place,region',			
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl
	}).on('result', function(e) {
	alert(e.result.geometry);
		InserisciMarkerVicini(mapboxgl,map);
		
	}).on('results',function(e){
		rimuoviMarker();
	})
);			

}
	
function rimuoviMarker(){
	$( ".marker" ).remove();

}

function InserisciMarkerVicini(mapboxgl,map){
 
// Add markers to the map.
for (const marker of geojson.features) {
// Create a DOM element for each marker.
const el = document.createElement('div');
const width = marker.properties.iconSize[0];
const height = marker.properties.iconSize[1];
el.className = 'marker';
el.style.backgroundImage = `url(../img/gym.png)`;
el.style.width = `30px`;
el.style.height = `30px`;
el.style.backgroundSize = '100%';
 
el.addEventListener('click', () => {
      next();
});
 
// Add markers to the map.
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);


}
}
//FINE FUNZIONI MAPPA
	
	
	
	
	



function creaInput(placeHolder){
	var input=document.createElement("input");
	    input.className="form-control";
        input.type="text";
        input.placeholder=placeHolder;
   return input;
}


function addInputNameGiocatore(){
if(document.getElementById("num_giocatori").value==0)
{ 
	alert("Il numero massimo di giocatori è stato raggiunto"); 
	return;
 }
document.getElementById("num_giocatori").value-=1; 


var divContenitore=document.createElement("div");
divContenitore.className="input-group mt-2"; 


var btnMeno=document.createElement("button"); 
btnMeno.className="btnbtn-outline-secondary";
var id=document.getElementById("set_giocatori").children.length;
console.log("creo btnMeno_"+ id);
btnMeno.id="btnMeno_"+id; 
divContenitore.id="div_"+id;
var spanMeno=document.createElement("span");
spanMeno.className="input-group-text"; 

var iconMeno=document.createElement("i"); iconMeno.className="fa fa-minus";
spanMeno.append(iconMeno);
 btnMeno.append(spanMeno);


	
 $(document).on('click','#btnMeno_'+id,function(e){
	e.preventDefault();
	e.stopPropagation();
	
console.log( "id button "+$(this).attr('id'));

 

//document.getElementById("btnMeno_"+id).removeEventListener("click",this);
if(!document.getElementById("btnMeno_"+id))
return;
document.getElementById("btnMeno_"+id).parentElement.remove();



            
       
document.getElementById("num_giocatori").value=parseInt(document.getElementById("num_giocatori").value)+1;
         
              
       





});

divContenitore.append(creaInput("Nome"),creaInput("Cognome"),btnMeno);

document.getElementById("set_giocatori").append(divContenitore);


           
}
////////////////////////////


/*
map.on('load', () => {

  map.addLayer({
    id: 'strutture',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: strutture
    },
    layout: {
      'icon-image': 'url(../img/gym.png)',
        
    },
    paint: {}
  });
});*/
