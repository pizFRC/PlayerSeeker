/*	const strutture = {
  "type": "FeatureCollection",
  "features": [
	{ "type": "Palestra", "properties": { "Name": "Fitclub", "Address": "2185 Versailles Rd" }, "geometry": { "type": "Point", "coordinates": [ 16.2007 ,39.2983]} },
	{ "type": "Palestra", "properties": { "Name": "RENDEfit", "Address": "1733 Russell Cave Rd" }, "geometry": { "type": "Point", "coordinates": [ 16.2111 ,39.2983] } },
	{ "type": "Palestra", "properties": { "Name": "Central Fit", "Address": "140 E Main St" }, "geometry": { "type": "Point", "coordinates": [ 16.2222 ,39.2900]} }
   
  ]
};
*/

///funzioe tasto avanti

function next() {

	if(validateForm()){
		
	}else{  return; }
	//if($("#contenitore").find(".point").last().hasClass("active"))
	if ($(".point:last").hasClass("active"))
		return;

	if ($(".d-y:first").attr("id") == "second_step")
		set_datetime_resoconto();

	updateProgress(true);
	
	//qui gestisco le icone sulla progress bar
	$(".d-y:first").next().addClass('d-y');
    $(".d-y:first").next().removeClass('d-n');
	$(".d-y:first").addClass('d-n').removeClass('d-y');
	$("#contenitore").find(" span:not(.border-primary) > i").first().addClass("text-primary ");
	$(".active:first").removeClass("active");
	$("#contenitore").find(" span:not(.border-primary)").first().addClass("border-primary active");


}

///funzioe tasto avantis
function prev() {
	if ($(".d-y:first").attr('id') == "first_step")
		return;

	updateProgress(false);
	
	//qui gestisco le icone sulla progress bar
	$(".d-y:last").prev().addClass('d-y');
	$(".d-y:first").removeClass('d-n');
	$(".d-y:last").addClass('d-n').removeClass('d-y');

	$("span.border-primary:last > i").first().removeClass("text-primary")

	$("span.border-primary:last").removeClass("border-primary active");
	$("span.border-primary:last").addClass("active");
	
}






///////////////TIME PICKER CONFIG////////////


$(document).ready(function() {




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
		startTime: '09:00',
		dynamic: true,
		dropdown: true,
		scrollbar: true
	});

});



///////////////PROGRESS BAR UPDATE FUNCTION////////////


function updateProgress(add) {
	let el = document.getElementById('progress_bar');
	if (add) {
		var aria_val_now = (parseInt(el.getAttribute("aria-valuenow")) + 25);
		var width = (parseInt(el.style.width) + 25);
	} else {
		if (el.style.width <= 0) {
		
			return;
		}
		var aria_val_now = (parseInt(el.getAttribute("aria-valuenow")) - 25);
		var width = (parseInt(el.style.width) - 25);

	}
	el.setAttribute("aria-valuenow", aria_val_now);

	el.style.width = width + "%";

}

///////////////////CREAZIONE DIV RISPOSTA CREAZIONE EVENTO 
function addResultDiv(error) {
	
	$("#div_btn_prev").hide(1000);
		$("#div_btn_next").hide(1000);
	$("#last_step").removeClass("d-y").addClass("d-n");
	
	var div=document.createElement("div");
	div.className="col-12 mb-3 d-y";
	
	


	var icon = document.createElement("i");
	 icon.className = "fa fa-check text-success fs-1";
	var title=document.createElement("h2");
	title.className="fs-2 text-dark";
	title.innerHTML="Evento creato con successo"
	var container=document.createElement("div");
	container.className="container text-center";
	container.style="display:inline-block; vertical-align:center;";
	
	if(error){
		title.innerHTML="Errore l'evento non è stato creato'"
		icon.className = "bi bi-x text-danger fs-1";
		
		
	}
	
	container.append(title,icon)
	var btn_div=document.createElement("div");
	btn_div.className="container d-flex justify-content-center";
	
	var a =document.createElement("a");
	a.className="btn btn-outline-secondary";
	a.innerHTML="Torna alla home";
	a.href="/";
	btn_div.append(a);
	div.append(container,btn_div);
	document.getElementById("last_step").after(div);
}




