

let lastViewPressed = "list";


$(document).ready(function() {
  

	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	
	addressGeocoder.addTo("#address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
	});

//Qui aggiungo la funzione che viene eseguita al click sul pulsante lista(serve a visualizzare gli elementi in lista)

	$(document).on('click', '#btn_list', function(e) {
		e.preventDefault();
		if (lastViewPressed === "list")
			return;
		lastViewPressed = "list";
		document.querySelectorAll(".item").forEach(element => element.className = "item col-12 col-xxl-12  col-md-12 col-sm-12 col-lg-12 col-xl-12 mx-auto m-1 pb-1");
	});
});

   



//qui aggiungo un'azione all' evento di resize della finestra che trasforma la griglia in lista se la width è minore di 991
$(document).ready(function(){  

	window.addEventListener("resize", function() {
		var larghezza = $(window).width();
		if (larghezza <= 991) {
			$(".tasti_da_nascondere").hide(1000);
			document.querySelectorAll(".item").forEach(element => element.className = "item col-sm-12 col-md-12 col-lg-12 col-xl-12  mx-auto m-1 pb-1");
			lastViewPressed = "list";

		} else {
			$(".tasti_da_nascondere").show(1000);

			if ((larghezza > 991 && larghezza <= 1199) && lastViewPressed === "grid") {

				//$(".tasti_da_nascondere").show(1000);
				document.querySelectorAll(".item").forEach(element => element.className = "item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1");

			} else {
				// $(".tasti_da_nascondere").show(1000);
				if (lastViewPressed === "grid")
					document.querySelectorAll(".item").forEach(element => element.className = "item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");

			}



		}

	});

//Qui aggiungo la funzione che viene eseguita al click sul pulsante griglia(serve a visualizzare gli elementi in griglia con 2 o  3 colonne)
//cambio le classi dei div che contengono le card
$("#btn_grid").click(function(){
var larghezza=  $(window).width();


if(larghezza <=991  ){
	
	return;
  }else {
	
	
	 if((larghezza>991 && larghezza <=1199)&&lastViewPressed==="grid" ){
		     
		  
                  document.querySelectorAll(".item").forEach(element => element.className="item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1");

           }else{
	
           if(lastViewPressed==="list")
	      document.querySelectorAll(".item").forEach(element =>element.className="item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");

           }
	    lastViewPressed="grid";
}
console.log(larghezza + lastViewPressed);
});

});


$(document).ready(function() {
	var addressLabel = document.createElement("label");
	addressLabel.innerText = "Cerca qui la tua città";
	addressLabel.className = "form-label autocomplete-label";
	addressLabel.htmlFor="form1";
	addressLabel.style="margin-left: 0px;";

	var address = document.createElement("div");
	address.id = "address";
	address.className = "w-100 p-3";

	var buttonContainer = document.createElement("div");
	buttonContainer.className = "text-center mt-3";
	buttonContainer.id = "bottone";

	var button = document.createElement("button");
	button.className = "btn btn-primary";
	button.id = "validate_player_form";
	button.innerText = "Registrati";
	buttonContainer.append(button);
	
	$("#basic").append(addressLabel);
	$("#basic").append(address);
});


///funzione per creare le card
function createCard(nome, organizzatore,sport){

	var divItem= document.createElement("div");
	divItem.className = "item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1" ;

	var divCard = document.createElement("div");
	divCard.className = "card";

	var divBodyCard = document.createElement("div");
	divBodyCard.className = "card-body";

	var titleCard = document.createElement("h5");
	titleCard.className = "card-title"; titleCard.innerHTML = nome + " organizzatore:" + organizzatore;

	var  contentCard = document.createElement("p");
	contentCard.className = "card-text"; contentCard.innerHTML = "sport : " + sport;


	var btnCard = document.createElement("a");
	btnCard.className = "btn btn-primary";
	btnCard.innerHTML = "testo btn";


	divBodyCard.append(titleCard, contentCard, btnCard);
   divCard.append(divBodyCard);
    divItem.append(divCard);




return divItem;
}




function loadJSONEventsFromRestController(){
	var fileName="/listaEventi";
	var xhttp =new XMLHttpRequest();
	
	xhttp.onreadystatechange=function(){
		if(this.readyState ==4 && this.status==200){
			var jsonObj=JSON.parse(xhttp.response);
						
       
			//console.log("id :"+jsonObj.listaEventi[0].id + jsonObj.listaEventi[0].sport.sportType);
		for(var i=0;i<jsonObj.listaEventi.length;i++){
				var evento=jsonObj.listaEventi[i];
				
				console.log("evento id :"+ evento.id + " organizzato da :" +evento.organizzatore.username + " sport :"+evento.sport.sportType);
				var card=createCard("evento id :"+ evento.id , " organizzato da :" +evento.organizzatore.username , " sport :"+evento.sport.sportType);
	document.querySelector("#card_container").append(card);
			}
		}
		
	}
	xhttp.open("GET",fileName,true);
	xhttp.send();
	
	}
