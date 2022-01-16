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
	
	
	//valida dati
	//validateData();

	//modifica la progress bar
	
	/* if($(".d-n:first").attr("id")=="third_step"){
	   
     
	   }*/
	updateProgress(true);
      $(".d-y:first").next().addClass('d-y');
       $(".d-y:first").next().removeClass('d-n');
  $(".d-y:first").addClass('d-n').removeClass('d-y');
   
  $("span:not(.border-dark)").first().addClass("border-dark");

     //) $(".d-y:last").prev().addClass('d-n');//
                     //      .removeClass('d-y');

            //   $(".d-y:first").addClass('d-n')
console.log(  $(".d-n:first"))
console.log(   $(".d-n:last"))


console.log(  $(".d-n:first").next())
console.log(   $(".d-n:last").next())

console.log(  $(".d-n:first").prev())
console.log(   $(".d-n:last").prev())





     
console.log(  $(".d-y:first"))
console.log(   $(".d-y:last"))

console.log(  $(".d-y:first").next())
console.log(   $(".d-y:last").next())

     
console.log(  $(".d-y:first").prev)
console.log(   $(".d-y:last").prev)
          //il primo elemento con classe d-n ,e lo rendo visibile
      /*$(".d-y:first").addClass('d-n');
        $(".d-n:first").removeClass('d-y') ;
          //  $(".d-y:first").removeClass('d-n');
      console.log( $(".d-y:first") );


       /*  $(".d-y:first").addClass('d-n');
           $(".d-n:first").removeClass('d-y');
    //$(".d-y:first").addClass('d-n').removeClass('d-y') ;
      console.log( $(".d-y:first") );//.removeClass('d-y').addClass('d-n') ;
          //Controllo se il div con il time picker  è già presente
     */
	
}


   function prev(){
	if($(".d-y:first").attr('id')=="first_step")
	    return;
		updateProgress(false);
		$(".d-y:last").prev().addClass('d-y');
	      $(".d-y:first").removeClass('d-n');
$(".d-y:last").addClass('d-n').removeClass('d-y');


$("span.border-dark:last").removeClass("border-dark");
/*   $(".d-y:first").next().addClass('d-y');
       $(".d-y:first").next().removeClass('d-n');
  $(".d-y:first").addClass('d-n').removeClass('d-y');
         // $(".d-y:first").removeClass('d-y').addClass('d-n');
        */  
}




///////////////TIME PICKER////////////

function creaTimePicker(){
	const popup = new dhx.Popup({
    css: "dhx_widget--bordered"
});

const timepicker = new dhx.Timepicker();
const result = document.getElementById("result");
timepicker.events.on("change", function (res) {
    result.value = res;
});

popup.attach(timepicker);

document.querySelector("#show").addEventListener("click", function () {
    popup.show("show");
});
}

///////////////TIME PICKER CONFIG////////////

$(document).ready(function(){
   




$('#ora_inizio').timepicker({
    timeFormat: 'HH:mm ',
    interval: 60,
    minTime: '08:00',
    maxTime: '23:00',
    defaultTime: '08',
    startTime: '08:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

$('#ora_fine').timepicker({
   timeFormat: 'HH:mm ',
    interval: 60,
    minTime: '09:00',
    maxTime: '23:00',
    defaultTime: '09',
    startTime: '09:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

 
 


});
///////////////PROGRESS BAR UPDATE FUNCTION////////////

	
  function updateProgress(add){
	//	<div class="progress-bar bg-dark" role="progressbar" style="width: 25%;"
				//	aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
				
				let el = document.getElementById('progress_bar');
		if(add)	{
		    var	aria_val_now=(parseInt(el.getAttribute("aria-valuenow"))+25);
			var width=(parseInt(el.style.width  )+25);	
				}else{
					if((parseInt(el.style.width  )<=0))
					return;
		    var	aria_val_now=(parseInt(el.getAttribute("aria-valuenow"))-25);
			var width=(parseInt(el.style.width  )-25);	
				
				}
				el.setAttribute("aria-valuenow",aria_val_now);
				
				el.style.width =width+"%";
		
}






///////////////CARICA I TIPI DI SPORT E LI AGGIUNGE AL CAROUSEL////////////

	$(document).ready(function() {
		 $('#privacy').prop('checked', false);
	   addAddressInput();
     
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
				
				//modifico il numero di giocatori richiesti
				document.getElementById("num_giocatori").value=sport.requiredPlayers; 
				
				//devo anche rivedere le strutture che praticano quello sport
			
			   //Se clicco su uno sport type del carousel non vado avanti ma ritorno alla scelta della fascia oraria
			       if(($("#second_step").hasClass("d-y")))
			             return;		
		              
                 next();
	
				       });
			
				});
		
    	},
	 	statusCode: {
    		503: function() {
    	  		 	alert( "Problema");btnMeno
 				 }
		}
	});
	//aggiungo al carousel 
	 document.querySelector("#first_step").append(sportsContainer);

///////////////CONFIGURO IL CAROUSEL//////////////////
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
   
  ]
});
$('#privacy').click(function() {
  if ($(this).is(':checked')) {
   $( "#confirm_btn" ).prop( "disabled", false );
$( "#confirm_btn" ).removeClass('btn-light').addClass('btn-success');
  }else{
	$( "#confirm_btn" ).prop( "disabled", true );
	$( "#confirm_btn" ).removeClass('btn-success').addClass('btn-light');

	
}
})
	
	
	});

	///////////////AGGIUNGO LA MAPPA///////////
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
                });


			 map.addControl(
                 new MapboxGeocoder({
	   			       placeholder: 'Cerca qui la tua città',
					  types:'place,region',			
				      accessToken: mapboxgl.accessToken,
					 mapboxgl: mapboxgl
				}).on('result', function(e) {
				         alert(e.result.geometry);

                     //devo anche passare la città(lat,lang)del giocatore e una lista di strutture
				        InserisciMarkerVicini(mapboxgl,map);
		
				}).on('results',function(e){
					    rimuoviMarker();
				})
			);			
 console.log("MAPPA CRE");
       }
	
	
	
     function rimuoviMarker(){
	     $( ".marker" ).remove();

      }


//MODIFICARE QUESTA FUNZIONE ,CREARE UNA FUNZIONE PER CREARE IL DIV DEL MARKER
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

///////////////FUNZIONI PER AGGIUNGERE INPUT NUOVO GIOCATORE ->NOME  COGNOME  ///////////
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
	

//document.getElementById("btnMeno_"+id).removeEventListener("click",this);
if(!document.getElementById("btnMeno_"+id))
return;


document.getElementById("btnMeno_"+id).parentElement.remove();

       
document.getElementById("num_giocatori").value=parseInt(document.getElementById("num_giocatori").value)+1;
         

});

divContenitore.append(creaInput("Nome"),creaInput("Cognome"),btnMeno);

document.getElementById("set_giocatori").append(divContenitore);


           
}


		$(document).ready(function() {
	
////////////////////////////


function validatePlayerForm(){
	console.log("player valid");
   		var validator = $('#second_step').validate();

	$("#data_input").rules("add", {
  		required: true,
  		dateISO: true,
  		messages: {
    		required: "Inserisci il tuo nome",
			
  		}
	});

	//$("#data_input").valid();
	//$("#data_input").valid();
	$("#prova").rules("add", {
  		required: true,
  		maxlength: 20,
        minlength:3,
  		messages: {
    		required: "Inserisci il tuo cognome",
			maxlength: "il cognome deve essere lungo al massimo 20 caratteri",
			minlength: "L'username deve essere lungo almeno 5 caratteri"
  		}
	});

	
	
}
});