$(document).ready(function() {
///////////////RIDEFINISCO IL SUBMIT DEL FORM////////////

	$("#form_evento").submit(function(event) {
		
		var data = 	$("#form_evento").serialize(); 

  
		const datiToServer = {
			sport:$('input[name="sport"].checked').val(),
		struttura:$('input[name="struttura_selezionata"].checked').val(),
		data:document.getElementById("data_input").value,
		ora_inizio: document.getElementById("ora_inizio").value,
		ora_fine: document.getElementById("ora_fine").value,
		privacy:$('input[name="privacy_cornfirm"].checked').val(),
	}
		

		$.ajax({
			type: "POST",
			url: "nuovoEvento/create",
		     async: true,
			contentType: "application/json",		
			data: data,
			dataType: "json",
			statusCode: {
            400: function() {
               addResultDiv(true);
            },
            200: function() {
              addResultDiv(false);
            }
        },
        success: function() {
         
        },
        error: function(e) {
            alert("errore post submit form");
        }
		});

		event.preventDefault();
	});


	$('#privacy').prop('checked', false);
	sportsContainer = document.querySelector(".carousel");


	loadSportType(sportsContainer);
	const data_now = new Date();

	data_now.setDate(data_now.getDate() + 1);
	$("#data_input").attr("min", data_now.toISOString().split('T')[0]);

	document.getElementById("data_input").value = data_now.toISOString().split('T')[0];
    

	//qui gestisco il tasto confirm
	$('#privacy').click(function() {
		if ($('#privacy').is(':checked')) {
			$("#confirm_btn").prop("disabled", false);

		} else {
			$("#confirm_btn").prop("disabled", true);


		}
	})
	
	
	//AGGIUNGE LA MAPPA
	addAddressInput();
	


});

///////////////FUNZIONE PER AGGIUNGERE LA MAPPA///////////
function addAddressInput() {


	var latitude = parseFloat($("#longitude").val());
	var longitude = parseFloat($("#latitude").val());
	if (isNaN(latitude) || isNaN(longitude)) {
		alert("la sessione è scaduta ");
		return;
	}
	
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [16.2007,39.2983],
		zoom: 9,
		transformRequest: (url, resourceType) => {
			if (resourceType === 'Source' && url.startsWith('http://myHost')) {
				return {
					url: url.replace('http', 'https'),
					headers: { 'my-custom-header': true },
					credentials: 'include'  // Include cookies for cross-origin requests
				};
			}
		}
	});
	var lista_strutture = new Array();
	map.flyTo({
		center: [16.2007, 39.2983],
		zoom: 10,
		speed: 0.9,
		essential: true,


	});
	lista_strutture = getStruttureBB(map.getBounds()._ne, map.getBounds()._sw);
	map.on('idle', function() {

		map.resize()

	});

	map.on('load', function() {

		map.resize();
	});

	map.on('render', () => {

		map.resize()
	});

	
	map.on('zoomstart', () => {
		lista_strutture = getStruttureBB(map.getBounds()._ne, map.getBounds()._sw);
		
		rimuoviMarker();
	});

	map.on('zoomend', () => {
	
		creaMarkerIniziali(mapboxgl, map, lista_strutture);
	

	});

	map.on('dragstart', () => {
		lista_strutture = getStruttureBB(map.getBounds()._ne, map.getBounds()._sw);
		

		rimuoviMarker();
	});
	map.on('dragend', () => {

	
		creaMarkerIniziali(mapboxgl, map, lista_strutture);
		
	});


	map.addControl(
		new MapboxGeocoder({
			placeholder: 'Cerca qui la tua città',
			types: 'place,region',
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
		}).on('result', function(e) {
			
		}).on('results', function(e) {
			rimuoviMarker();
		})
	);


	map.getCanvas().style.cursor = 'pointer';


	/*OBSERVER SI ACCORGE DEL CAMBIAMENTO DELLA CLASSE E RICHIAMA IL MAP RESIZE		
	SERVE AD EVITARE CHE LA MAPPA SI CARICHI SOLO IN PARTE
	*/

	const callback = (changeList, observer) => {
		map.resize();
	}

	const observer = new MutationObserver(callback);
	var element = document.querySelector('#third_step');
	observer.observe(element, {
		attributes: true,
		attributeOldValue: true,
		attributeFilter: ['class'],


	});
	

	creaMarkerIniziali(mapboxgl, map, lista_strutture);

}

//FUNZIONE PER RIMUOVERE I MARKER

