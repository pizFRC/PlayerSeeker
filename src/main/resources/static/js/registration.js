function switchToRegistration(){
	$("#login_form").find("#to_hide").hide(300);
	//$("#login_form").attr('action', '/checkUsername');
	addAccountSelector();
}

function createInputField(type, id, placeholder){
	var input = document.createElement("input");
	input.type = type;
	input.className = "form-control mt-3";
	input.id = id;
	input.name = id;
	input.placeholder = placeholder;
	input.required;
	input.autofocus;
	return input;
}

function addAccountSelector() {
	var confirmPassword = createInputField("password", "confirm_password", "Conferma la password");
	
	var container = document.createElement("div");
	
	var label = document.createElement("label");
	label.className = "form-label mt-3";
	label.htmlFor = "categoriaAccount"
	label.innerHTML = "Scegli il tipo di account";
	
	var select = document.createElement("select");
	select.className = "form-select";
	select.id = "account_type";
	var player = document.createElement("option");
	player.id = "player"
	player.innerHTML = "Giocatore";
	var sportFacility = document.createElement("option");
	sportFacility.id = "sport_facility"
	sportFacility.innerHTML = "Struttura Sportiva";
	select.append(player);
	select.append(sportFacility);
	
	container.append(label);
	container.append(select);
	
	var buttonContainer = document.createElement("div");
	buttonContainer.className = "text-center mt-3";
	
	var button = document.createElement("button");
	button.className = "btn btn-primary";
	button.id = "validate_form";
	button.innerHTML = "Avanti";
	$("#login_form").on('click', '#validate_form', function(e) {
		e.preventDefault();
		validateForm();
	});
	
	buttonContainer.append(button);
	
	$("#login_form").append(confirmPassword);
	$("#login_form").append(container);
	$("#login_form").append(buttonContainer);
}

function validateForm() {
	var validator = $("#login_form").validate({
		rules: {
			username: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			password: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			confirm_password: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			username: {
				required: "Inserire l'username",
				minlength: "L'username deve essere lungo almeno 5 caratteri",
				maxlength: "L'username deve essere lungo al massimo 20 caratteri"
			},
			password: {
				required: "Inserire la password",
				minlength: "La password deve essere lunga almeno 5 caratteri",
				maxlength: "La password deve essere lunga al massimo 20 caratteri"
			},
			confirm_password: {
				required: "Inserire nuovamente la password",
				equalTo: "Le due password non corrispondono"
			},
		}
	});
	if(validator.form()) 
		validateUsername();
}

function validateUsername() {
	var username = $("#login_form").find("#username").val();
	$.ajax({
		type: "POST",
		url: "/checkUsername",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(username),
		complete: function(xhr) {
			var status = JSON.parse(xhr.responseText);
			if(status === 200){
				//Mostrare il form per l'inseriemento degli altri dati in base alla tipologia di account scelto
				var accountType = $('#account_type').find(":selected").text();
				if(accountType === $('#account_type').find("#player").text())
					showPlayerForm();
				else 
					showSportFacilityForm();
			}
			else if (status === 409) {
				$("#login_form").find('img').after('<div class="alert alert-danger d-flex align-items-center" role="alert">' +
										 '<i class="bi bi-exclamation-triangle-fill me-2" width="24"' +
										 'height="24" role="img" aria-label="Danger:"> <use xlink:href="#exclamation-triangle-fill"/></i>' +
										 '<div>Username già esistente.</div>' +
										 '</div>');
			}
		}
	});
}

function emptyForm() {
	$("#login_form").children().slice(1).hide(300);
}

function showPlayerForm() {
	emptyForm();
	var container = document.createElement("div");
	container.className = "d-flex justify-content-between";
	var name = createInputField("text", "name", "Nome");
	var surname = createInputField("text", "surname", "Cognome");
	container.append(name, surname);
	
	var email = createInputField("email", "email", "Email");
	email.title = "Inserire un'email valida";
	
	var birthday = createInputField("date", "birthday", "Data di nascita");
	//Aggiungere controllo data di nascita
	
	var addressLabel = document.createElement("label");
	addressLabel.innerText = "Inserisci il tuo indirizzo";
	addressLabel.className = "mt-3";
	
	var address = document.createElement("div");
	address.id = "address";
	address.className = "mt-2";
	
	var buttonContainer = document.createElement("div");
	buttonContainer.className = "text-center mt-3";
	
	var button = document.createElement("button");
	button.className = "btn btn-primary";
	button.id = "validate_player_form";
	button.innerText = "Registrati";
	$("#login_form").on('click', '#validate_player_form', function(e) {
		e.preventDefault();
		validatePlayerForm();
	});
	buttonContainer.append(button);
	
	var sportLabel = document.createElement("label");
	sportLabel.innerText = "Seleziona i tuoi sport preferiti";
	sportLabel.className = "mt-3";
	
	var sportsContainer = document.createElement("div");
	sportsContainer.className = "carousel d-flex m-4 mt-3";
	sportsContainer.id = "sportsContainer";

	//CAROUSEL DI PROVA
	var div1 = document.createElement("span");
	div1.innerHTML = "PROVA";
	div1.className = "prova badge rounded-pill bg-primary ";

	var div2 = document.createElement("div");
	div2.innerHTML = "PROVA";
	div2.className = "prova badge rounded-pill bg-primary";
	var div3 = document.createElement("div");
	div3.innerHTML = "PROVA";
	div3.className = "prova badge rounded-pill bg-primary";
	var div4 = document.createElement("div");
	div4.innerHTML = "PROVA";
	div4.className = "prova badge rounded-pill bg-primary";
	var div5 = document.createElement("div");
	div5.innerHTML = "PROVA";
	div5.className = "prova badge rounded-pill bg-primary";
	var div6 = document.createElement("div");
	div6.innerHTML = "PROVA";
	div6.className = "prova badge rounded-pill bg-primary";
	var div7 = document.createElement("div");
	div7.innerHTML = "PROVA";
	div7.className = "prova badge rounded-pill bg-primary";
	var div8 = document.createElement("div");
	div8.innerHTML = "PROVA";
	div8.className = "prova badge rounded-pill bg-primary";
	
	sportsContainer.append(div1);
	sportsContainer.append(div2);
	sportsContainer.append(div3);
	sportsContainer.append(div4);
	sportsContainer.append(div5);
	sportsContainer.append(div6);
	sportsContainer.append(div7);
	sportsContainer.append(div8);
	
	$("#login_form").append(container);
	$("#login_form").append(email);
	$("#login_form").append(birthday);
	$("#login_form").append(addressLabel);
	$("#login_form").append(address);
	$("#login_form").append(sportLabel);
	$("#login_form").append(sportsContainer);
	$("#login_form").append(buttonContainer);
	
	$(".carousel").slick({
    	infinite: false,
  		speed: 300,
  		slidesToShow: 4,
  		slidesToScroll: 4
  	});

	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	addressGeocoder.addTo("#address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
	});
}

function showSportFacilityForm() {
	emptyForm();
}

function validatePlayerForm(){
	
}