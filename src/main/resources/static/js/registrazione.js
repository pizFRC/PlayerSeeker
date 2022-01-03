
window.addEventListener("load", function() {

});


function hideBtn() {

	$(document).ready(function() {
		$("#btn_registrati").click(function() {
			$("#form_login_nsc").hide(1000);
			addSelectAccountType();
		});
	});
}


function Account(username, psw,confermaPsw,type) {
	this.username = username;
	this.psw = psw;
     this.confermaPsw=confermaPsw;
this.type=type;

	this.dammiInfo = function() {
		return this.username + " " + this.psw;
	}
}


function hideGoogleBtn() {



	$(document).ready(function() {

		$("#google_signIn_button").hide(1000);


	});
}


function hideDivUPC() {

	$(document).ready(function() {

		alert("hide attiva")
		$("#dentro_form").children().hide(1000);
		// addSelectAccountType();

	});


}

function ajaxThree() {
	var username = $("#validationDefaultUsername").val();



	$.ajax({

		type: "POST",
		url: "/checkUsername",
		contentType: "application/text",
		data: username,
		success: function(risposta) {//status = 200

			alert("accesso OK")
			//	var messRisposta=JSON.parse(risposta.responseText);
			//	var n=JSON.parse(messRisposta);
			//	alert("successo"+n.title);
			alert("stai per essere reindirizzato");
			window.location = '/';

		},
		error: function(xhr) {

			alert("LA RICHIESTA NON È ANDATA A BUON FINE");
		}
	});
}

//cliccando su avanti viene mandata questa richiesta
function ajaxCheckUsername() {
	//hideGoogleBtn();
	
	
	var username = $("#username").val();
	var psw = $("#psw").val();
	var confermaPsw = $("#confermaPsw").val();
	var typeAccount = $("#categoriaAccount").val();
	alert(typeAccount);
	var account1 = new Account(username, "psw",confermaPsw,typeAccount);
	$.ajax({

		type: "POST",
		url: "/checkRegistrazione",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(account1), statusCode: {
			200: function(responseObject, textStatus, jqXHR) {

				console.log(responseObject + textStatus);
				if (typeAccount === "Giocatore")
					addInfoAccountGiocatore();
				else
					addInfoAccountStruttura();

			},
			400: function(responseObject, textStatus, jqXHR) {

				alert("il nome utente esiste già");

			},

			503: function(responseObject, textStatus, errorThrown) {
				// Service Unavailable (503)
				// This code will be executed if the server returns a 503 response
			}
		}
	});


}
function checkDatiFinale() {
	
	
	//1) controllo tipo account
	//2)comunico i dati al server 
	//2a) se struttura prendo i dati di una struttura (2 campi)
	//altrimenti 
	 //2b)se giocatore prendo quelli di un giocatore(
    //3)li mando al server fine.

	var username = $("#username").val();
	var typeAccount = $("#categoriaAccount").val();
	if (typeAccount === "Giocatore")
		console.log("giocatore");
	//crea json object giocatore e mandalo
	else
		console.log("struttura");
	//crea json object struttura e mandalo
	alert(typeAccount);
	$.ajax({

		type: "POST",
		//url a cui mandare i dati della registrazione
		url: "/endValidation",
		contentType: "application/text",
		data: username,
		success: function(risposta) {//status = 200

			alert("La richiesta ajax è stata inviata correttamente")
			//	var messRisposta=JSON.parse(risposta.responseText);
			//	var n=JSON.parse(messRisposta);
			//	alert("successo"+n.title);
			alert("stai per essere reindirizzato");
			window.location = '/';

		},
		error: function(xhr) {

			alert("LA RICHIESTA NON È ANDATA A BUON FINE");
		}
	});
}


