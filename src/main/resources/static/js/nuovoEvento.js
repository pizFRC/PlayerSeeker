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

if(validateForm()){
	alert("dati corretti")
}else{ alert("validato false"); return;}
//if($("#contenitore").find(".point").last().hasClass("active"))
 if($(".point:last").hasClass("active"))
return;
//console.log("prova");
	updateProgress(true);
      $(".d-y:first").next().addClass('d-y');
       $(".d-y:first").next().removeClass('d-n');
  $(".d-y:first").addClass('d-n').removeClass('d-y');
  $("#contenitore").find(" span:not(.border-primary) > i").first().addClass("text-primary ");
 $(".active:first").removeClass("active");
 $("#contenitore").find(" span:not(.border-primary)").first().addClass("border-primary active");

 // console.log();
}


   function prev(){
	if($(".d-y:first").attr('id')=="first_step")
	    return;

		updateProgress(false);
		$(".d-y:last").prev().addClass('d-y');
	      $(".d-y:first").removeClass('d-n');
$(".d-y:last").addClass('d-n').removeClass('d-y');

  $( "span.border-primary:last > i").first().removeClass("text-primary")

$("span.border-primary:last").removeClass("border-primary active");
$("span.border-primary:last").addClass("active");
/*   $(".d-y:first").next().addClass('d-y');
       $(".d-y:first").next().removeClass('d-n');
  $(".d-y:first").addClass('d-n').removeClass('d-y');
         // $(".d-y:first").removeClass('d-y').addClass('d-n');
        */  
}




///////////////TIME PICKER////////////



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
    scrollbar: true,
  
});



$('#ora_fine').timepicker({
   timeFormat: 'HH:mm ',
    interval: 60,
    minTime: '09:00',
    maxTime: '23:00',
    defaultTime: '09',
    startTime:  '09:00',
    dynamic: true,
    dropdown: true,
    scrollbar: true
});    
 /*   $('input.change-format').click(function() {
        var input = $(this),
            timepicker = input.closest('div').find('.timepicker'),
            instance = timepicker.timepicker();
        instance.option('timeFormat', $(this).data('format'));
    });
 
*/

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
					if(el.style.width  <=0){
						alert("0");
						return;
					}
		    var	aria_val_now=(parseInt(el.getAttribute("aria-valuenow"))-25);
			var width=(parseInt(el.style.width  )-25);	
				
				}
				el.setAttribute("aria-valuenow",aria_val_now);
				
				el.style.width =width+"%";
		
}






///////////////CARICA I TIPI DI SPORT E LI AGGIUNGE AL CAROUSEL////////////

	$(document).ready(function() {
		
  $("#form_evento").submit(function (event) {
	alert("submitted");
    var formData = {
   form:  $("#form_evento").serialize(),
    };

    $.ajax({
      type: "POST",
      url: "nuovoEvento/create",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });

    event.preventDefault();
  });

	
		 $('#privacy').prop('checked', false);
	   addAddressInput();
        
    var sports;

	sportsContainer = document.querySelector(".carousel");
	
	console.log("pre");
	
    	loadSportType(sportsContainer);

	


//tasto confirm attivato solo se le privacy sono confermate
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
		            style : 'mapbox://styles/mapbox/streets-v11',
			     	center : [ 16.2537 ,39.2983],
				    zoom : 8,
                     transformRequest: (url, resourceType) => {
                    {
	            
             }
       }
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
				       
		
				}).on('results',function(e){
					    rimuoviMarker();
				})
			);
			map.getCanvas().style.cursor = 'pointer';
			// Center the map on the coordinates of any clicked circle from the 'circle' layer.
// Example of a MapMouseEvent of type "click"
map.on('click', (e) => {
console.log(e.lngLat.lat + "lng " +e.lngLat.lng );
console.log(e);

map.flyTo({
	center: [e.lngLat.lng ,e.lngLat.lat],
zoom: 11,
speed: 0.9,
essential: true ,


});
});
 
// Change the cursor to a pointer when the it enters a feature in the 'circle' layer.

 

	/*OBSERVER SI ACCORGE DEL CAMBIAMENTO DELLA CLASSE E RICHIAMA IL MAP RESIZE		
	SERVE AD EVITARE CHE LA MAPPA SI CARICHI SOLO IN PARTE
	*/
	
 const callback =(changeList,observer)=>{
		map.resize();
	}
	
   const observer =new MutationObserver(callback);
var element = document.querySelector('#third_step');
observer.observe(element,{
	attributes:true,
	attributeOldValue:true,
	 attributeFilter:['class'],
 
	
});		
	 InserisciMarkerVicini(mapboxgl,map);

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
	var label=document.createElement("label");
	label.innerHTML="Struttura selezionata x";
    $("#info_struttura_selezionata").append(label);
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


