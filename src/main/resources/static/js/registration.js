function switchToRegistration(){
	$("#login_form").children().slice(1).remove();
	addAccountSelector();
}

function nextStep() {
	$("#back_button").prop("disabled", false);
	var index = $(".step.active").index(".step"),
    	stepsCount = $(".step").length;
	if (index < stepsCount - 1) {
        index++;
        $(".step").hide();
		$(".step").removeClass("active")
		$(".step").eq(index).addClass("active");
		$(".step.active").show();
    }
}

function prevStep() {
	$("#next_button").text("Avanti");
	var index = $(".step.active").index(".step");
	if (index > 0) {
        index--;
		$(".step.active").remove();
        $(".step").eq(index).addClass("active");
		$(".step.active").show();
    };
	if (index === 0) {
		$("#back_button").prop("disabled", true);
	}
}

function userEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		validateForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		prevStep();
	});
}

function playerEventHandler(){
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		validatePlayerForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		userEventHandler();
		prevStep();
	});
}

function sportFacilityEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		validateSportFacilityForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		userEventHandler();
		prevStep();
	});
}

function openHourEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		getOpeningHours();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		$("#login_form").css('max-width', '450px');
		sportFacilityEventHandler();
		prevStep();
	});
}

function playgroudEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		getPlaygrounds();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		playgroundCount = 1;
		openHourEventHandler();
		prevStep();
	});
}

function registrationSuccessfulMessageEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		document.location.href = "/login";
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		document.location.href = "/";
	});
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
	var messageDiv = document.createElement("div");
	messageDiv.id = "message_div";
	var messageContainer = document.createElement("div");
	messageContainer.id = "message_container";
	messageContainer.className = "alert alert-danger d-flex align-items-center";
	$(messageContainer).attr("role", "alert");
	var icon = document.createElement("i");
	icon.className = "bi bi-exclamation-triangle-fill me-2";
	$(icon).attr("role", "img");
	var message = document.createElement("div");
	message.id = "message";
	messageContainer.append(icon, message);
	messageDiv.append(messageContainer);
	
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step active";
	
	var username = createInputField("username", "username", "Username");
	var email = createInputField("email", "email", "Email");
	email.title = "Inserire un'email valida";
	var password = createInputField("password", "password", "Password");
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
	
	step.append(username, email, password, confirmPassword, container);
	
	var navigationBar = document.createElement("div");
	navigationBar.className = "d-flex justify-content-between mt-4";
	navigationBar.id = "navigation_bar";
	var nextButton = document.createElement("button");
	nextButton.className = "btn btn-primary";
	nextButton.id = "next_button";
	nextButton.innerHTML = "Avanti";
	var backButton = document.createElement("button");
	backButton.className = "btn btn-outline-secondary";
	backButton.id = "back_button";
	backButton.innerText = "Indietro";
	navigationBar.append(backButton, nextButton);
	
	$("#login_form").find('img').after(messageDiv);
	$(messageDiv).hide();
	$("#login_form").append(step);
	$("#login_form").append(navigationBar);
	$("#back_button").prop("disabled", true);
	
	//CAMBIO EVENT HANDLER
	userEventHandler();
	
}

var allSports = new Array();
var sports = new Array();

