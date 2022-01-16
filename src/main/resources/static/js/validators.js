function validateForm() {
	var validator = $("#login_form").validate({
		rules: {
			username: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			email: {
				required: true,
  				email: true,
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
			email: {
				required: "Inserisci la tua email",
				email: "Inserire un indirizzo email valido"
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
				validateEmail();
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

function validateEmail() {
	var email = $("#login_form").find("#email").val();
	$.ajax({
		type: "POST",
		url: "/checkEmail",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(email),
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
										 '<div>Email già utilizzata.</div>' +
										 '</div>');
			}
		}
	});
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

function validateSportFacilityForm(){
	var validator = $("#login_form").validate();
	
	$("#name").rules("add", {
  		required: true,
  		maxlength: 20,
  		messages: {
    		required: "Inserisci il tuo nome",
			maxlength: "il nome deve essere lungo al massimo 20 caratteri"
  		}
	});
	
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},
		"Inserisci un numero di telefono valido"
	);
	
	$("#phone").rules("add", {
		regex: "([0-9]{9,10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})|(\([0-9]{4}\)\s+[0-9]{5})",
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
		showOpeningHours(); 	
}

function validateOpenHourForm() {
	
}