function loadSportType(sportsContainer){
	
	console.log("prova");
	var fileName="/getSportList";
	var xhttp =new XMLHttpRequest();
	
	xhttp.onreadystatechange=function(){
		if(this.readyState ==4 && this.status==200){
			var jsonObj=JSON.parse(xhttp.response);
						
							console.log("pre entries");
						Object.entries(jsonObj).forEach((entry) => {
  const [key, value] = entry;
  console.log(value);
var div =creaItemCaroseul(value);
sportsContainer.append(div);
});
     

//aggiungo al carousel 
	 document.querySelector("#first_step").append(sportsContainer);

///////////////CONFIGURO IL CAROUSEL//////////////////
$('.carousel').slick({
  dots: false,
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
	}else if(this.status==503 || this.status==400){
            alert("	503 O 400")
	
	}
	
	

}
console.log("fine fetch");
		xhttp.open("POST",fileName,true);
	xhttp.send();

}



function validateForm() {
	console.log("validate");
	
	var validator = $("#form_evento").validate({
		rules: {
			data_input: {
				required: true,
				
			},sport: {
				required: true,
			
			},ora_inizio : {
				required:true,
				ora_inizio_consentita:true,

				
			},
			ora_fine : {
				required:true,
				ora_fine_consentita:true,
			},
		},
		messages: {
			data_input: {
				required: "Inserisci la data corretta",
				
			},
			sport: {
				required: "Seleziona uno sport per poter proseguire",
			
			},ora_inizio : {
				required:"inserire ora inizio",
				ora_inizio_consentita:"L'ora di inizio deve essere precedente a quella di fine",   
			},
			ora_fine : {
				required:"camprichiesto",
			    ora_fine_consentita:"la partita deve durare almeno un'ora'"
				
			},
		},   errorPlacement: function(error, element) {
            //Custom position: first name
            if (element.attr("name") == "sport" ) {
                $("#error_msg").html(error);
            }else{
               error.insertAfter(element);
                


             }
           }
	});
	

		$.validator.addMethod('ora_inizio_consentita',function(value, element) {
			
			
			var minuti_inizio=getMinutes(value );
			 var minuti_fine=getMinutes($("#ora_fine").val());
		console.log(minuti_inizio +" "+minuti_fine );
        return minuti_inizio<=minuti_fine-6000; 
	});
	$.validator.addMethod('ora_fine_consentita',function(value, element) {
			
			
			var minuti_fine=getMinutes(value );
			 var minuti_inizio=getMinutes($("#ora_inizio").val());
		console.log(minuti_inizio +" "+minuti_fine );
        return minuti_fine>=minuti_inizio+6000 ; 
	});
		
	return validator.form();
		
}

function getMinutes(time)
{
    var timeParts = time.split(":");

    var timeInMinutes = (timeParts[0] * 60) + timeParts[1];

    return timeInMinutes;
}












		//$(document).ready(function() {
	
////////////////////////////

/*
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

*/

function creaItemCaroseul(sport){
	            var div = document.createElement("div");
				div.className = "container form-check  form-check-inline h-100 border border-primary position-relative ";
			    var input = document.createElement("input");
				input.type = "radio";
				input.className = "form-check-input btn-check w-100 h-100 position-absolute ";
				input.id = sport.type+"_radio";
				input.autocomplete="off";
				input.value=sport.type;
				input.required="true";
				input.name="sport";
				//input.form="form_evento";
			
				input.setAttribute("Form",'form_evento');
				$('#'+sport.type+"_radio").change(function () {   
				console.log($(this));
				/*		//modifico il numero di giocatori richiesti
				document.getElementById("num_giocatori").value=sport.requiredPlayers; 
    alert('hi');
$("#set_giocatori").empty();
				
				$(this).val(sport.type);*/
			    
});

				$(document).on('click','#'+sport.type+"_radio",function(e){
				console.log(	$(".carousel").find("input"));
				//console.log($(this));
			/*	alert("prova")
				//modifico il numero di giocatori richiesti
				document.getElementById("num_giocatori").value=sport.requiredPlayers; 
			
			//eliminio eventuali giocatori aggiunti
				$("#set_giocatori").empty();
				
				$(this).val(sport.type);
			    
				//devo anche rivedere le strutture che praticano quello sport
			
			   //Se clicco su uno sport type del carousel non vado avanti ma ritorno alla scelta della fascia oraria
			       if(($("#second_step").hasClass("d-y")))
			             return;		
		              
                 next();
	*/
				       });
				var icon=document.createElement("span");
				
		
				icon.className="fas fa-soccer-ball-o  ";
			   
				
				var label = document.createElement("label");
				label.className = "btn btn-outline-primary w-100 h-100 ";
				label.htmlFor = sport.type+"_radio";
				label.innerHTML=sport.type;
				label.id = sport.type+ "_label";
				
			label.append(icon);
			
				div.append(input,label);
				
					
			
			
				
				return div
}