function showPlayerForm() {
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";
	
	var name = createInputField("text", "name", "Nome");
	var surname = createInputField("text", "surname", "Cognome");
	
	var dateLabel = document.createElement("label");
	dateLabel.innerText = "Inserisci la tua data di nascita";
	dateLabel.className = "mt-3";
	var birthday = createInputField("date", "birthday", "Data di nascita");
	birthday.className = "form-control mt-2";
	//Aggiungere controllo data di nascita
	
	var addressLabel = document.createElement("label");
	addressLabel.innerText = "Inserisci il tuo indirizzo";
	addressLabel.className = "mt-3";
	
	var address = document.createElement("div");
	address.id = "addressDiv";
	address.className = "mt-2";
	
	var sportLabel = document.createElement("label");
	sportLabel.innerText = "Seleziona i tuoi sport preferiti";
	sportLabel.className = "mt-3";
	
	var sportsDiv = document.createElement("div");
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
				allSports.push(sport);
				var form = document.createElement("div");
				form.className = "container d-flex";
				var input = document.createElement("input");
				input.type = "checkbox";
				input.className = "btn-check";
				input.id = sport.id;
				$(sportsContainer).on("change", "#" + input.id, function() {
					var id = this.id;
					$("#" + id + "_icon").toggleClass("bi bi-plus-lg bi bi-check-lg");
					$("#" + id + "_label").toggleClass("selected_sport");
					var index = sports.findIndex(function(element) {
						return element.id == id;
					});
					if (index !== -1) {
						sports.splice(index, 1);
					}
					else {
						sports.push(allSports.find(function(element) {
							return element.id == id;
						}));
					}		
				});
				var icon = document.createElement("i");
				icon.className = "bi bi-plus-lg me-1";
				icon.id = sport.id + "_icon";
				var text = document.createElement("p");
				text.innerText = sport.type; 
				var label = document.createElement("label");
				label.className = "sport_selector d-flex justify-content-center align-items-center flex-fill btn btn-outline-light shadow-sm p-1 mb-3 bg-body rounded";
				label.htmlFor = sport.id;
				label.id = sport.id + "_label";
				label.append(icon);
				label.append(text);
				label.style = "font-size: 85%";
				form.append(input);
				form.append(label);
				sportsContainer.append(form);
			});
    	},
	 	error: {
    		
		}
	});

	sportsDiv.append(sportsContainer);
	step.append(name, surname, dateLabel, birthday, addressLabel, address, sportLabel, sportsDiv);

	$("#login_form").find("#navigation_bar").before(step);

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
	
	//CAMBIO EVENT HANDLER
	$("#next_button").text("Registrati");
	playerEventHandler();
	
	nextStep();
}

function registerPlayer() {
	const user = {
		username: $("#username").val(),
		password: $("#password").val(),
		userType: "player",
		email: $("#email").val()
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
				birthday: new Date($("#birthday").val()),
				address: {
					longitude: window.address.geometry.coordinates[0],
					latitude: window.address.geometry.coordinates[1],
				},
				sports
			};
			$.ajax({
				type: "POST",
				url: "/registerPlayer",
				contentType: "application/json",
				data: JSON.stringify(player),
				success: function() {
					registrationSuccessfulMessage();
					//INVIO EMAIL
					emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
					var templateParams = {
						to_name: $("#name").val(),
						to_email: $("#email").val(),
						message: "Complimenti, la registrazione è avvenuta con successo."
					};
					emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
						.then(function() {
							var messageContainer = document.createElement("div");
							messageContainer.id = "message_container";
							messageContainer.className = "alert alert-primary d-flex align-items-center mb-3";
							$(messageContainer).attr("role", "alert");
							var icon = document.createElement("i");
							icon.className = "bi bi-info-circle-fill me-2";
							$(icon).attr("role", "img");
							var message = document.createElement("div");
							message.id = "message";
							$(message).text("Ti è stata inviata un'email di conferma")
							messageContainer.append(icon, message);
							$("#login_form").find("#navigation_bar").before(messageContainer);
						}, function() {
							var messageContainer = document.createElement("div");
							messageContainer.id = "message_container";
							messageContainer.className = "alert alert-warning d-flex align-items-center mb-3";
							$(messageContainer).attr("role", "alert");
							var icon = document.createElement("i");
							icon.className = "bi bi-exclamation-triangle-fill me-2";
							$(icon).attr("role", "img");
							var message = document.createElement("div");
							message.id = "message";
							$(message).text("A causa di un problema temporaneo non è stato possibile inviare l'email di conferma'")
							messageContainer.append(icon, message);
							$("#login_form").find("#navigation_bar").before(messageContainer);
						});
				},
				error: function(textStatus) {
					console.log(textStatus);
				}
			});
    	},
		error: function(textStatus){
			console.log(textStatus);
		}
	});
}

function registrationSuccessfulMessage() {
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";

	var alert = document.createElement("div");
	alert.className = "alert alert-success mt-3 mb-3";
	alert.id = "successful_message";
	$(alert).attr("role", "alert");
	var title = document.createElement("h4");
	title.className = "alert-heading";
	title.innerText = "Registrazione avvenuta con successo!";
	var line = document.createElement("hr");
	var text = document.createElement("p");
	text.innerText = "Benvenuto nella community di Player Seeker. Effettua subito il login ed inizia a cercare" 
				   + " eventi sportivi o a crearne di nuovi!"
	
	alert.append(title, line, text);
	step.append(alert);
	$("#next_button").text("Effettua il login");
	$("#back_button").text("Torna alla home");
	$("#login_form").find("#navigation_bar").before(step);
	
	//CAMBIO EVENT HANDLER
	registrationSuccessfulMessageEventHandler();
	nextStep();
}

