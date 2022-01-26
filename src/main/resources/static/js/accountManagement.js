var address = null;
$(document).ready(function(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	addressGeocoder.addTo("#addressDiv");
	$($("#addressDiv").find("input")).attr("id", "address");
	$($("#addressDiv").find("input")).addClass("form-control");
	$($("#addressDiv").find("input")).attr("name", "address");
	addressGeocoder.on('result', function(e) {
		address = e.result;
	});
});

function showAccountSettings(){
	$(".button").removeClass("selected");
	$("#account_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person");
	$("#account_button").find("i").addClass("bi-person-fill");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#playground_button").find("i").removeClass("bi-puzzle-fill");
	$("#playground_button").find("i").addClass("bi-puzzle");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#accountDiv").addClass("active");
}

function showPasswordSettings(){
	$(".button").removeClass("selected");
	$("#password_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key");
	$("#password_button").find("i").addClass("bi-key-fill");
	$("#playground_button").find("i").removeClass("bi-puzzle-fill");
	$("#playground_button").find("i").addClass("bi-puzzle");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#passwordDiv").addClass("active");
}

function showPlaygroudsSettings(){
	$(".button").removeClass("selected");
	$("#playground_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#playground_button").find("i").removeClass("bi-puzzle");
	$("#playground_button").find("i").addClass("bi-puzzle-fill");
	$("#event_button").find("i").removeClass("bi-calendar2-event-fill");
	$("#event_button").find("i").addClass("bi-calendar2-event");
	$(".section").removeClass("active");
	$("#playgroundDiv").addClass("active");
}

function showEventsSettings(){
	$(".button").removeClass("selected");
	$("#event_button").addClass("selected");
	$("#account_button").find("i").removeClass("bi-person-fill");
	$("#account_button").find("i").addClass("bi-person");
	$("#password_button").find("i").removeClass("bi-key-fill");
	$("#password_button").find("i").addClass("bi-key");
	$("#playground_button").find("i").removeClass("bi-puzzle-fill");
	$("#playground_button").find("i").addClass("bi-puzzle");
	$("#event_button").find("i").removeClass("bi-calendar2-event");
	$("#event_button").find("i").addClass("bi-calendar2-event-fill");
	$("#organized_button").addClass("selected");
	$(".section").removeClass("active");
	$("#eventsDiv").addClass("active");
	$("#organized").addClass("active");
}


function showOrganized(){
	$("#organized_button").addClass("selected");
	$("#participate_button").removeClass("selected");
	$("#organized").addClass("active");
	$("#partecipate").removeClass("active");
}

function showParticipate(){
	$("#organized_button").removeClass("selected");
	$("#participate_button").addClass("selected");
	$("#organized").removeClass("active");
	$("#partecipate").addClass("active");
}

var validUsername = true;
var validEmail = true;

function usernameCheckResult(result){
	validUsername = result;
}

function emailCheckResult(result){
	validEmail = result;
}

function updateAccount(event, userId, username, email){
	event.preventDefault();
	var validator = $("#account_form").validate({
		rules: {
			name: {
				required: true,
				maxlength: 20
			},
			surname: {
				required: true,
				maxlength: 20
			},
			username: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			email: {
				required: true,
				email: true,
			},
			birthday: {
				required: true,
				date: true
			},
			address: {
				required: true,
				isValid: true,
			}
		},
		messages: {
			name: {
				required: "Inserisci il tuo nome",
				maxlength: "il nome deve essere lungo al massimo 20 caratteri"
			},
			surname: {
				required: "Inserisci il tuo nome",
				maxlength: "il nome deve essere lungo al massimo 20 caratteri"
			},
			username: {
				required: "Inserire l'username",
				minlength: "L'username deve essere lungo almeno 5 caratteri",
				maxlength: "L'username deve essere lungo al massimo 20 caratteri"
			},
			email: {
				required: "Inserisci la tua email",
				email: "Inserire un indirizzo email valido"
			},
			birthday: {
				required: "Inserisci la tua data di nascita",
				date: "Inserisci una data valida"
			},
			address: {
				required: "Inserisci il tuo indirizzo"
			}
		}
	});

	$.validator.addMethod('isValid', function() {
		if(address == null)
			return false;
		if ((address.place_type[0] === "address" || address.place_type[0] === "poi")
			&& address.place_name === $("#address").val())
			return true;
		else
			return false;
	}, 'Inserire un indirizzo valido');

	if (validator.form()) {
		if ($("#username").val() != username) {
			validateUsername();
		}
		if ($("#email").val() != email) {
			validateEmail();
		}

		if (validUsername && validEmail) {
			const user = {
				id: userId,
				username: $("#username").val(),
				email: $("#email").val()
			};

			$.ajax({
				type: "POST",
				url: "/updateUser",
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(user),
				success: function() {
					const player = {
						id: userId,
						name: $("#name").val(),
						surname: $("#surname").val(),
						birthday: new Date($("#birthday").val()),
						address: {
							longitude: address.geometry.coordinates[0],
							latitude: address.geometry.coordinates[1],
						},
					};
					$.ajax({
						type: "POST",
						url: "/updatePlayer",
						contentType: "application/json",
						data: JSON.stringify(player),
						success: function() {
							$('#success_modal').modal('show');  
							//INVIO EMAIL
							emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
							var templateParams = {
								to_name: $("#name").val(),
								to_email: $("#email").val(),
								message: "Complimenti, il tuo account è stato aggiornato con successo!"
							};
							emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
								.then(function() {}, function() {});
						},
						error: function() {
							$('#error_modal').modal('show');  
						}
					});
				},
				error: function() {
					$('#error_modal').modal('show');  
				}
			});
		}
	}	
}