function rimuoviMarker() {
	$(".marker").remove();

}
//FUNZIONE PER CREARE I MARKER
function creaMarkerIniziali(mapboxgl, map, coordinate) {


	for (var i = 0; i < coordinate.length; i++) {
	
		const el = document.createElement('div');
		const width = 60;
		const height = 60;
		el.id = coordinate[i].name;
		const infoStruttura = document.createElement("input");
		infoStruttura.disabled;
		infoStruttura.type = "radio";
		infoStruttura.name = "struttura_selezionata";
		infoStruttura.value = coordinate[i].name;
		infoStruttura.style = "z-index:999; width:100%;height:100% display:none;margin-top:5px;";
		el.append(infoStruttura);
		el.className = 'marker';
		el.style.backgroundImage = `url(../img/gym2.png)`;
		el.style.width = `30px`;
		el.style.height = `30px`;
		el.style.backgroundSize = '100%';


		el.addEventListener('click', () => {


			el.children.item(0).checked = true


			document.getElementById("struttura_selezionata").innerHTML = el.id;
			document.getElementById("struttura_resoconto").innerHTML = el.id;

		});
		var popup = new mapboxgl.Popup()
			.setText(coordinate[i].name)
			.addTo(map);

		// Add markers to the map.
		new mapboxgl.Marker(el)
			.setLngLat(coordinate[i].coordinates).setPopup(popup).addTo(map);


	}
}
//FINE FUNZIONI MAPPA



//aggiunge le informazioni relative a data e ora nel form creazione evento
function set_datetime_resoconto() {
	let data = document.getElementById("data_input").value;
	let ora_inizio = document.getElementById("ora_inizio").value;
	let ora_fine = document.getElementById("ora_fine").value;
	document.getElementById("data_resoconto").innerHTML = data;
	document.getElementById("data_scelta").innerHTML = data;
	document.getElementById("fascia_scelta").innerHTML = ora_inizio + " - " + ora_fine;
	document.getElementById("ora_resoconto").innerHTML = ora_inizio + " - " + ora_fine;

}



///////////////FUNZIONI PER AGGIUNGERE INPUT NUOVO GIOCATORE ->NOME  COGNOME  ///////////
function creaInput(placeHolder) {
	var div = document.createElement("div");
	div.className = "col-5";
	var input = document.createElement("input");
	input.className = "form-control";
	input.name = placeHolder;
	input.type = "text";
	input.required = "true";

	input.placeholder = placeHolder;
     div.append(input);
	return div;
}

function addInputNameGiocatore() {
	if (document.getElementById("num_giocatori").value == 0) {
		alert("Il numero massimo di giocatori è stato raggiunto");
		return;
	}
	document.getElementById("num_giocatori").value -= 1;


	var divContenitore = document.createElement("div");
	divContenitore.className = "input-group row ";


	var btnMeno = document.createElement("button");
	btnMeno.className = "btn btn-outline-danger btn-sm border border-white ";
	var id = document.getElementById("set_giocatori").children.length;

	btnMeno.id = "btnMeno_" + id;
	divContenitore.id= "div_" + id;
	var spanMeno = document.createElement("span");
	spanMeno.className = "input-group-text bg-body";

	var iconMeno = document.createElement("i"); iconMeno.className = "fa fa-minus text-danger";
	spanMeno.append(iconMeno);
	btnMeno.append(spanMeno);



	$(document).on('click', '#btnMeno_' + id, function(e) {
		e.preventDefault();
		e.stopPropagation();


		//document.getElementById("btnMeno_"+id).removeEventListener("click",this);
		if (!document.getElementById("btnMeno_" + id))
			return;


		document.getElementById("btnMeno_" + id).parentElement.parentElement.remove();
		document.getElementById("num_giocatori").value = parseInt(document.getElementById("num_giocatori").value) + 1;


	});


	var num_input = document.getElementById("set_giocatori").children.length;


	var div_btn = document.createElement("div");
	div_btn.className = "col-2";
	div_btn.append(btnMeno);

	divContenitore.append(creaInput("Nome" + num_input),creaInput("Cognome" + num_input), div_btn);

	document.getElementById("set_giocatori").append(divContenitore);



}


function loadSportType(sportsContainer) {

	var fileName = "/getSportList";
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObj = JSON.parse(xhttp.response);

			
			Object.entries(jsonObj).forEach((entry) => {
				const [key, value] = entry;
				var div = creaItemCaroseul(value);
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
		} else if(this.status == 503 || this.status == 400){
			alert("	errore nel reperire la lista degli sport")

		}



	}

	xhttp.open("POST", fileName, true);
	xhttp.send();

}