function showSportFacilityForm() {
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";
		
	var name = createInputField("text", "name", "Nome della struttura");
	var phone = createInputField("tel", "phone", "Numero di telefono");
	phone.pattern = "[0-9]{9,10}";
	
	var webSite = createInputField("text", "web_site", "URL del tuo sito web");
	
	var addressLabel = document.createElement("label");
	addressLabel.innerText = "Inserisci l'indirizzo della struttura";
	addressLabel.className = "mt-3";
	
	var address = document.createElement("div");
	address.id = "addressDiv";
	address.className = "mt-2";
	
	step.append(name, phone, webSite, addressLabel, address);
	$("#login_form").find("#navigation_bar").before(step);
	
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
	
	//CAMBIO EVENT HANDLER
	sportFacilityEventHandler();
	nextStep();
}

function createDayRow(dayName, id) {
	var dayRow = document.createElement("div");
	dayRow.className = "row row-cols-4 d-flex align-items-center mb-3";
	
	var day = document.createElement("div");
	day.className = "col-2";
	day.innerText = dayName;
	
	var toggle = document.createElement("div");
	toggle.className = "col-2";

	var form = document.createElement("div");
	form.className = "form-check form-switch";
	
	var input = document.createElement("input");
	input.className = "form-check-input";
	input.type = "checkbox";
	$(input).attr("role", "switch");
	input.id = id;
	$(input).on("change", function() {
		if($(this).is(':checked')) {
			$("#" + this.id + "_label").text("Aperto");
			$(open_hour).attr("disabled", false);
			$(close_hour).attr("disabled", false);
		}
		else {
			$("#" + this.id + "_label").text("Chiuso");
			$(open_hour).attr("disabled", "disabled");
			$(close_hour).attr("disabled", "disabled");
		}
	});
	
	var label = document.createElement("label");
	label.className = "form-check-label";
	label.id = id + "_label";
	$(label).attr("for", id);
	label.innerText = "Chiuso";
	
	form.append(input, label);
	toggle.append(form);

	var open_hour_div = document.createElement("div");
	open_hour_div.className = "d-flex justify-content-center col-4";	
	var open_hour_label = document.createElement("label");
	open_hour_label.className = "me-2";
	open_hour_label.innerText = "Apre alle:"
	var open_hour = document.createElement("input");
	open_hour.type = "time";
	open_hour.id = id + "_oper_hour"
	$(open_hour).attr("disabled", "disabled");
	open_hour_div.append(open_hour_label, open_hour);
	
	var close_hour_div = document.createElement("div");
	close_hour_div.className = "d-flex justify-content-center col-4";	
	var close_hour_label = document.createElement("label");
	close_hour_label.className = "me-2";
	close_hour_label.innerText = "Chiude alle:"
	var close_hour = document.createElement("input");
	close_hour.type = "time";
	close_hour.id = id + "_close_hour"
	$(close_hour).attr("disabled", "disabled");
	close_hour_div.append(close_hour_label, close_hour);
	
	dayRow.append(day, toggle, open_hour_div, close_hour_div);
	return dayRow;
}

function showOpeningHours() {
	$("#login_form").css('max-width', '750px');
	
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";
	
	var title = document.createElement("p");
	title.className = "fs-3";
	title.innerText = "Aggiungi gli orari di apertura";
	
	var subTitle = document.createElement("p");
	subTitle.className = "fs-6 mb-4";
	subTitle.innerText = "Fai sapere ai tuoi clienti quando la tua struttura è aperta!";
	
	var container = document.createElement("div");
	container.className = "container";
	container.id = "days";
	
	var monday = createDayRow("Lunedì", "1");
	var tuesday = createDayRow("Martedì", "2");
	var wednesday = createDayRow("Mercoledì", "3");
	var thursday = createDayRow("Giovedì", "4");
	var friday = createDayRow("Venerdì", "5");
	var saturday = createDayRow("Sabato", "6");
	var sunday = createDayRow("Domenica", "7");
	
	container.append(monday, tuesday, wednesday, thursday, friday, saturday, sunday);
	
	step.append(title, subTitle, container);
	$("#login_form").find("#navigation_bar").before(step);
	
	//CAMBIO EVENT HANDLER
	openHourEventHandler();
	nextStep();
}