function showAccountErrorMessage(message){
	$("#account_error").find("p").text(message);
	$("#account_error").show();
}

function validateUsername() {
	var username = $("#account_form").find("#username").val();
	$.ajax({
		type: "POST",
		url: "/checkUsername",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(username),
		success: function() {
			usernameCheckResult(true);
		},
		error: function() {
			showAccountErrorMessage("Username già utilizzato!");
			usernameCheckResult(false);
		}
	});
}

function validateEmail() {
	var email = $("#account_form").find("#email").val();
	$.ajax({
		type: "POST",
		url: "/checkEmail",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(email),
		success: function() {
			emailCheckResult(true);
		},
		error: function() {
			showAccountErrorMessage("Email già utilizzata!");
			emailCheckResult(false);
		}
	});
}

function updatePassword(event, userId){
	event.preventDefault();
	var validator = $("#password_form").validate({
		rules: {
			current_password: {
				required: true,
				minlength: 5,
				maxlength: 20
			},
			password: {
				required: true,
				notEqualTo: "#current_password",
				minlength: 5,
				maxlength: 20
			},
			confirm_password: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			current_password: {
				required: "Inserire la password",
				minlength: "La password deve essere lunga almeno 5 caratteri",
				maxlength: "La password deve essere lunga al massimo 20 caratteri"
			},
			password: {
				required: "Inserire la password",
				minlength: "La password deve essere lunga almeno 5 caratteri",
				maxlength: "La password deve essere lunga al massimo 20 caratteri"
			},
			confirm_password: {
				required: "Inserire nuovamente la password",
				equalTo: "Le due password non corrispondono"			
			}
		}
	});
	
	$.validator.addMethod('notEqualTo', function(value, element, param) {
		return this.optional(element) || value === param;
	}, 'Inserire una password diversa da quella attuale');
	
	if (validator.form()) {
		validatePassword();
		if(validPassword){
			const user = {
				id: userId,
				password: $("#password_form").find("#password").val()
			};
			$.ajax({
				type: "POST",
				url: "/updatePassword",
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(user),
				success: function() {
					$('#success_modal').modal('show');  
				},
				error: function() {
					$('#error_modal').modal('show');  
				}
			});
		}
	}
}

function showPasswordErrorMessage(message){
	$("#password_error").find("p").text(message);
	$("#password_error").show();
}

var validPassword = true;
function passwordCheckResult(result) {
	validPassword = result;
}

function validatePassword(){
	var password = $("#password_form").find("#current_password").val();
	$.ajax({
		type: "POST",
		url: "/checkPassword",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		data: JSON.stringify(password),
		success: function() {
			passwordCheckResult(true);
		},
		error: function() {
			showPasswordErrorMessage("Password non corretta!");
			passwordCheckResult(false);
		}
	});
}

function openOrClose(checkbox){
	if($(checkbox).is(':checked')) {
		$('#hour_modal').find("#open_hour").prop("disabled", false);
		$('#hour_modal').find("#close_hour").prop("disabled", false);
		$('#hour_modal').find("#status").text("Aperto");
	}
	else {
		$('#hour_modal').find("#status").text("Chiuso");
		$('#hour_modal').find("#open_hour").prop("disabled", true);
		$('#hour_modal').find("#close_hour").prop("disabled", true);
	}
}

function modifyHour(event, button){
	event.preventDefault();
	$('#hour_modal').find("#day").text($(button).closest("tr").find(".day").text());
	if($(button).closest("tr").find(".open").text() === "Chiuso"){
		$('#hour_modal').find("#status").text("Chiuso");
		$('#hour_modal').find("#open_hour").prop("disabled", true);
		$('#hour_modal').find("#close_hour").prop("disabled", true);
		$('#hour_modal').find("#checkbox").prop('checked', false);
	}
	else {
		$('#hour_modal').find("#open_hour").prop("disabled", false);
		$('#hour_modal').find("#close_hour").prop("disabled", false);
		$('#hour_modal').find("#status").text("Aperto");
		$('#hour_modal').find("#checkbox").prop('checked', true);
	}
	$('#hour_modal').find("#open_hour").val($(button).closest("tr").find(".open").text());
	$('#hour_modal').find("#close_hour").val($(button).closest("tr").find(".close").text());
	$('#hour_modal').modal('show');
}

function changeHours(event){
	event.preventDefault();	
}

