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

<body>
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
					<c:if test="${user.googleId == null }">
						<button type="button" class="btn btn-primary" onclick="location.href='/logout'">Effettua il logout</button>
					</c:if>
					<c:if test="${user.googleId != null }">
						<button type="button" class="btn btn-primary" onclick="signOut()">Effettua il logout</button>
					</c:if>
				</div>
			</div>
		</div>
	</div>
	
	<div id = "success_modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Operazione effettuata</h5>
					<button type="button" onclick="location.reload();" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-success" role="alert">
						<h4 class="alert-heading">Ben fatto!</h4>
						<p>Le informazioni del tuo account sono state modificate con successo! E stata inviata un'email di conferma.</p>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" onclick="location.reload();" class="btn btn-primary">Capito</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id = "playground_success_modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Operazione effettuata</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-success" role="alert">
						<h4 class="alert-heading">Ben fatto!</h4>
						<p>Le informazioni sul campo da gioco sono state aggiornate con successo!</p>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" onclick="$('#playground_success_modal').modal('hide');" class="btn btn-primary">Capito</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id = "error_modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Operazione non effettuata</h5>
					<button type="button" onclick="location.reload();" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-danger" role="alert">
						<h4 class="alert-heading">Ops!</h4>
						<p>Si è verificato un problema temporaneo. Ti invitiamo a riprovare!</p>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" onclick="location.reload();" class="btn btn-primary" onclick="location.href='/logout';">Riprova</button>
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
	
	<div id="playground_modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title"></h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="form-floating">
						<select class="form-select mb-3" id="sport">
						</select> <label for="sport">Seleziona uno sport</label>
					</div>
					<div class="form-floating mb-3">
						<textarea class="form-control" placeholder="Inserisci qui la descrizione del campo" id="description" style="height: 100px"></textarea>
						<label for="description">Descrizione</label>
					</div>
					<p class="fs-6">Immagini aggiunte:</p>
					<div id="photos" class = "d-flex pt-3 pb-3 mb-4" style="overflow-x: auto"></div>
					<div class ="d-flex justify-content-center mb-3">
						<span id="disabled_add_photo_button" style = "display: none !important" id="popover-event" class="d-flex d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Hai già aggiunto 5 foto">
  							<button disabled id="my_position" class="btn btn-outline-primary d-flex align-items-center">
								<i style="font-size: 1.5rem"class="bi bi-plus-lg me-2"></i>Aggiungi foto
							</button>
						</span>
						<button onclick="addPhoto()" id="add_photo_button" style = "display: none !important" id="my_position" class="btn btn-outline-primary d-flex align-items-center">
								<i style="font-size: 1.5rem"class="bi bi-plus-lg me-2"></i>Aggiungi foto
						</button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" onclick="deleteNewPhoto();" data-bs-dismiss="modal">Annulla</button>
					<button type="button" class="btn btn-primary" onclick="modifyPlayground(event);">Effettua le modifiche</button>
				</div>
			</div>
		</div>
	</div>
      
      <div id = "event_modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Conferma la tua scelta</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-warning d-flex align-items-center" role="alert">
						<p id ="event_message"> <i class="bi bi-exclamation-triangle-fill me-2"></i></p>
					</div>
					<form id="div_select" class="input-group">
					
					 
					</form>
					 <label id="error_label_oranizer"> </label>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Annulla</button>
					<button id="event_button" type="button" class="btn btn-primary" data-bs-dismiss="modal">Conferma</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class= "row p-0 p-sm-5">
		<div class="col-md-3 p-3">
			<div class="relative pt-5 pb-5 ps-4 pe-4 shadow-sm p-3 bg-body rounded" style="min-height: 550px">
				<div class = "d-flex justify-content-center mb-2">
					<i class="bi bi-building" style = "font-size: 5rem;"></i>
				</div>
				<div class = "d-flex justify-content-center">
					<p class="fs-3 d-block">${ profile.name }</p>
				</div>
				<div id = "menu" class = "d-grid gap-4 mt-4">
					<button id="account_button" onclick="showAccountSettings()" class="button raleway_font text-start menu-item selected"> <i class="bi bi-person-fill menu-icon me-3"></i> Account</button>
  					<c:if test="${user.googleId == null }">
  						<button id="password_button" onclick="showPasswordSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-key menu-icon me-3"></i> Password</button>
  					</c:if>
  					<button id="playground_button" onclick="showPlaygroudsSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-puzzle menu-icon me-3"></i> Campi da gioco </button>
  					<button id="event_button" onclick="showEventsSettings('${user.id}')" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-calendar2-event menu-icon me-3"></i> Eventi</button>
				</div>
				<button id="logout_button" onclick="$('#modal').modal('show');" class="button raleway_font text-start menu-item text-start" style="color:red"> <i class="bi bi-box-arrow-right menu-icon me-3"></i> Logout</button>
			</div>
		</div>
    	
    	<div class="col-md-9 p-3">
    		<!-- ACCOUNT SETTINGS -->
    		<div id = "accountDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section active">
    			<p class="fs-2 d-block">Impostazioni account</p>
    			<p class="fs-6 d-block">Aggiorna i dati del tuo account</p>
    			
    			<div id="account_error" style = "display:none !important"class="alert alert-danger d-flex align-items-center mt-3 mb-0"
					role="alert">
					<i class="bi bi-exclamation-circle-fill me-2"></i>
					<div>
						<p class="fs-6"></p>
					</div>
				</div>
				
    			<div class="row">
					<form id="sport_facility_account_form" class="row g-3">
						<div class="col-md-6">
							<label for="name" class="form-label">Nome struttura</label> 
							<input type="text" class="form-control" id="name" name="name" value = ${ profile.name } >
						</div>
						<c:if test="${user.googleId == null }">
						<div class="col-md-6">
							<label for="name" class="form-label">Username</label> 
							<input type="text" class="form-control" id="username" name="username" value = ${ user.username } >
						</div>
						<div class="col-md-6">
							<label for="email" class="form-label">Email</label> 
							<input type="email" class="form-control" id="email" name="email" value = ${ user.email }>
						</div>
						</c:if>
						<div class="col-md-6">
							<label for="surname" class="form-label">Telefono</label> 
							<input type="text" class="form-control" id="phone" name="phone" value = ${ profile.phone }>
						</div>
						<div class="col-md-6">
							<label for="username" class="form-label">Sito web</label> 
							<input type="text" class="form-control" id="web_site_url" name="web_site_url" value = ${ profile.webSiteUrl }>
						</div>
						<div class="col-md-6">
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
									<tbody id ="opening_hours">
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
						<div class="col-md-12 mt-5">
							<div class="d-flex justify-content-between">
								<c:if test="${user.googleId == null }">
									<button id="update_button" type="submit" onclick="updateSportFacilityAccount(event, '${ user.id }', '${ user.username }', '${ user.email }')" class="btn btn-primary">Aggiorna account</button>
								</c:if>
								<c:if test="${user.googleId != null }">
									<button id="update_button" type="submit" onclick="updateGoogleSportFacilityAccount(event, '${ user.id }', '${ user.email }')" class="btn btn-primary">Aggiorna account</button>
								</c:if>
								<button type="submit" onclick="deleteAccount(event, ${ user.id })" class="btn btn-danger">Elimina account</button>
							</div>
						</div>
					</form>
				</div>
    		</div>
    		
    		<!-- PASSWORD SETTINGS -->
    		<div id = "passwordDiv" class="p-5 shadow-sm p-3 mb-5 bg-body rounded section">
    			<p class="fs-2 d-block">Impostazioni account</p>
    			<p class="fs-6 d-block">Aggiorna la tua password</p>
    			
    			<div id="password_error" style = "display:none !important"class="alert alert-danger d-flex align-items-center mt-3 mb-0"
					role="alert">
					<i class="bi bi-exclamation-circle-fill me-2"></i>
					<div>
						<p class="fs-6"></p>
					</div>
				</div>
				
    			<div class="row">
					<form id="password_form" class="row g-3">
						<div class="col-md-12">
							<label for="current_password" class="form-label">Password attuale</label> 
							<input type="password" class="form-control" id="current_password" name="current_password">
						</div>
						<div class="col-md-12">
							<label for="password" class="form-label">Nuova password</label> 
							<input type="password" class="form-control" id="password" name="password">
						</div>
						<div class="col-md-12">
							<label for="confirm_password" class="form-label">Conferma password</label> 
							<input type="password" class="form-control" id="confirm_password" name="confirm_password">
						</div>
						<div class="col-md-12 mt-4">
							<button type="submit" class="btn btn-primary" onclick="updatePassword(event, '${ user.id }')">Aggiorna password</button>
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
								
								<div class="d-flex justify-content-start">
									<button onclick="showPlaygroundDetails('${playground.id}')" class="btn btn-primary me-3">Visualizza dettagli</button>
									<button onclick="deletePLayground(event,'${ playground.id }')" class="btn btn-danger">Elimina campo</button>
								</div>
								
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
					
				</div>
				
				<div id="patecipate" class = "section">
					
				</div>
			</div>
    		
		</div>
	</div>
	
	<!-- FOOTER -->
	<jsp:include page="footer.jsp" />
	
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
	
	<!-- Cloudinary -->
	<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
	
	<!-- Custom -->
	<script type="text/javascript"  src="../js/accountManagement.js"> </script>
	
	<script type="text/javascript">
		initializeAddress(${profile.address.longitude}, ${profile.address.latitude});
	</script>
	
</body>