function showErrorMessage(mes) {
	$("#message_container").find("#message").text(mes);
	$("#message_div").show();
}

function validateGooglePlayerForm() {
	var validator = $("#login_form").validate();

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
		registerGooglePlayer();
}

function validateGoogleSportFacilityForm() {
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
		showGoogleOpeningHours();
}