//agiunge la select per scegeliere giocatore o struttura
function addSelectAccountType() {

	var firstDiv = document.createElement("div");
	firstDiv.className = "col-md-12";// <div class="col-md-5">
	/*	<label
				for="password" class="sr-only"> Password </label> 
				<input type="password" class="form-control mb-3" id="psw" name="psw"
				placeholder="Password" required autofocus>
		
		*/


	var inputConfermaPsw = document.createElement("input");
	inputConfermaPsw.className = "form-control mb-3";
	inputConfermaPsw.name = "confermaPsw"
	inputConfermaPsw.id = "confermaPsw";
	inputConfermaPsw.placeholder = "Conferma la password";
	inputConfermaPsw.type = "password";
	inputConfermaPsw.required = "";

	firstDiv.append(inputConfermaPsw);

	var label = document.createElement("label");
	label.className = "form-label";
	label.htmlFor  = "categoriaAccount"
	label.innerHTML = "Scegli il tipo di account"; // <label for="country" class="form-label">Country</label>

	var select = document.createElement("select");
	select.className = "form-select";
	select.id = "categoriaAccount"; //<select class="form-select" id="country" required="">
   select.name="categoriaAccount";

	var optionNormalUser = document.createElement("option");
	optionNormalUser.innerHTML = "Giocatore";

	var optionStruttura = document.createElement("option");
	optionStruttura.innerHTML = "Struttura sportiva";

	select.append(optionNormalUser);
	select.append(optionStruttura);


	firstDiv.append(label);
	firstDiv.append(select);

	var secondDiv = document.createElement("div");
	secondDiv.className = "invalid-feedback";

	firstDiv.append(secondDiv);

	var buttonDiv = document.createElement("div");

	buttonDiv.className = "row mt-4 justify-content-md-center";




	var btnAvanti = document.createElement("button");

	btnAvanti.className = "btn btn-primary";

	btnAvanti.id = "btnAvanti";
	
	
	$(document).ready(function() {
		$(document).on('click', '#btnAvanti', function(e) {
			e.preventDefault();
			
			ajaxCheckUsername();
		});
	});

	btnAvanti.innerHTML = "Avanti";

	var containerButton = document.createElement("div");
	containerButton.className = "col-sm-auto";
	containerButton.append(btnAvanti);





	buttonDiv.append(containerButton);



	document.querySelector("#dentro_form").append(firstDiv, buttonDiv);

}








function ajaxRequest() {




	//creo l'oggetto richiesta
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		document.getElementById("btn_registrati").innerHTML = this.responseText;

	}
	xhttp.open("POST", "checkUsername");
	xhttp.send();

}

function addInfoAccountGiocatore() {


	//ROW
	var divRow = document.createElement("div");
	divRow.className = "row";
	////INPUT NOME
	var secondDiv = document.createElement("div");
	secondDiv.className = "col-md-6";

	var labelName = document.createElement("label");
	labelName.className = "form-label";
	labelName.htmlFor = "name"
	labelName.innerHTML = "Nome";
	var inputName = document.createElement("input");
	inputName.className = "form-control";
	inputName.id = "name";
	inputName.required = "";


	var small = document.createElement("text-muted");
	small.innerHTML = "Il nome sarà mostrato sulla home";


	var thirdDiv = document.createElement("div");
	thirdDiv.className = "invalid-feedback";
	thirdDiv.innerHTML = "Il nome è richiesto"



	secondDiv.append(labelName, inputName, small, thirdDiv);


	//////FINE INPUT NOME


	//INPUT COGNOME
	var secondDivCognome = document.createElement("div");
	secondDivCognome.className = "col-md-6";


	var inputNameCognome = document.createElement("input");
	inputNameCognome.className = "form-control";
	inputNameCognome.id = "surname";
	 inputNameCognome.required = "";

	var labelNameCognome = document.createElement("label");
	labelNameCognome.className = "form-label";
	labelNameCognome.htmlFor = "surname"
	labelNameCognome.innerHTML = "Cognome";




	var thirdDivCognome = document.createElement("div");
	thirdDivCognome.className = "invalid-feedback";
	thirdDivCognome.innerHTML = "Il cognome è richiesto"



	secondDivCognome.append(labelNameCognome, inputNameCognome, thirdDivCognome);

	///data nascita
	var divData = document.createElement("div");
	divData.className = "mb-3 mt-3"
	var labelData = document.createElement("label");
	labelData.className = "form-label";
	labelData.htmlFor = "data_nascita"
	labelData.innerHTML = "Data di nascita";
	var inputData = document.createElement("input");
	inputData.className = "form-control";
	inputData.id = "data_nascita";
	inputData.type = "date";

	divData.append(labelData, inputData);

	////sesso

	var divSesso = document.createElement("div");
	divSesso.className = "mb-3 mt-3"
	var select = document.createElement("select");
	select.className = "form-select";
	select.id = "sesso"; //<select class="form-select" id="country" required="">


	var optionU = document.createElement("option");
	optionU.innerHTML = "Uomo";
	var optionD = document.createElement("option");
	optionD.innerHTML = "Donna";

	select.append(optionU);
	select.append(optionD);

	divSesso.append(select);
	///città

	var divCitta = document.createElement("div");
	divCitta.className = "col-md-6";


	var inputCitta = document.createElement("input");
	inputCitta.className = "form-control";
	inputCitta.id = "citta";
	inputCitta.required = "";
	var labelCitta = document.createElement("label");
	labelCitta.className = "form-label";
	labelCitta.htmlFor = "citta"
	labelCitta.innerHTML = "Città";
	divCitta.append(labelCitta, inputCitta);


	//ADD NEL DIV  ROW

	divRow.append(secondDiv);
	divRow.append(secondDivCognome);
	divRow.append(divData);
	divRow.append(divSesso);
	divRow.append(divCitta);

	console.log("rimozione");
	//nascondi gli elementi del form e inserisci quelli successivi
	hideDivUPC();
	
	
	document.querySelector("#form_login").append(divRow);
	addButtonEnd();

}



