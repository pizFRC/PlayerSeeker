var _googleId = null;
var _name = null;
var _surname = null;
var _email = null;

function switchToGoogleRegistration(id, n, s, e){
	_googleId = id;
	_name = n;
	_surname = s;
	_email = e;
	$("#login_form").children().slice(1).remove();
	addGoogleAccountSelector();
}

function googleUserEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		var accountType = $('#account_type').find(":selected").text();
		if (accountType === $('#account_type').find("#player").text())
			showGooglePlayerForm();
		else
			showGoogleSportFacilityForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		prevStep();
	});
}

function googlePlayerEventHandler(){
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		validateGooglePlayerForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		googleUserEventHandler();
		prevStep();
	});
}

function googleSportFacilityEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		validateGoogleSportFacilityForm();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		googleUserEventHandler();
		prevStep();
	});
}

function googleOpenHourEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		getGoogleOpeningHours();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		$("#login_form").css('min-width', '450px');
		googleSportFacilityEventHandler();
		prevStep();
	});
}

function googlePlaygroudEventHandler() {
	$("#next_button").unbind();
	$("#next_button").on("click", function(event) {
		event.preventDefault();
		getGooglePlaygrounds();
	});
	$("#back_button").unbind();
	$("#back_button").on("click", function(event) {
		event.preventDefault();
		playgroundCount = 1;
		googleOpenHourEventHandler();
		prevStep();
	});
}

function addGoogleAccountSelector() {
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
	
	var title = document.createElement("p");
	title.className = "fs-3";
	title.innerText = "Benvenuto su Player Seeker";
	
	var subTitle = document.createElement("p");
	subTitle.className = "fs-6 mb-4";
	subTitle.innerText = "Conosciamoci meglio, dicci qualcosa su di te!";
	
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
	
	step.append(title, subTitle, container);
	
	var navigationBar = document.createElement("div");
	navigationBar.className = "d-flex justify-content-between mt-5";
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
	googleUserEventHandler();
	
}

var allSports = new Array();
var sports = new Array();

function showGooglePlayerForm() {
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";
	
	var title = document.createElement("p");
	title.className = "fs-3";
	title.innerText = "Benvenuto su Player Seeker";
	
	var subTitle = document.createElement("p");
	subTitle.className = "fs-6 mb-4";
	subTitle.innerText = "Conosciamoci meglio, dicci qualcosa su di te!";
	
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
	step.append(title, subTitle, dateLabel, birthday, addressLabel, address, sportLabel, sportsDiv);

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
	googlePlayerEventHandler();

	nextStep();
}

function registerGooglePlayer() {
	const user = {
		googleId: _googleId,
		userType: "player",
		email: _email
	};
	
	$.ajax({
		type: "POST",
		url: "/registerUser",
		contentType: "application/json",
		data: JSON.stringify(user),
		success: function(User) {
			const player = {
				id: User.id,
				name: _name,
				surname: _surname,
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
						to_name: _name,
						to_email: _email,
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

function showGoogleSportFacilityForm() {
	var step = document.createElement("div");
	step.id = "step";
	step.className = "step";
	
	var title = document.createElement("p");
	title.className = "fs-3";
	title.innerText = "Benvenuto su Player Seeker";
	
	var subTitle = document.createElement("p");
	subTitle.className = "fs-6 mb-4";
	subTitle.innerText = "Ora qualche informazione sulla tua struttura!";
		
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
	
	step.append(title, subTitle, name, phone, webSite, addressLabel, address);
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
	googleSportFacilityEventHandler();
	nextStep();
}

function showGoogleOpeningHours() {
	$("#login_form").css('min-width', '700px');
	
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
	googleOpenHourEventHandler();
	nextStep();
}

var openingHours = new Array();
function getGoogleOpeningHours() {
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
	showGooglePlaygroundForm();
}

function showGooglePlaygroundForm() {
	console.log("show playground 2");
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
	googlePlaygroudEventHandler();
	nextStep();
}

var playgrounds = new Array();
function getGooglePlaygrounds(){
console.log("playground 2");
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
	
	registerGoogleSportFacility();
}

function registerGoogleSportFacility() {
	console.log("google registration");
	const user = {
		googleId: _googleId,
		userType: "sport_facility",
		email: _email
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
					emailjs.init("user_BBCOuErVHBtOAapPkMCjn");
					var templateParams = {
						to_name: $("#name").val(),
						to_email: _email,
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