function validateForm() {
	

	var validator = $("#form_evento").validate({
		rules: {
			data_input: {
				required: true,

			}, sport: {
				required: true,

			}, ora_inizio: {
				required: true,
				ora_inizio_consentita: true,


			},
			ora_fine: {
				required: true,
				ora_fine_consentita: true,
			}, struttura_selezionata: {
				required: true,
			}, Nome: {
				required: true,
			}
		},
		messages: {
			data_input: {
				required: "Inserisci la data corretta",

			},
			sport: {
				required: "Seleziona uno sport per poter proseguire",

			}, ora_inizio: {
				required: "inserire ora inizio",
				ora_inizio_consentita: "L'ora di inizio deve essere precedente a quella di fine",
			},
			ora_fine: {
				required: "camprichiesto",
				ora_fine_consentita: "la partita deve durare almeno un'ora'"

			}, struttura_selezionata: {
				required: "seleziona una struttura per continuare",
			}, Nome: {
				required: "Compilare correttamente i campi nome ,cognome",
			},
		}, errorPlacement: function(error, element) {
			//Custom position: first name
		
			if (element.attr("name") == "sport") {

				$("#error_msg").html(error);
			} else if (element.attr("name") == "struttura_selezionata") {
				$("#struttura_selezionata").html(error);
			} else {
				error.insertAfter(element);



			}
		}
	});
	$.validator.messages.required = "Compila questo campo";


	$.validator.addMethod('ora_inizio_consentita', function(value, element) {


		var minuti_inizio = getMinutes(value);
		var minuti_fine = getMinutes($("#ora_fine").val());
	
		return minuti_inizio <= minuti_fine - 6000;
	});
	$.validator.addMethod('ora_fine_consentita', function(value, element) {


		var minuti_fine = getMinutes(value);
		var minuti_inizio = getMinutes($("#ora_inizio").val());
	
		return minuti_fine >= minuti_inizio + 6000;
	});

	return validator.form();

}

function getMinutes(time) {
	var timeParts = time.split(":");

	var timeInMinutes = (timeParts[0] * 60) + timeParts[1];

	return timeInMinutes;
}


$(document).ready(function() {
		

});




function creaItemCaroseul(sport) {
	var div = document.createElement("div");
	div.className = "container form-check  form-check-inline h-100   position-relative ";
	var input = document.createElement("input");
	input.type = "radio";
	input.className = "form-check-input btn-check w-100 h-100 position-absolute ";
	input.id = sport.type + "_radio";
	input.autocomplete = "off";
	input.value = sport.type;
	input.required = "true";
	input.name = "sport";


	input.setAttribute("Form", 'form_evento');
	$('#' + sport.type + "_radio").change(function() {



	});

	$(document).on('click', '#' + sport.type + "_radio", function(e) {

		document.getElementById("num_giocatori").value = sport.requiredPlayers;
		$("#set_giocatori").empty();
		document.getElementById("sport_selezionato_resoconto").innerHTML = sport.type;

		if (($("#second_step").hasClass("d-y")))
			return;
		next();


	});
	


	var label = document.createElement("label");
	label.className = "btn btn-outline-light text-dark w-100 h-100  border border-2";
	label.htmlFor = sport.type + "_radio";
	label.innerHTML = sport.type;
	label.id = sport.type + "_label";




	div.append(input, label);





	return div
}
function getStruttureVicine() {
	const datiToServer = {

		'coordinates': [parseFloat($("#latitude").val()), parseFloat($("#longitude").val())],
		data: document.getElementById("data_input").value,
		ora_inizio: document.getElementById("ora_inizio").value,
		ora_fine: document.getElementById("ora_fine").value,
	}	
	const strutture = new Array();

	$.ajax({
		type: "POST",
		url: "/listaStruttureVicine",
		contentType: "application/json",
		dataType: 'json',
		async: true,
		data: JSON.stringify(datiToServer),
		success: function(response) {
			for (var i = 0; i < response.listaStrutture.length; i++) {
				var struttura = response.listaStrutture[i];

				const item = {
					'name': struttura.name,
					'coordinates': [struttura.address.longitude, struttura.address.latitude],

				}
			
				strutture.push(item)
			}


		}
		,
		error: function(response) {
			alert("errore nel reperire le strutture vicine");
		},
	});

	return strutture;
}
function getStruttureBB(ne_, sw_) {


	const strutture = new Array();


	const datiToServer = {
		ne:ne_,
		sw:sw_,
	    data:document.getElementById("data_input").value,
		ora_inizio: document.getElementById("ora_inizio").value,
		ora_fine: document.getElementById("ora_fine").value,
	}
	$.ajax({
		type: "POST",
		url: "/listaStruttureBB",
		contentType: "application/json",
		dataType: 'json',
		async: true,
		data: JSON.stringify(datiToServer),
		success: function(response) {
			for (var i = 0; i < response.listaStrutture.length; i++) {
				var struttura = response.listaStrutture[i];

				const item = {
					'name': struttura.name,
					'coordinates': [struttura.address.longitude, struttura.address.latitude],

				}
				
				strutture.push(item)
			}


		},
		error: function(response) {
			alert("errore nel reperire le strutture");
		},
	});

	return strutture;
}