function addInfoAccountStruttura() {




	//ROW
	var divRow = document.createElement("div");
	divRow.className = "row";
	////INPUT NOME
	var nomeDiv = document.createElement("div");
	nomeDiv.className = "col-md-6";

	var labelName = document.createElement("label");
	labelName.className = "form-label";
	labelName.htmlFor = "name"
	labelName.innerHTML = "Nome";
	var inputName = document.createElement("input");
	inputName.className = "form-control";
	inputName.id = "name";
	inputName.required = "";


	var small = document.createElement("text-muted");
	small.innerHTML = "Il nome sarà mostrato sulla home";


	var thirdDiv = document.createElement("div");
	thirdDiv.className = "invalid-feedback";
	thirdDiv.innerHTML = "Il nome è richiesto"



	nomeDiv.append(labelName, inputName, small, thirdDiv);



	var luogoDiv = document.createElement("div");
	luogoDiv.className = "col-md-6";

	var labelLuogo = document.createElement("label");
	labelLuogo.className = "form-label";
	labelLuogo.htmlFor = "luogo"
	labelLuogo.innerHTML = "Luogo";
	var inputLuogo = document.createElement("input");
	inputLuogo.className = "form-control";
	inputLuogo.id = "luogo";
	inputLuogo.required = "";


	var smallLuogo = document.createElement("text-muted");
	smallLuogo.innerHTML = "Il luogo di ubicazione sarà mostrato sulla home";


	var thirdDivLuogo = document.createElement("div");
	thirdDivLuogo.className = "invalid-feedback";
	thirdDivLuogo.innerHTML = "Il luogo è richiesto"

	luogoDiv.append(labelLuogo, inputLuogo, smallLuogo, thirdDivLuogo);

	divRow.append(nomeDiv, luogoDiv);

	hideDivUPC();
	
	
	document.querySelector("#form_login").append(divRow);
	addButtonEnd();
	
	
	//////FINE INPUT NOME
}


function addButtonEnd() {
	var buttonDiv = document.createElement("div");
	buttonDiv.className = "row mt-4 justify-content-md-center";




	var btnEnd = document.createElement("a");

	btnEnd.className = "btn btn-primary";
	btnEnd.id = "btnEnd";
	$(document).ready(function() {
		$(document).on('click', '#btnEnd', function(e) {
			e.preventDefault();
			checkDatiFinale();
		});
	});

	btnEnd.innerHTML = "Fine";

	var containerButton = document.createElement("div");
	containerButton.className = "col-sm-auto";
	containerButton.append(btnEnd);





	buttonDiv.append(containerButton);
	document.querySelector("#form_login").append(buttonDiv);
}