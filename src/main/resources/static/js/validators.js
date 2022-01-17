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
	if (validator.form())
		validateUsername();
}

function showErrorMessage(mes) {
	$("#message_container").find("#message").text(mes);
	$("#message_div").show();
}

function validateUsername() {
	var username = $("#login_form").find("#username").val();
	console.log(username);
	$.ajax({
		type: "POST",
		url: "/checkUsername",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(username),
		success: function() {
			$("#message_div").hide();
			console.log("username ok");
			validateEmail();
		},
		error: function() {
			console.log("username errore");
			showErrorMessage("Username già utilizzato!");
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
		success: function() {
			console.log("ok");
			//Mostrare il form per l'inseriemento degli altri dati in base alla tipologia di account scelto
			var accountType = $('#account_type').find(":selected").text();
			if (accountType === $('#account_type').find("#player").text())
				showPlayerForm();
			else
				showSportFacilityForm();
		},
		error: function() {
			console.log("errore");
			showErrorMessage("Email già utilizzata!");
		}
	});
}

function validatePlayerForm() {
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

	$.validator.addMethod('isValid', function() {
		if ((window.address.place_type[0] === "address" || window.address.place_type[0] === "poi")
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

	if (validator.form())
		registerPlayer();
}

function validateSportFacilityForm() {
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

	$.validator.addMethod('isValid', function() {
		if ((window.address.place_type[0] === "address" || window.address.place_type[0] === "poi")
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

	if (validator.form())
		showOpeningHours();
}

function validateOpenHourForm() {

}