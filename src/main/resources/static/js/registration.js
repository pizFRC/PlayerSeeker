function switchToRegistration(){
	$("#login_form").find("#to_hide").hide(300);
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
	address.id = "addressDiv";
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
	
	$.ajax({
		type: "POST",
		url: "/getSportList",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function (list) { 
			$.each(list, function(index, sport) {
				var form = document.createElement("div");
				form.className = "container";
				var input = document.createElement("input");
				input.type = "checkbox";
				input.className = "btn-check";
				input.id = sport.type;
				var label = document.createElement("label");
				label.className = "btn btn-primary";
				label.htmlFor = sport.type;
				label.innerText = sport.type;
				label.style = "font-size: 85%";
				form.append(input);
				form.append(label);
				sportsContainer.append(form);
			});
    	},
	 	statusCode: {
    		503: function() {
    	  		 	alert( "Problema");
 				 }
		}
	});
	
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
  		slidesToShow: 3,
  		slidesToScroll: 3
  	});

	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	addressGeocoder.addTo("#addressDiv");
	$($("#addressDiv").find("input")).attr("id", "address");
	$($("#addressDiv").find("input")).attr("name", "address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
		window.address = e.result;
	});
}


function showSportFacilityForm() {
	emptyForm();
}

function validatePlayerForm(){
	var validator = $("#login_form").validate();
	
	$("#name").rules("add", {
  		required: true,
  		maxlength: 20,
  		messages: {
    		required: "Inserisci il tuo nome",
			maxlength: "il nome deve essere lungo al massimo 20 caratteri"
  		}
	});
	
	$("#surname").rules("add", {
  		required: true,
  		maxlength: 20,
  		messages: {
    		required: "Inserisci il tuo cognome",
			maxlength: "il cognome deve essere lungo al massimo 20 caratteri"
  		}
	});
	
	$("#email").rules("add", {
  		required: true,
  		email: true,
  		messages: {
    		required: "Inserisci la tua email",
			email: "Inserire un indirizzo email valido"
  		}
	});
	
	$("#birthday").rules("add", {
  		required: true,
  		date: true,
  		messages: {
    		required: "Inserisci la tua data di nascita",
			date: "Inserisci una data valida"
  		}
	});
	
	$.validator.addMethod('isValid', function () {
		if((window.address.place_type[0] === "address" || window.address.place_type[0] === "poi") 
		 	&& window.address.place_name === $("#address").val())
			return true;
		else
			return false;
	}, 'Inserire un indirizzo valido');
	
	$("#address").rules("add", {
  		required: true,
		isValid: true,
  		messages: {
    		required: "Inserisci il tuo indirizzo"
  		}
	});
	
	if(validator.form()) 
		registerPlayer();
}

function registerPlayer() {
	
	const user = {
		username: $("#username").val(),
		password: $("#password").val(),
		userType: "player"
	};
	
	$.ajax({
		type: "POST",
		url: "/registerUser",
		contentType: "application/json",
		data: JSON.stringify(user),
		success: function(User) {
			const player = {
				id: User.id,
				name: $("#name").val(),
				surname: $("#surname").val(),
				email: $("#email").val(),
				birthday: new Date($("#birthday").val()),
				address: {
					longitude: window.address.geometry.coordinates[0],
					latitude: window.address.geometry.coordinates[1],
				}
			};
			$.ajax({
				type: "POST",
				url: "/registerPlayer",
				contentType: "application/json",
				data: JSON.stringify(player),
				success: function() {
					//INVIO EMAIL
					emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
					var templateParams = {
						to_name: $("#name").val(),
						to_email: $("#email").val(),
						message: "Complimenti, la registrazione è avvenuta con successo."
					};
					emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
						.then(function(response) {
							console.log('SUCCESS!', response.status, response.text);
						}, function(error) {
							console.log('FAILED...', error);
						});
				},
				error: function(textStatus) {
					console.log(textStatus);
				}
			});
    	},
		error: function(textStatus){
			consoe.log(textStatus);
		}
	});
	
	/*const player = {
  		name: $("#name").val(),
  		surname: $("#surname").val(),
		email: $("#email").val(),
		birthday: new Date($("#birthday").val()),
		address: {
			longitude: window.address.geometry.coordinates[0],
			latitude: window.address.geometry.coordinates[1],
		}
	};
	
	const data = {
		obj1: user,
		obj2: player
	}
	
	$.ajax({
		type: "POST",
		url: "/registerPlayer",
		contentType: "application/json",
		data: JSON.stringify(data),
		complete: function(xhr) {
			var status = JSON.parse(xhr.responseText);
			if(status === 200){
				emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
				var templateParams = {
					to_name: $("#name").val(),
					to_email: $("#email").val(),
					message: "Complimenti, la registrazione è avvenuta con successo."
				};
				
				emailjs.send('player_seeker_service', 'Yplayer_seeker_template', templateParams)
					.then(function(response) {
						console.log('SUCCESS!', response.status, response.text);
					}, function(error) {
						console.log('FAILED...', error);
					});
			}
			else if (status === 409) {
				
			}
		}
	});*/
}