var openingHours = new Array();
function getOpeningHours() {
	var count = 0;
	var check = true;
	$('#days input:checked').each(function() {
		count++;
		if(!$("#" + this.id + "_oper_hour").val() || !$("#" + this.id + "_close_hour").val()){
			check = false;
			return;
		}
		var day = {
			day : this.id,
			openTime: $("#" + this.id + "_oper_hour").val(),
			closeTime: $("#" + this.id + "_close_hour").val()
		}
		openingHours.push(day);
	});
	if(count === 0){
		showErrorMessage("Selezionare almeno un giorno di apertura e inserire i relativi orari");
		return;
	}
	if(!check){
		showErrorMessage("Inserire gli orari per per i giorni selezionati");
		return;
	}
	$("#message_div").hide();
	showPlaygroundForm();
}

var playgroundCount = 1;
function addPlaygrund(index) {
	var container = document.createElement("div");
	container.id = "parent_" + index;
	container.className = "playground";
	
	var titleDiv = document.createElement("div");
	titleDiv.className = "d-flex mt-4";
	var title = document.createElement("p");
	title.className = "fs-5 fw-bold me-3";
	title.innerText = "Campo da gioco n. " + index;
	if (index > 1) {
		var deletePlaygroundButton = document.createElement("button");
		deletePlaygroundButton.className = "delete-playground btn btn-outline-danger btn-sm";
		deletePlaygroundButton.id = index;
		deletePlaygroundButton.innerHTML = '<i class = "bi bi-dash" style = "color: #dc3545" ></i> Elimina campo';
		$(deletePlaygroundButton).on("click", function(event) {
			event.preventDefault();
						console.log($("#parent_" + this.id));
			$("#parent_" + this.id).remove();

			playgroundCount--;
		});
		titleDiv.append(title, deletePlaygroundButton);
	}
	else {
		titleDiv.append(title);
	}
	
	var label = document.createElement("label");
	label.className = "form-label mt-3";
	label.htmlFor = "sport"
	label.innerHTML = "Scegli lo sport praticabile nel campo";
	
	var select = document.createElement("select");
	select.className = "form-select";
	select.id = "sport";
	
	$.ajax({
		type: "POST",
		url: "/getSportList",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function (list) { 
			$.each(list, function(index, sport) {
				allSports.push(sport);
				var option = document.createElement("option");
				option.id = sport.type;
				option.innerHTML = sport.type;
				select.append(option);
			});
    	},
	 	statusCode: {
    		503: function() {
    	  		 	alert( "Problema");
 				 }
		}
	});
	
	var descriptionTitle = document.createElement("p");
	descriptionTitle.className = "fs-6 mt-3";
	descriptionTitle.innerText = "Aggiungi una descrizione";
	
	var description = document.createElement("div");
	description.className = "input-group mt-2";
	var textArea = document.createElement("textarea");
	textArea.className = "form-control";
	textArea.id = "description";
	description.append(textArea);
	
	var photoTitle = document.createElement("p");
	photoTitle.className = "fs-6 mt-3";
	photoTitle.innerText = "Aggiungi le foto del campo";
	
	/*var photoDiv = document.createElement("div");
	photoDiv.className = "d-flex mt-2 mb-2";
	var addPhoto = document.createElement("button");
	addPhoto.className = "btn btn-outline-primary text-center me-3";
	addPhoto.id = "add_photo";
	addPhoto.name = index;
	$(addPhoto).css("min-height", "100px");
	$(addPhoto).on("click", function(event) {
		event.preventDefault();
		$(this).siblings("#photos").trigger('click');
	});
	var div = document.createElement("div");
	div.className = "row row-cols-1";
	var img = document.createElement("i");
	img.className = "col bi bi-camera";
	var p = document.createElement("p");
	p.className = "fs-6";
	p.innerText = "Aggiungi foto";
	div.append(img, p);
	addPhoto.append(div);
	var inputFile = document.createElement("input");
	inputFile.id = "photos";
	inputFile.type = "file";
	$(inputFile).attr('multiple', true);
	$(inputFile).hide();
	
	photoDiv.append(addPhoto, inputFile);*/

	container.append(titleDiv, label, select, descriptionTitle, description);
	return container;
}

