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
		color: #e59558;
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
	<div id = "modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Conferma la tua scelta</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-warning d-flex align-items-center" role="alert">
						<div> <i class="bi bi-exclamation-triangle-fill me-2"></i> Vuoi davvero effettuare il logout?</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Annulla</button>
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
					<button type="button" onclick="location.reload();" class="btn btn-primary" onclick="location.href='/logout';">Capito</button>
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

	<div class= "row p-0 p-sm-5">
		<div class="col-md-3 p-3">
			<div class="relative pt-5 pb-5 ps-4 pe-4 shadow p-3 mb-5 bg-body rounded" style="min-height: 550px">
				<div class = "d-flex justify-content-center mb-2">
					<i class="bi bi-person-circle" style = "font-size: 5rem;"></i>
				</div>
				<div class = "d-flex justify-content-center">
					<p class="fs-3 d-block">${ profile.name } ${ profile.surname }</p>
				</div>
				<div id = "menu" class = "d-grid gap-4 mt-4">
					<button id="account_button" onclick="showAccountSettings()" class="button raleway_font text-start menu-item selected"> <i class="bi bi-person-fill menu-icon me-3"></i> Account</button>
					<c:if test="${user.googleId == null }">
  						<button id="password_button" onclick="showPasswordSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-key menu-icon me-3"></i> Password</button>
  					</c:if>
  					<button id="event_button" onclick="showEventsSettings()" class="button raleway_font text-start menu-item text-start"> <i class="bi bi-calendar2-event menu-icon me-3"></i> Eventi</button>
				</div>
				<button id="logout_button" onclick="$('#modal').modal('show');" class="button raleway_font text-start menu-item text-start" style="color:red"> <i class="bi bi-box-arrow-right menu-icon me-3"></i> Logout</button>
			</div>
		</div>
    	
    	<div class="col-md-9 p-3">
    		<!-- ACCOUNT SETTINGS -->
    		<div id = "accountDiv" class="p-5 shadow p-3 mb-5 bg-body rounded section active">
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
					<form id = "player_account_form" class="row g-3">
					<c:if test="${user.googleId == null }">
						<div class="col-md-6">
							<label for="name" class="form-label">Nome</label> 
							<input type="text" class="form-control" id="name" name="name" value = ${ profile.name } >
						</div>
						<div class="col-md-6">
							<label for="surname" class="form-label">Cognome</label> 
							<input type="text" class="form-control" id="surname" name="surname" value = ${ profile.surname }>
						</div>
						<div class="col-md-6">
							<label for="username" class="form-label">Username</label> 
							<input type="text" class="form-control" id="username" name="username" value = ${ user.username }>
						</div>
						<div class="col-md-6">
							<label for="email" class="form-label">Email</label> 
							<input type="email" class="form-control" id="email" name="email" value = ${ user.email }>
						</div>
					</c:if>
						<div class="col-md-6">
							<label for="birthday" class="form-label">Data di nascita</label> 
							<input type="date" class="form-control" id="birthday" name="birthday" value = ${ profile.birthday }>
						</div>
						<div class="col-md-6">
							<label for="address" class="form-label">Indirizzo</label>
							<div id ="addressDiv"></div>
						</div>
						<div class="col-md-12 mt-5">
							<div class="d-flex justify-content-between">
								<c:if test="${user.googleId == null }">
									<button id="update_button" type="submit" onclick="updatePlayerAccount(event, '${ user.id }', '${ user.username }', '${ user.email }')" class="btn btn-primary">Aggiorna account</button>
								</c:if>
								<c:if test="${user.googleId != null }">
									<button id="update_button" type="submit" onclick="updateGooglePlayerAccount(event, '${ user.id }', '${ user.email }', '${ profile.name }', '${ profile.surname }')" class="btn btn-primary">Aggiorna account</button>
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
    		
    		<!-- EVENTS SETTINGS -->
    		<div id = "eventsDiv" class="position-relative p-5 shadow-sm p-3 mb-5 bg-body rounded section">
    			<p class="fs-2 d-block">Impostazioni eventi</p>
    			<p class="fs-6 d-block">Visualizza e gestisci gli eventi a cui parteci e che hai organizzato</p>
    			<div class="d-flex justify-content-between m-5 ps-5 pe-5">
					<button id="organized_button" onclick="showOrganized()" class="button raleway_font text-start menu-item selected"> <i class="bi bi-pencil-fill me-3" style="font-size: 1rem;"></i> Organizzati da te </button>
  					<button id="participate_button" onclick="showParticipate()" class="button raleway_font text-start menu-item"> <i class="bi bi-calendar2-check me-3" style="font-size: 1rem;"></i> A cui partecipi</button>
				</div>
				<div id="organized" class = "section active">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Evento di Calcetto</h5>
							<div class="row row-cols-4 mb-3">
								<div class="col"><i class="bi bi-geo-alt"></i> Struttura</div>
								<div class="col"><i class="bi bi-calendar-event me-2"></i> Data evento </div>
								<div class="col"><i class="bi bi-hourglass-top me-2"></i> Inizia alle: </div>
								<div class="col"><i class="bi bi-hourglass-bottom"></i> Finisce alle: </div>							
							</div>
							<a href="#" class="btn btn-primary">Visualizza dettagli</a>
						</div>
						<div class="card-footer text-muted">Fra 2 giorni</div>
					</div>
				</div>
				
				<div id="patecipate" class = "section">
					
				</div>
				<div class="position-fixed bottom-0 end-0 m-4" style="z-index: 2;">
					<a id="new_event" href="/nuovoEvento" class="new-event-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 rounded d-flex align-items-center">
						<i style="font-size: 1.5rem"class="bi bi-plus-lg me-3"></i>Crea nuovo evento
					</a>
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
	
	<!-- Custom -->
	<script type="text/javascript"  src="../js/accountManagement.js"> </script>
	
	<script type="text/javascript">
		initializeAddress(${profile.address.longitude}, ${profile.address.latitude});
	</script>
	
</body>