<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
	<jsp:include page="head.jsp"/>
	<!-- Mapbox CSS-->
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />
	<title>Player Seeker - Gestione Account</title>
	<style>
	
	body {
		background-color: #eaf4f4;
	}
	
	.relative{
		position:relative;
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
	
	#logout_button{
	position: absolute;
	bottom: 2rem;
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
	<div id="modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Conferma la tua scelta</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-warning d-flex align-items-center"
						role="alert">
						<div>
							<i class="bi bi-exclamation-triangle-fill me-2"></i> Vuoi davvero
							effettuare il logout?
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal">Annulla</button>
					<button type="button" class="btn btn-primary"
						onclick="location.href='/logout';">Effettua il logout</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="hour_modal" class="modal" tabindex="-1">
		<div style="max-width: 600px" class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modifica gli orari di apertura</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
						<div>
							<div class="row row-cols-4 d-flex align-items-center mt-3 mb-3">
								<div id="day" class="col-2"></div>
								<div class="col-2">
									<div class="form-check form-switch">
										<input onchange="openOrClose(this)"class="form-check-input" type="checkbox" role="switch" id="checkbox">
										<label class="form-check-label" id="status" for="1"></label>
									</div>
								</div>
								<div class="d-flex justify-content-center col-4">
									<label class="me-2">Apre alle:</label>
										<input type="time" id="open_hour" disabled="disabled">
								</div>
								<div class="d-flex justify-content-center col-4">
									<label class="me-2">Chiude alle:</label>
									<input type="time" id="close_hour" disabled="disabled">
								</div>
							</div>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal">Annulla</button>
					<button type="button" class="btn btn-primary"
						onclick="changeHours(event)">Effettua le modifiche</button>
				</div>
			</div>
		</div>
	</div>

	<div class= "row h-100 p-5">
		<div class="col-3 p-3">
			<div class="relative pt-5 pb-5 ps-4 pe-4 shadow-sm p-3 mb-5 bg-body rounded" style="min-height: 550px">
				<div class = "d-flex justify-content-center mb-2">
					<i class="bi bi-building" style = "font-size: 5rem;"></i>
				</div>
				<div class = "d-flex justify-content-center">
					<p class="fs-3 d-block">${ profile.name }</p>
				</div>
				<div id = "menu" class = "d-grid gap-4 mt-4">
					<button id="account_button" onclick="showAccountSettings()" class="button raleway_font text-start menu-item selected"> <i class="bi bi-person-fill menu-icon me-3"></i> Account</button>
  					<button id="password_button" onclick="showPasswordSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-key menu-icon me-3"></i> Password</button>
  					<button id="playground_button" onclick="showPlaygroudsSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-puzzle menu-icon me-3"></i> Campi da gioco </button>
  					<button id="event_button" onclick="showEventsSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-calendar2-event menu-icon me-3"></i> Eventi</button>
				</div>
				<button id="logout_button" onclick="$('#modal').modal('show');" class="button raleway_font text-start menu-item text-start" style="color:red"> <i class="bi bi-box-arrow-right menu-icon me-3"></i> Logout</button>
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
							<label for="name" class="form-label">Nome struttura</label> 
							<input type="text" class="form-control" id="name" value = ${ profile.name } >
						</div>
						<div class="col-md-6">
							<label for="name" class="form-label">Username</label> 
							<input type="text" class="form-control" id="username" value = ${ user.username } >
						</div>
						<div class="col-md-6">
							<label for="surname" class="form-label">Telefono</label> 
							<input type="text" class="form-control" id="phone" value = ${ profile.phone }>
						</div>
						<div class="col-md-6">
							<label for="username" class="form-label">Sito web</label> 
							<input type="text" class="form-control" id="web_site_url" value = ${ profile.webSiteUrl }>
						</div>
						<div class="col-md-12">
							<label for="address" class="form-label">Indirizzo</label>
							<div id ="addressDiv"></div>
						</div>
						<div class="col-md-12">
							<label class="mb-2 mt-3">Orari di apertura</label>
							<div>
								<table class="table">
									<thead class="table-light">
										<tr>
											<th scope="col">Giorno</th>
											<th scope="col">Apertura</th>
											<th scope="col">Chiusura</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										<c:forEach var="i" begin="1" end="7" step="1">
											<tr>
											<c:choose>
												<c:when test="${i == 1}"> <td class="day">Lunedì</td> </c:when>
												<c:when test="${i == 2}"> <td class="day">Martedì</td> </c:when>
												<c:when test="${i == 3}"> <td class="day">Mercoledì</td> </c:when>
												<c:when test="${i == 4}"> <td class="day">Giovedì</td> </c:when>
												<c:when test="${i == 5}"> <td class="day">Venerdi</td> </c:when>
												<c:when test="${i == 6}"> <td class="day">Sabato</td> </c:when>
												<c:when test="${i == 7}"> <td class="day">Domenica</td> </c:when>
											</c:choose>
											<c:set var="open" value="false"/>
											<c:forEach var="hour" items="${ profile.openingHours }">
												<c:if test="${hour.day == i }">
													<td class="open">${hour.openTime}</td>
													<td class="close">${hour.closeTime}</td>
													<c:set var="open" value="true"/>
												</c:if>
											</c:forEach>
											<c:if test="${open eq false}">
												<td class="open">Chiuso</td>
												<td class="close"></td>
											</c:if>
											<td>
												<button id= ${ i } onclick="modifyHour(event, this)" class="button menu-item">
													<i class="bi bi-pencil" style="font-size: 1rem; color: #0d6efd"></i>
												</button>
											</td> 
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
						
						<div class="col-md-12 mt-4">
							<button type="submit" onclick="updateAccount(${ user.id })" class="btn btn-primary">Aggiorna profilo</button>
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
    		
    		<!-- PLAYGROUND SETTINGS -->
    		<div id = "playgroundDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section">
    			<p class="fs-2 d-block">Impostazioni campi da gioco</p>
    			<p class="fs-6 d-block">Aggiorna le informazioni sui campi da gioco della tua struttura</p>
    			<div class = "mt-4">
					<c:forEach var="playground" items="${ profile.playgrounds }">
						<div class="card mb-3">
							<div class="card-body">
								<h5 class="card-title">Campo da ${playground.sport.type}</h5>
								<label>Descrizione:</label>
								<p class="fs-6 d-block mb-3">${playground.description }</p>
								<a href="#" class="btn btn-primary">Visualizza dettagli</a>
							</div>
						</div>
					</c:forEach>
				</div>
    		</div>
    		
    		<!-- EVENTS SETTINGS -->
    		<div id = "eventsDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section">
    			<p class="fs-2 d-block">Impostazioni eventi</p>
    			<p class="fs-6 d-block">Visualizza e gestisci gli eventi della tua struttura</p>
				<div id="organized" class = "section active mt-4">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Evento di Calcetto</h5>
							<div class="row row-cols-4 mb-3">
								<div class="col"><i class="bi bi-calendar-event me-2"></i> Data evento </div>
								<div class="col"><i class="bi bi-hourglass-top me-2"></i> Inizia alle: </div>
								<div class="col"><i class="bi bi-hourglass-bottom"></i> Finisce alle: </div>
								<div class="col"><i class="bi bi-geo-alt"></i> Struttura</div>
							</div>
							<a href="#" class="btn btn-primary">Visualizza dettagli</a>
						</div>
						<div class="card-footer text-muted">Fra 2 giorni</div>
					</div>
				</div>
				
				<div id="patecipate" class = "section">
					
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