function showPlaygroundForm() {
	$("#login_form").css('max-height', '750px');
	$("#login_form").css('overflow-y', 'auto');
	var step = document.createElement("div");
	step.id = "playgrounds";
	step.className = "step";
	
	var title = document.createElement("p");
	title.className = "fs-3";
	title.innerText = "Aggiungi i campi da gioco della tua struttura";
	
	var subTitle = document.createElement("p");
	subTitle.className = "fs-6 mb-4";
	subTitle.innerText = "Ai clienti sarà suggerita la tua struttura in base ai campi da gioco!";
	
	var addPlaygroundButton = document.createElement("button");
	addPlaygroundButton.className = "add-playground btn btn-primary btn-sm mt-4";
	addPlaygroundButton.id = "add_playgroud_button"
	addPlaygroundButton.innerHTML = '<i class = "bi bi-plus" style = "color: #0d6efd" ></i> Aggiungi un nuovo campo';
	$(addPlaygroundButton).on("click", function(event) {
		event.preventDefault();
		$(step).find("#add_playgroud_button").before(addPlaygrund(++playgroundCount));
	});
	
	step.append(title, subTitle, addPlaygrund(playgroundCount), addPlaygroundButton);
	$("#login_form").find("#navigation_bar").before(step);
	
	//CAMBIO EVENT HANDLER
	$("#next_button").text("Registrati");
	playgroudEventHandler();
	nextStep();
}

var playgrounds = new Array();
function getPlaygrounds(){

	$('#playgrounds').children('.playground').each(function () {
		var element = this;
		var selectedSport = $(element).find('#sport').val();
    	$.ajax({
		type: "POST",
		url: "/getPlaygroundId",
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function (id) { 
			//Creazione playground
			var playground = {
				id: id,
				description: $(element).find('textarea').val(),
				sport: allSports.find(function(element) { return element.type == selectedSport; }),
			}
			playgrounds.push(playground);
    	},
	 	error: {
    		
		}
		});
	});
	
	registerSportFacility();
}

function registerSportFacility() {
	const user = {
		username: $("#username").val(),
		password: $("#password").val(),
		userType: "sport_facility",
		email: $("#email").val()
	};
	
	$.ajax({
		type: "POST",
		url: "/registerUser",
		contentType: "application/json",
		data: JSON.stringify(user),
		success: function(User) {
			const sportFacility = {
				id: User.id,
				name: $("#name").val(),
				address: {
					longitude: window.address.geometry.coordinates[0],
					latitude: window.address.geometry.coordinates[1],
				},
				phone: $("#phone").val(),
				webSiteUrl: $("#web_site").val(),
				openingHours,
				playgrounds,
			};
			$.ajax({
				type: "POST",
				url: "/registerSportFacility",
				contentType: "application/json",
				data: JSON.stringify(sportFacility),
				success: function() {
					registrationSuccessfulMessage();
					//INVIO EMAIL
					/*emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
					var templateParams = {
						to_name: $("#name").val(),
						to_email: $("#email").val(),
						message: "Complimenti, la registrazione è avvenuta con successo."
					};
					emailjs.send('player_seeker_service', 'player_seeker_template', templateParams)
						.then(function() {
							var messageContainer = document.createElement("div");
							messageContainer.id = "message_container";
							messageContainer.className = "alert alert-primary d-flex align-items-center mb-3";
							$(messageContainer).attr("role", "alert");
							var icon = document.createElement("i");
							icon.className = "bi bi-info-circle-fill me-2";
							$(icon).attr("role", "img");
							var message = document.createElement("div");
							message.id = "message";
							$(message).text("Ti è stata inviata un'email di conferma")
							messageContainer.append(icon, message);
							$("#login_form").find("#navigation_bar").before(messageContainer);
						}, function() {
							var messageContainer = document.createElement("div");
							messageContainer.id = "message_container";
							messageContainer.className = "alert alert-warning d-flex align-items-center mb-3";
							$(messageContainer).attr("role", "alert");
							var icon = document.createElement("i");
							icon.className = "bi bi-exclamation-triangle-fill me-2";
							$(icon).attr("role", "img");
							var message = document.createElement("div");
							message.id = "message";
							$(message).text("A causa di un problema temporaneo non è stato possibile inviare l'email di conferma'")
							messageContainer.append(icon, message);
							$("#login_form").find("#navigation_bar").before(messageContainer);
						});*/
				},
				error: function(textStatus) {
					console.log(textStatus);
				}
			});
    	},
		error: function(textStatus){
			console.log(textStatus);
		}
	});
}
