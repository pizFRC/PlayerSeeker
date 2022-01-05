/**
 * $(document).ready(function(){
  $("#btn_registrati").click(function(){
    $("#btn_accedi").hide(1000);
     addSelectAccountType();
  });
});
 */



let lastViewPressed="list";

//Qui aggiungo la funzione che viene eseguita al click sul pulsante lista(serve a visualizzare gli elementi in lista)
$(document).ready(function(){  
	
	 $(document).on('click','#btn_list',function(e){
	e.preventDefault();
if(	 lastViewPressed==="list")
       return;
   lastViewPressed="list";
 document.querySelectorAll(".item").forEach(element => element.className="item col-12 col-xxl-12  col-md-12 col-sm-12 col-lg-12 col-xl-12 mx-auto m-1 pb-1");
});
});

   



//qui aggiungo un'azione all' evento di resize della finestra che trasforma la griglia in lista se la width è minore di 991
$(document).ready(function(){  

window.addEventListener("resize", function(){
	var  larghezza=  $(window).width();
	if(larghezza<=991 ){
    $(".tasti_da_nascondere").hide(1000);
     document.querySelectorAll(".item").forEach(element =>element.className="item col-sm-12 col-md-12 col-lg-12 col-xl-12  mx-auto m-1 pb-1");
     lastViewPressed="list";

}else{
 $(".tasti_da_nascondere").show(1000);
      
	 if((larghezza>991 && larghezza <=1199)&& lastViewPressed==="grid"){
		     
		  //$(".tasti_da_nascondere").show(1000);
                  document.querySelectorAll(".item").forEach(element => element.className="item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1");

           }else{
	 // $(".tasti_da_nascondere").show(1000);
           if(lastViewPressed==="grid")
	      document.querySelectorAll(".item").forEach(element =>element.className="item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");

           }



}

});

});










//Qui aggiungo la funzione che viene eseguita al click sul pulsante griglia(serve a visualizzare gli elementi in griglia con 2 o  3 colonne)


 $(document).ready(function(){  



//cambio le classi dei div che contengono le card
$("#btn_grid").click(function(){
var larghezza=  $(window).width();


if(larghezza <=991  ){
	
	return;
  }else {
	
	
	 if((larghezza>991 && larghezza <=1199)&&lastViewPressed==="grid" ){
		     
		  //$(".tasti_da_nascondere").show(1000);
                  document.querySelectorAll(".item").forEach(element => element.className="item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1");

           }else{
	 // $(".tasti_da_nascondere").show(1000);
           if(lastViewPressed==="list")
	      document.querySelectorAll(".item").forEach(element =>element.className="item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");

           }
	    lastViewPressed="grid";
}
console.log(larghezza + lastViewPressed);
});

});


///funzione per creare le card
function createCard(nome,organizzatore,sport){
	
	var divItem= document.createElement("div");
          divItem.className="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1";
	 
						 var divCard= document.createElement("div");
                               divCard.className="card";

                                   var divBodyCard= document.createElement("div");
                                        divBodyCard.className="card-body";
                                              
                                              var titleCard=document.createElement("h5");
                                                        titleCard.className="card-title"; titleCard.innerHTML=nome;
                                                            
  																var  contentCard=document.createElement("p");
                                                        contentCard.className="card-text";


                                                                  var btnCard=document.createElement("a");
																	btnCard.className="btn btn-primary";
																		btnCard.innerHTML="testo btn";
																		
																		
															 divBodyCard.append(titleCard,contentCard,btnCard);			
																divCard.append(divBodyCard);
																 divItem.append(divCard);	
																		
						
						
						
						return divItem;
}
//funzione per recuperare il file json da cambiare con restcontroller
/*
function loadJSONEvents(){
	var fileName="/fileProva/events.json";
	var xhttp =new XMLHttpRequest();
	
	xhttp.onreadystatechange=function(){
		if(this.readyState ==4 && this.status==200){
			var jsonObj= JSON.parse(xhttp.responseText);
			console.log(jsonObj.eventi.length);
			for(var i=0;i<jsonObj.eventi.length;i++){
				var evento=jsonObj.eventi[i];
				
				console.log(evento.nome + " in :" +evento.indirizzo);
				var card=createCard(evento.nome,evento.indirizzo);
	document.querySelector("#card_container").append(card);
			}
		}
	}
	
	
	xhttp.open("GET",fileName,true);
	xhttp.send();
	
}*/
function loadJSONEventsFromRestController(){
	var fileName="/listaStrutture";
	var xhttp =new XMLHttpRequest();
	
	xhttp.onreadystatechange=function(){
		if(this.readyState ==4 && this.status==200){
			var jsonObj=JSON.parse(xhttp.response);
			//console.log("id :"+jsonObj.listaEventi[0].id + jsonObj.listaEventi[0].sport.sportType);
		for(var i=0;i<jsonObj.listaStrutture.length;i++){
				var struttura=jsonObj.listaStrutture[i];
				
				//console.log("evento id :"+ evento.id + " " +evento.nome + " "+evento.telefono);
				var card=createCard("Struttura "+ struttura.id , " nome: " +struttura.nome , " numero di telefono: "+struttura.telefono);
	document.querySelector("#card_container").append(card);
			}
		}
		
	}
	xhttp.open("GET",fileName,true);
	xhttp.send();
	
	}
