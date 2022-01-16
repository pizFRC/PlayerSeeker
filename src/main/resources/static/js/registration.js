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
        $(".step").removeClass("active").eq(index).addClass("active");
    }
}

function prevStep() {
	$("#next_button").text("Avanti");
	var index = $(".step.active").index(".step");
	//$("#next_button").prop("disabled", false);
	if (index > 0) {
        index--;
		$(".step.active").remove();
        $(".step").eq(index).addClass("active");
    };
	if (index === 0) {
		$("#back_button").prop("disabled", true);
	}
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
	
	$("#login_form").append(step);
	$("#login_form").append(navigationBar);
	$("#back_button").prop("disabled", true);
	
	//CAMBIO EVENT HANDLER
	userEventHandler();
	
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
				form.className = "container d-flex";
				var input = document.createElement("input");
				input.type = "checkbox";
				input.className = "btn-check";
				input.id = sport.type;
				$(input).attr("onchange", "handleChange(this)");
				var icon = document.createElement("i");
				icon.className = "bi bi-plus-lg me-1";
				icon.id = sport.type + "_icon";
				var text = document.createElement("p");
				text.innerText = sport.type; 
				var label = document.createElement("label");
				label.className = "sport_selector d-flex justify-content-center align-items-center flex-fill btn btn-outline-light shadow-sm p-1 mb-3 bg-body rounded";
				label.htmlFor = sport.type;
				label.id = sport.type + "_label";
				label.append(icon);
				label.append(text);
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
	step.append(name, surname, dateLabel, birthday, addressLabel, address, sportLabel, sportsContainer);
	
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

function handleChange(checkbox) {
	console.log(checkbox.id);
	$("#" + checkbox.id + "_icon").toggleClass("bi bi-plus-lg bi bi-check-lg");
	$("#" + checkbox.id + "_label").toggleClass("selected_sport");	
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
					/*emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
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
						});*/
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

function createDayRow(dayName, id) {
	var dayRow = document.createElement("div");
	dayRow.className = "row row-cols-4 d-flex align-items-center mb-3";
	
	var day = document.createElement("div");
	day.className = "col";
	day.innerText = dayName;
	
	var toggle = document.createElement("div");
	toggle.className = "col";

	var form = document.createElement("div");
	form.className = "form-check form-switch";
	
	var input = document.createElement("input");
	input.className = "form-check-input";
	input.type = "checkbox";
	$(input).attr("role", "switch");
	input.id = id + "_switch";
	
	var label = document.createElement("label");
	label.className = "form-check-label";
	$(label).attr("for", dayName + "_switch");
	label.innerText = "Chiuso";
	
	form.append(input, label);
	toggle.append(form);

	var open_hour = document.createElement("div");
	open_hour.className = "col";	
	var open_hour_select = document.createElement("select");
	open_hour_select.className = "form-select";
	open_hour_select.id = id + "open_hour";
	
	var placeholder_open = document.createElement("option");
	placeholder_open.value = "";
	$(placeholder_open).attr("disabled", "disabled");
	$(placeholder_open).attr("selected", "selected");
	placeholder_open.text = "Apre alle";
	open_hour_select.append(placeholder_open);
	open_hour.append(open_hour_select);
	
	var close_hour = document.createElement("div");
	close_hour.className = "col";
	var close_hour_select = document.createElement("select");
	close_hour_select.className = "form-select";
	close_hour_select.id = id + "close_hour";
	
	var placeholder_close = document.createElement("option");
	placeholder_open.value = "";
	$(placeholder_close).attr("disabled", "disabled");
	$(placeholder_close).attr("selected", "selected");
	placeholder_close.text = "Chiude alle";
	close_hour_select.append(placeholder_close);
	close_hour.append(close_hour_select);
	
	dayRow.append(day, toggle, open_hour, close_hour);
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
	
	var monday = createDayRow("Lunedì", "lun");
	var tuesday = createDayRow("Martedì", "mar");
	var wednesday = createDayRow("Mercoledì", "mer");
	var thursday = createDayRow("Giovedì", "gio");
	var friday = createDayRow("Venerdì", "ven");
	var saturday = createDayRow("Sabato", "sab");
	var sunday = createDayRow("Domenica", "dom");
	
	container.append(monday, tuesday, wednesday, thursday, friday, saturday, sunday);
	
	step.append(title, subTitle, container);
	$("#login_form").find("#navigation_bar").before(step);
	
	//CAMBIO EVENT HANDLER
	openHourEventHandler();
	
	nextStep();
}

function openHourEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		//validateOpenHourForm();
		showPlaygroundForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		$("#login_form").css('max-width', '450px');
		sportFacilityEventHandler();
		prevStep();
	});
}

function addPlaygrund(index) {
	var container = document.createElement("div");
	
	var title = document.createElement("p");
	title.className = "fs-5";
	title.innerText = "Campo da gioco n. " + index;
	
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
	description.append(textArea);
	
	var photoTitle = document.createElement("p");
	photoTitle.className = "fs-6 mt-3";
	photoTitle.innerText = "Aggiungi le foto del campo";
	
	var addPhoto = document.createElement("button");
	addPhoto.className = "btn btn-outline-primary text-center mt-2";
	addPhoto.id = "add_photo";
	
	var div = document.createElement("div");
	div.className = "row row-cols-1";
	var img = document.createElement("i");
	img.className = "col bi bi-camera";
	var p = document.createElement("p");
	p.className = "fs-6";
	p.innerText = "Aggiungi foto";
	
	div.append(img, p);
	addPhoto.append(div);
	
	container.append(title, label, select, descriptionTitle, description, photoTitle, addPhoto);
	return container;
	
}

function showPlaygroundForm() {
	$("#login_form").css('max-height', '750px');
	$("#login_form").css('overflow-y', 'auto');
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";
	
	var title = document.createElement("p");
	title.className = "fs-3";
	title.innerText = "Aggiungi i campi da gioco della tua struttura";
	
	var subTitle = document.createElement("p");
	subTitle.className = "fs-6 mb-4";
	subTitle.innerText = "Ai clienti sarà suggerita la tua struttura in base ai campi da gioco!";
	
	var addPlaygroundButton = document.createElement("button");
	addPlaygroundButton.className = "add-playground btn btn-primary btn-sm mt-3";
	var icon = document.createElement("i");
	icon.className = "bi bi-plus";
	$(icon).css('color', '#0d6efd');
	addPlaygroundButton.append(icon);
	addPlaygroundButton.innerText = "Aggiungi un nuovo campo";
	
	step.append(title, subTitle, addPlaygrund(1), addPlaygroundButton);
	$("#login_form").find("#navigation_bar").before(step);
	
	//CAMBIO EVENT HANDLER
	nextStep();
}
