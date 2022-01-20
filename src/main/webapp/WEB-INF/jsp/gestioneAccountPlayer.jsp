<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
	<jsp:include page="head.jsp"/>
	<!-- Mapbox CSS-->
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />
	<title>Player Seeker - Gestione Struttura</title>
	<style>
	
	body {
		background-color: #eaf4f4;
	}
	
	.menu-item{
		display: inline-flex;
		align-items: center;
		background-color: transparent;
		border: none;
		font-size: small;
	}

	.menu-item.selected {
		font-weight: bold;
		color: #00a896;
	}
	
	.menu-icon {
		font-size: 2rem;
	}
	
	.section {
		display: none;
	}
	
	.section.active {
		display: block;
	}
	
	</style>
</head>

<body style = "padding-top: 80px;">
	<!-- HEADER --->
	<jsp:include page="header.jsp"/>
	
	<div class= "row h-100 p-5">
		<div class="col-3 p-3">
			<div class="pt-5 pb-5 ps-4 pe-4 shadow-sm p-3 mb-5 bg-body rounded">
				<div class = "d-flex justify-content-center mb-2">
					<i class="bi bi-person-circle" style = "font-size: 5rem;"></i>
				</div>
				<div class = "d-flex justify-content-center">
					<p class="fs-3 d-block">Nome Cognome</p>
				</div>
				<div id = "menu" class = "d-grid gap-4 mt-4">
					<button id="account_button" onclick="showAccountSettings()" class="button raleway_font text-start menu-item selected"> <i class="bi bi-person-fill menu-icon me-3"></i> Account</button>
  					<button id="password_button" onclick="showPasswordSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-key menu-icon me-3"></i> Password</button>
  					<button id="event_button" onclick="showEventsSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-calendar2-event menu-icon me-3"></i> Eventi</button>
				</div>
			</div>
		</div>
    	
    	<div class="col-9 p-3">
    		<!-- ACCOUNT SETTINGS -->
    		<div id = "accountDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section active">
    			<p class="fs-2 d-block">Impostazioni account</p>
    			<p class="fs-6 d-block">Aggiorna i dati del tuo account</p>
    			<div class="row">
					<form class="row g-3">
						<div class="col-md-6">
							<label for="name" class="form-label">Nome</label> 
							<input type="text" class="form-control" id="name" value = ${ profile.name } >
						</div>
						<div class="col-md-6">
							<label for="surname" class="form-label">Cognome</label> 
							<input type="text" class="form-control" id="surname" value = ${ profile.surname }>
						</div>
						<div class="col-md-6">
							<label for="username" class="form-label">Username</label> 
							<input type="text" class="form-control" id="username" value = ${ user.username }>
						</div>
						<div class="col-md-6">
							<label for="email" class="form-label">Email</label> 
							<input type="email" class="form-control" id="email" value = ${ user.email }>
						</div>
						<div class="col-md-6">
							<label for="birthday" class="form-label">Data di nascita</label> 
							<input type="date" class="form-control" id="birthday" value = ${ profile.birthday }>
						</div>
						<div class="col-md-6">
							<label for="address" class="form-label">Indirizzo</label>
							<div id ="addressDiv"></div>
						</div>
						<div class="col-md-12 mt-4">
							<button type="submit" class="btn btn-primary">Aggiorna profilo</button>
						</div>
					</form>
				</div>
    		</div>
    		
    		<!-- PASSWORD SETTINGS -->
    		<div id = "passwordDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section">
    			<p class="fs-2 d-block">Impostazioni account</p>
    			<p class="fs-6 d-block">Aggiorna la tua password</p>
    			<div class="row">
					<form class="row g-3">
						<div class="col-md-12">
							<label for="current_password" class="form-label">Password attuale</label> 
							<input type="password" class="form-control" id="current_password">
						</div>
						<div class="col-md-12">
							<label for="password" class="form-label">Nuova password</label> 
							<input type="password" class="form-control" id="password">
						</div>
						<div class="col-md-12">
							<label for="confirm_password" class="form-label">Conferma password</label> 
							<input type="password" class="form-control" id="confirm_password">
						</div>
						<div class="col-md-12 mt-4">
							<button type="submit" class="btn btn-primary">Aggiorna password</button>
						</div>
					</form>
				</div>
    		</div>
    		
    		<!-- EVENTS SETTINGS -->
    		<div id = "eventsDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section">
    			<p class="fs-2 d-block">Impostazioni eventi</p>
    			<p class="fs-6 d-block">Visualizza e gestisci gli eventi a cui parteci e che hai organizzato</p>
    			<div class="row">
					
				</div>
    		</div>
    		
		</div>
	</div>
	
	<!-- Bootstrap -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
		
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.js"></script>
	
	<!-- Mapbox -->
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
	<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
	
	<!-- EmailJS -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
	
	<!-- Custom -->
	<script type="text/javascript"  src="../js/accountManagement.js"> </script>
	
</body>